import hashlib
import os
from datetime import datetime
from typing import Literal

import fitz # PyMuPDF
from dotenv import load_dotenv
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain_groq import ChatGroq

from db import SessionLocal, SummaryCache, ChatHistory

BASE_DIR = os.path.dirname(__file__)
load_dotenv(os.path.join(BASE_DIR, ".env"))
load_dotenv(os.path.join(BASE_DIR, "..", ".env"))

embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=120)
index_name = "web-summarizer"


def _url_key(url: str) -> str:
    return hashlib.sha256(url.strip().lower().encode("utf-8")).hexdigest()[:24]


def _get_llm() -> ChatGroq:
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise ValueError(
            "GROQ_API_KEY is not set. Create backend/.env with GROQ_API_KEY=your_groq_api_key_here "
            "or export GROQ_API_KEY in your environment."
        )

    return ChatGroq(
        api_key=api_key,
        model=os.getenv("GROQ_MODEL", "llama-3.1-8b-instant"),
    )


def _normalize_summary_length(length: str | int) -> tuple[str, int]:
    if isinstance(length, int):
        words = max(80, min(length, 2000))
        return f"custom_{words}", words

    value = str(length).strip().lower()
    if value.isdigit():
        words = max(80, min(int(value), 2000))
        return f"custom_{words}", words

    if value == "short":
        return "short", 120
    if value == "long":
        return "long", 420
    return "medium", 240


def _load_website_text(url: str) -> str:
    docs = WebBaseLoader(web_paths=[url], requests_kwargs={"verify": False}).load()
    page_text = "\n\n".join(d.page_content for d in docs if getattr(d, "page_content", None))
    if not page_text.strip():
        raise ValueError("No content found at the provided URL.")
    return page_text


def _build_or_load_store(url: str, page_text: str | None = None) -> tuple[PineconeVectorStore, bool]:
    namespace = _url_key(url)
    
    if page_text is None:
        # Just loading connection, vectors assumed to be in Pinecone already
        store = PineconeVectorStore.from_existing_index(index_name=index_name, embedding=embeddings, namespace=namespace)
        return store, True

    chunks = splitter.split_text(page_text)
    if not chunks:
        raise ValueError("Unable to build vector index for this URL.")

    # Upload to Pinecone under specific namespace
    store = PineconeVectorStore.from_texts(texts=chunks, embedding=embeddings, index_name=index_name, namespace=namespace)
    return store, False


def _summarize_with_stuff(llm: ChatGroq, text: str, target_words: int) -> str:
    prompt = (
        f"Summarize the webpage content in around {target_words} words. "
        "Use clear bullet points and include only key facts.\n\n"
        f"{text[:14000]}"
    )
    return llm.invoke(prompt).content


def _summarize_with_map_reduce(llm: ChatGroq, chunks: list[str], target_words: int) -> str:
    partials = []
    for chunk in chunks[:10]:
        map_prompt = (
            "Summarize this chunk in 3 concise bullets.\n\n"
            f"{chunk[:2000]}"
        )
        partials.append(llm.invoke(map_prompt).content)

    reduce_prompt = (
        f"Combine the chunk summaries into one coherent summary of about {target_words} words. "
        "Use bullet points and avoid repetition.\n\n"
        + "\n\n".join(partials)
    )
    return llm.invoke(reduce_prompt).content


def _summarize_with_refine(llm: ChatGroq, chunks: list[str], target_words: int) -> str:
    summary = llm.invoke(
        f"Create an initial summary of about {target_words} words from this text:\n\n{chunks[0][:2200]}"
    ).content

    for chunk in chunks[1:8]:
        refine_prompt = (
            f"You have an existing summary (target about {target_words} words). "
            "Refine it with any important new facts from the new chunk. "
            "If there is no important new fact, keep it concise.\n\n"
            f"Current summary:\n{summary}\n\nNew chunk:\n{chunk[:2200]}"
        )
        summary = llm.invoke(refine_prompt).content
    return summary


def summarize_website(
    url: str,
    strategy: Literal["stuff", "map_reduce", "refine"] = "stuff",
    summary_length: str | int = "medium",
) -> dict:
    length_key, target_words = _normalize_summary_length(summary_length)
    
    with SessionLocal() as db:
        cached_doc = db.query(SummaryCache).filter_by(url=url, strategy=strategy, summary_length=length_key).first()
        if cached_doc and cached_doc.summary:
            return {
                "summary": cached_doc.summary,
                "cached": True,
                "url": url,
                "strategy": strategy,
                "summary_length": length_key,
            }

        page_text = _load_website_text(url)
        # Check if any summary exists to avoid re-vectorizing
        any_summary = db.query(SummaryCache).filter_by(url=url).first()
        if not any_summary:
            _build_or_load_store(url, page_text=page_text)
        
        chunks = splitter.split_text(page_text)
        llm = _get_llm()
        if strategy == "map_reduce":
            summary = _summarize_with_map_reduce(llm, chunks, target_words)
        elif strategy == "refine":
            summary = _summarize_with_refine(llm, chunks, target_words)
        else:
            summary = _summarize_with_stuff(llm, page_text, target_words)

        new_cache = SummaryCache(
            url=url,
            strategy=strategy,
            summary_length=length_key,
            summary=summary
        )
        db.add(new_cache)
        db.commit()

    return {
        "summary": summary,
        "cached": False,
        "url": url,
        "strategy": strategy,
        "summary_length": length_key,
    }


