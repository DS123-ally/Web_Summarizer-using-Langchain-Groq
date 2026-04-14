import hashlib
import os
from datetime import datetime
from typing import Literal

from dotenv import load_dotenv
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_groq import ChatGroq

from db import chat_history_col, summaries_col

BASE_DIR = os.path.dirname(__file__)
load_dotenv(os.path.join(BASE_DIR, ".env"))
load_dotenv(os.path.join(BASE_DIR, "..", ".env"))

INDEX_ROOT = os.path.join(os.path.dirname(__file__), "faiss_indexes")
os.makedirs(INDEX_ROOT, exist_ok=True)

embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=120)


def _url_key(url: str) -> str:
    return hashlib.sha256(url.strip().lower().encode("utf-8")).hexdigest()[:24]


def _index_path(url: str) -> str:
    return os.path.join(INDEX_ROOT, _url_key(url))


def _get_llm() -> ChatGroq:
    return ChatGroq(
        groq_api_key=os.getenv("GROQ_API_KEY"),
        model_name=os.getenv("GROQ_MODEL", "llama-3.1-8b-instant"),
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


def _build_or_load_store(url: str, page_text: str | None = None) -> tuple[FAISS, bool]:
    path = _index_path(url)
    faiss_file = os.path.join(path, "index.faiss")
    pkl_file = os.path.join(path, "index.pkl")

    if os.path.exists(faiss_file) and os.path.exists(pkl_file):
        store = FAISS.load_local(path, embeddings, allow_dangerous_deserialization=True)
        return store, True

    if page_text is None:
        page_text = _load_website_text(url)
    chunks = splitter.split_text(page_text)
    if not chunks:
        raise ValueError("Unable to build vector index for this URL.")

    store = FAISS.from_texts(chunks, embeddings)
    store.save_local(path)
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
    cache_query = {"url": url, "strategy": strategy, "summary_length": length_key}
    cached_doc = summaries_col.find_one(cache_query)
    if cached_doc and cached_doc.get("summary"):
        _build_or_load_store(url)
        return {
            "summary": cached_doc["summary"],
            "cached": True,
            "url": url,
            "strategy": strategy,
            "summary_length": length_key,
        }

    page_text = _load_website_text(url)
    _build_or_load_store(url, page_text=page_text)
    chunks = splitter.split_text(page_text)

    llm = _get_llm()
    if strategy == "map_reduce":
        summary = _summarize_with_map_reduce(llm, chunks, target_words)
    elif strategy == "refine":
        summary = _summarize_with_refine(llm, chunks, target_words)
    else:
        summary = _summarize_with_stuff(llm, page_text, target_words)

    summaries_col.update_one(
        cache_query,
        {
            "$set": {
                "url": url,
                "strategy": strategy,
                "summary_length": length_key,
                "summary": summary,
                "updated_at": datetime.utcnow(),
            },
            "$setOnInsert": {
                "created_at": datetime.utcnow(),
            },
        },
        upsert=True,
    )

    return {
        "summary": summary,
        "cached": False,
        "url": url,
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
        # Compatibility across LangChain versions:
        # newer retrievers use invoke(), older ones expose get_relevant_documents().
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
        chat_history_col.insert_one(
            {
                "user_id": user_id,
                "url": url,
                "question": question,
                "answer": answer,
                "queries_used": queries[:4],
                "created_at": datetime.utcnow(),
            }
        )

    return result


def get_recent_chats(user_id: str, limit: int = 12) -> list[dict]:
    cursor = (
        chat_history_col.find({"user_id": user_id}, {"_id": 0})
        .sort("created_at", -1)
        .limit(limit)
    )
    return [
        {
            "url": c.get("url", ""),
            "question": c.get("question", ""),
            "answer": c.get("answer", ""),
            "created_at": c.get("created_at").isoformat() if c.get("created_at") else None,
        }
        for c in cursor
    ]