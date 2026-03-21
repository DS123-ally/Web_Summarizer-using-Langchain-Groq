# 🌐 Website Summarizer — LangChain + Groq

A lightweight **Streamlit** web application that fetches content from any public website URL and generates a concise, readable summary using **LangChain** and **Groq's LLaMA-3.1-8B-Instant** model.

Built for learning, experimentation, and real-world usage with modern LLM tooling.

---

## ✨ Features

- 🔗 **Summarize any public website** — just paste a URL and go
- ⚡ **Powered by Groq** — ultra-fast inference with LLaMA-3.1-8B-Instant
- 🧠 **LangChain summarization chains** — supports `stuff`, `map_reduce`, and `refine` strategies
- 🎛️ **Adjustable summary length** — slider from 50 to 1000 words
- 🧪 **Developer Debug Mode** — view prompt template, extracted docs, model info, and runtime details
- 👁️ **Extracted text preview** — optionally inspect raw content before summarization
- 📥 **Download summary** — export results as a `.txt` file
- 🧩 **Multi-version LangChain compatibility** — safe import fallbacks for older and newer versions

---

## 🖥️ App Layout

```
Sidebar                          Main Panel
────────────────────             ──────────────────────────────────
🔑 Groq API Key (password)       📝 Website Summarizer — LangChain + Groq

Advanced Settings:               [ Website URL input field         ]
  • Summary length (words)
  • Show extracted text          [ Summarize button                ]
  • Chain type
  • Dev mode (debug)             ── Summary ──
  • Clear session                <generated summary text here>

                                 [ Download summary (.txt) ]
```

---

## 🗂️ Project Structure

```
Web_Summarizer-using-Langchain-Groq/
│
├── app.py                  # Main Streamlit application
├── inspect_langchain.py    # LangChain version inspection utility
├── requirements.txt        # Python dependencies
├── LICENSE                 # MIT License
└── README.md               # Documentation
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Python 3.10+ | Core language |
| Streamlit | Web UI framework |
| LangChain | LLM chain orchestration |
| langchain-groq | Groq LLM integration (ChatGroq) |
| langchain-community | `UnstructuredURLLoader` for web scraping |
| Groq API (LLaMA-3.1-8B-Instant) | Fast LLM inference |
| Unstructured | Website content extraction |
| BeautifulSoup4 + lxml | HTML parsing |
| Validators | URL validation |
| python-dotenv | Environment variable management |

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- A free [Groq API key](https://console.groq.com)

### 1. Clone the Repository

```bash
git clone https://github.com/DS123-ally/Web_Summarizer-using-Langchain-Groq.git
cd Web_Summarizer-using-Langchain-Groq
```

### 2. Create & Activate a Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Get Your Groq API Key

1. Sign up at 👉 [https://console.groq.com](https://console.groq.com)
2. Generate a free API key
3. Enter it in the app's sidebar when running (no `.env` file needed)

### 5. Run the App

```bash
python -m streamlit run app.py
```

Open your browser at 👉 [http://localhost:8501](http://localhost:8501)

---

## ⚙️ How It Works

1. **URL Input** — User pastes a website URL into the form
2. **Content Extraction** — `UnstructuredURLLoader` fetches and parses the webpage text
3. **Prompt Construction** — A `PromptTemplate` is built with the desired word count
4. **LangChain Chain** — A summarization chain (`stuff`, `map_reduce`, or `refine`) is loaded with `ChatGroq` as the LLM
5. **Summary Output** — The summary is displayed in the UI and offered as a `.txt` download

---

## 📦 Dependencies

```txt
streamlit>=1.31.0
validators>=0.22.0
langchain>=0.2.0
langchain-core>=0.2.0
langchain-community>=0.2.0
langchain-groq>=0.1.4
unstructured>=0.14.0
beautifulsoup4>=4.12.0
lxml>=5.1.0
requests>=2.31.0
python-dotenv>=1.0.0
```

---

## 🧪 Chain Types Explained

| Chain Type | Description | Best For |
|---|---|---|
| `stuff` | Passes all content in a single prompt | Short pages |
| `map_reduce` | Summarizes chunks individually then combines | Long articles |
| `refine` | Iteratively refines the summary | Detailed, nuanced content |

---

## ⚠️ Notes

- Only publicly accessible URLs are supported (no login-protected pages)
- Please respect `robots.txt` and website copyright when scraping
- Some JavaScript-heavy sites may not extract content correctly

---

## 👨‍💻 Author

**Dinesh**  
Computer Engineering Student  
Focused on AI, LLMs, LangChain, and Full-Stack Development

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## ⭐ Support

If you find this project helpful:

- ⭐ Star the repository
- 🍴 Fork it and extend it
- 🐛 Open an issue for bugs or suggestions