def _load_pdf_text(content: bytes) -> str:
    doc = fitz.open(stream=content, filetype="pdf")
    text = "\n\n".join(page.get_text() for page in doc)
    if not text.strip():
        raise ValueError("No extractable text found in the PDF.")
    return text


def summarize_pdf(
    content: bytes,
    filename: str,
    strategy: Literal["stuff", "map_reduce", "refine"] = "stuff",
    summary_length: str | int = "medium",
) -> dict:
    length_key, target_words = _normalize_summary_length(summary_length)
    file_hash = hashlib.sha256(content).hexdigest()[:24]
    pseudo_url = f"pdf://{filename}/{file_hash}"
    
    with SessionLocal() as db:
        cached_doc = db.query(SummaryCache).filter_by(url=pseudo_url, strategy=strategy, summary_length=length_key).first()
        if cached_doc and cached_doc.summary:
            return {
                "summary": cached_doc.summary,
                "cached": True,
                "url": pseudo_url,
                "strategy": strategy,
                "summary_length": length_key,
            }

        page_text = _load_pdf_text(content)
        any_summary = db.query(SummaryCache).filter_by(url=pseudo_url).first()
        if not any_summary:
            _build_or_load_store(pseudo_url, page_text=page_text)

        chunks = splitter.split_text(page_text)
        llm = _get_llm()
        if strategy == "map_reduce":
            summary = _summarize_with_map_reduce(llm, chunks, target_words)
        elif strategy == "refine":
            summary = _summarize_with_refine(llm, chunks, target_words)
        else:
            summary = _summarize_with_stuff(llm, page_text, target_words)

        new_cache = SummaryCache(
            url=pseudo_url,
            strategy=strategy,
            summary_length=length_key,
            summary=summary
        )
        db.add(new_cache)
        db.commit()

    return {
        "summary": summary,
        "cached": False,
        "url": pseudo_url,
        "strategy": strategy,
        "summary_length": length_key,
    }


def chat_with_website(
    url: str, question: str, history: list[str] | None = None, user_id: str | None = None
) -> dict:
    store, from_cache = _build_or_load_store(url)
    llm = _get_llm()

    rewrite_prompt = (
        "Generate 3 short search queries to answer the user question from webpage content. "
        "Return one query per line and no numbering.\n\n"
        f"Question: {question}"
    )
    rewritten = llm.invoke(rewrite_prompt).content
    queries = [q.strip("- ").strip() for q in rewritten.splitlines() if q.strip()]
    if question not in queries:
        queries.insert(0, question)

    retriever = store.as_retriever(search_kwargs={"k": 4})
    docs = []
    seen = set()
    for q in queries[:4]:
        retrieved_docs = (
            retriever.invoke(q)
            if hasattr(retriever, "invoke")
            else retriever.get_relevant_documents(q)
        )
        for d in retrieved_docs:
            text = (d.page_content or "").strip()
            if text and text not in seen:
                seen.add(text)
                docs.append(text)

    context = "\n\n".join(docs[:8])[:14000]
    history_text = "\n".join(history or [])
    answer_prompt = (
        "You are a helpful assistant answering questions from website context.\n"
        "If the answer is not in context, say you are not sure.\n\n"
        f"Chat history:\n{history_text}\n\n"
        f"Question:\n{question}\n\n"
        f"Context:\n{context}"
    )
    answer = llm.invoke(answer_prompt).content

    result = {
        "answer": answer,
        "queries_used": queries[:4],
        "context_chunks": len(docs[:8]),
        "index_cached": from_cache,
        "url": url,
    }

    if user_id:
        with SessionLocal() as db:
            chat_record = ChatHistory(
                user_id=user_id,
                url=url,
                question=question,
                answer=answer,
                queries_used=queries[:4]
            )
            db.add(chat_record)
            db.commit()

    return result


def get_recent_chats(user_id: str, limit: int = 12) -> list[dict]:
    with SessionLocal() as db:
        cursor = db.query(ChatHistory).filter(ChatHistory.user_id == user_id).order_by(ChatHistory.created_at.desc()).limit(limit).all()
        return [
            {
                "url": c.url,
                "question": c.question,
                "answer": c.answer,
                "created_at": c.created_at.isoformat() if c.created_at else None,
            }
            for c in cursor
        ]