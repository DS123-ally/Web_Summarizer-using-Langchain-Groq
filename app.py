# app.py
"""
Website Summarizer — LangChain + Groq
"""

import traceback
from io import BytesIO
import sys

import validators
import streamlit as st

# ------------------ LangChain Imports (with fallbacks) ------------------
try:
    from langchain.prompts import PromptTemplate
except Exception:
    try:
        from langchain.prompts.prompt import PromptTemplate
    except Exception:
        try:
            from langchain import PromptTemplate
        except Exception:
            class PromptTemplate:
                def __init__(self, template: str, input_variables: list[str]):
                    self.template = template
                    self.input_variables = input_variables

from langchain_groq import ChatGroq

try:
    from langchain.chains.summarize import load_summarize_chain
except Exception:
    try:
        from langchain.chains import load_summarize_chain
    except Exception:
        # ✅ Correct fallback implementation
        def load_summarize_chain(llm, chain_type="stuff", prompt=None):
            class SimpleChain:
                def __init__(self, llm, prompt):
                    self.llm = llm
                    self.prompt = prompt

                def run(self, input_documents=None):
                    text = "\n\n".join(d.page_content for d in (input_documents or []))
                    template = getattr(self.prompt, "template", "{text}")
                    final_prompt = template.replace("{text}", text)

                    # ✅ Correct ChatGroq invocation
                    try:
                        return self.llm.invoke(final_prompt).content
                    except Exception:
                        try:
                            return self.llm.predict(final_prompt)
                        except Exception:
                            return final_prompt[:5000]

            return SimpleChain(llm, prompt)

from langchain_community.document_loaders import UnstructuredURLLoader

# ------------------ Streamlit Config ------------------
st.set_page_config(
    page_title="Website Summarizer — LangChain + Groq",
    page_icon="📝",
    layout="centered",
    initial_sidebar_state="expanded",
)

st.markdown("<h1>📝 Website Summarizer — LangChain + Groq</h1>", unsafe_allow_html=True)
st.caption("Paste a URL and get a concise summary. Respect robots.txt and copyright.', unsafe_allow_html=True")
st.info('How to use: paste a website URL, enter your Groq API key in the sidebar, then click Summarize.')

st.markdown( """ <style> .app-title {font-size:30px; font-weight:700; margin-bottom:0.1rem} .app-sub {color: #6c757d; margin-top:0; margin-bottom:1rem} .card {background:#f7f7f8; padding:14px; border-radius:10px} .small muted {color:#6c757d} </style>
            
A lightweight Streamlit app that fetches text from a website and summarizes it using Groq (LLaMA).
             
**How to use:** 
            
1. Paste a website URL (must be reachable and allow scraping). 
2. Enter your Groq API key in the sidebar. 
3. Choose summary length and options, then click **Summarize**. """, unsafe_allow_html=True, )

# ------------------ Sidebar ------------------
with st.sidebar:
    st.markdown("## Settings")

    groq_api_key = st.text_input("Groq API Key", type="password")

    with st.expander("Advanced settings"):
        summary_words = st.slider("Summary length (words)", 50, 1000, 300, 50)
        show_extracted = st.checkbox("Show extracted text", False)
        chain_type = st.selectbox("Chain type", ["stuff", "map_reduce", "refine"])

    dev_mode = st.checkbox("Dev mode (debug)", False)

    if st.button("Clear session"):
        st.session_state.clear()
        st.rerun()

st.session_state["dev_mode"] = dev_mode

# ------------------ Input Form ------------------
with st.form("summarize_form"):
    st.subheader("Summarize a Website")
    url = st.text_input("Website URL", placeholder="https://example.com")
    submit = st.form_submit_button("Summarize")

# ------------------ Helpers ------------------
@st.cache_data(show_spinner=False)
def load_url_content(url: str):
    loader = UnstructuredURLLoader(
        urls=[url],
        ssl_verify=False,
        headers={"User-Agent": "Mozilla/5.0"},
    )
    return loader.load()

def make_prompt(words: int) -> PromptTemplate:
    template = (
        f"Provide a clear, neutral summary in about {words} words.\n\n"
        "Content:\n{text}\n\n"
        "Include key points and conclusions."
    )
    return PromptTemplate(template=template, input_variables=["text"])

# ------------------ Main Logic ------------------
if submit:
    if not groq_api_key.strip():
        st.error("Groq API key is required.")
    elif not validators.url(url):
        st.error("Enter a valid URL including http:// or https://")
    else:
        try:
            with st.spinner("Loading website..."):
                docs = load_url_content(url)

            if not docs:
                st.error("No content found.")
            else:
                if show_extracted:
                    st.text_area(
                        "Extracted Content (preview)",
                        "\n\n".join(d.page_content[:3000] for d in docs),
                        height=250,
                    )

                llm = ChatGroq(
                    model="llama-3.1-8b-instant",
                    groq_api_key=groq_api_key,
                )

                prompt = make_prompt(summary_words)

                with st.spinner("Summarizing..."):
                    chain = load_summarize_chain(
                        llm,
                        chain_type=chain_type,
                        prompt=prompt,
                    )
                    try:
                        summary = chain.run(input_documents=docs)
                    except TypeError:
                        summary = chain.run(docs)

                st.success("Summary generated")
                st.subheader("Summary")
                st.write(summary)

                st.session_state.update({
                    "url": url,
                    "docs": docs,
                    "prompt": prompt,
                    "chain_type": chain_type,
                    "summary": summary,
                    "model": "llama-3.1-8b-instant",
                })

                buf = BytesIO(summary.encode("utf-8"))
                st.download_button(
                    "Download summary",
                    buf,
                    "summary.txt",
                    "text/plain",
                )

        except Exception as e:
            st.error(f"Error: {e}")
            if dev_mode:
                st.exception(traceback.format_exc())

# ------------------ Developer Debug Panel ------------------
if dev_mode and "summary" in st.session_state:
    with st.expander("Developer Debug Information"):
        st.code({
            "python": sys.version,
            "model": st.session_state["model"],
            "chain_type": st.session_state["chain_type"],
            "documents": len(st.session_state["docs"]),
            "summary_chars": len(st.session_state["summary"]),
        })
        st.markdown("**Prompt Template**")
        st.code(st.session_state["prompt"].template)

# ------------------ Footer ------------------
st.markdown("---")
st.caption("Built with Streamlit, LangChain, and Groq")
