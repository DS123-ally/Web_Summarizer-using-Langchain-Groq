# 🚀 Web Summarizer using LangChain + Groq

## 📌 Overview

**Web Summarizer** takes any public URL, extracts its content, breaks it into semantic chunks, stores them in a **FAISS vector database**, retrieves the most relevant pieces, and generates a concise, context-aware summary using **Groq's ultra-fast LLMs** — all through a modern React dashboard with user authentication.

--- 
 
## ✨ Features

| Feature | Description |
|---|---|
| 🌐 Web Extraction | Pulls content from any public URL |
| 🧠 RAG Pipeline | Context-aware summarization via FAISS retrieval |
| ⚡ Groq Inference | Near-instant LLM responses |
| 🔐 Auth System | JWT-based Login & Signup |
| 📊 Dashboard | Manage and review past summaries |
| 🎨 Modern UI | React + Vite + Tailwind CSS frontend |

---

## 🏗️ Tech Stack

### Backend
- **Python** + **FastAPI** — REST API server
- **LangChain** — RAG orchestration & text splitting
- **Groq API** — LLM inference (Llama 3 / Mixtral)
- **FAISS** — Vector store for semantic search
- **JWT** — Token-based authentication

### Frontend
- **React** (Vite) — Component-based UI
- **Tailwind CSS** — Utility-first styling

---

## 🧠 How It Works

```
User Input (URL)
      │
      ▼
 Web Content Extraction
      │
      ▼
 Text Chunking (LangChain Splitter)
      │
      ▼
 Embeddings Generation
      │
      ▼
 FAISS Vector Store  ←──────────────┐
      │                             │
      ▼                             │
 Relevant Chunk Retrieval ──────────┘
      │
      ▼
 Groq LLM → Summary
      │
      ▼
 React Dashboard UI
```

1. Extract web content from the given URL
2. Split text into smaller, overlapping chunks
3. Convert chunks into vector embeddings
4. Store embeddings in a local **FAISS** index
5. Retrieve the most relevant chunks for the query
6. Pass retrieved context to **Groq LLM** for summarization

---

## 📂 Project Structure

```
Web_Summarizer/
│
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── rag_pipeline.py      # LangChain RAG logic
│   ├── auth.py              # JWT authentication
│   ├── db.py                # Database models/config
│   ├── requirements.txt     # Python dependencies
│   └── faiss_indexes/       # Stored FAISS vector indexes
│
├── frontend/
│   ├── src/                 # React components & pages
│   ├── public/              # Static assets
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/DS123-ally/Web_Summarizer-using-Langchain-Groq.git
cd Web_Summarizer-using-Langchain-Groq
```

### 2️⃣ Backend Setup

```bash
cd backend
python -m venv venv

# Activate virtual environment
venv\Scripts\activate        # Windows
source venv/bin/activate     # macOS / Linux

pip install -r requirements.txt
```

### 3️⃣ Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
GROQ_API_KEY=your_groq_api_key_here
```

> 🔑 Get your free Groq API key at [https://console.groq.com](https://console.groq.com)

### 4️⃣ Run the Backend

```bash
uvicorn main:app --reload
```

API will be available at `http://localhost:8000`  
Interactive docs at `http://localhost:8000/docs`

### 5️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:5173`

---

## 🔐 Authentication

- **Signup** — Create a new user account
- **Login** — Authenticate and receive a JWT token
- **Protected Routes** — Dashboard and summarization features require a valid token

---

## 📸 Screenshots

> _Add screenshots here_

| Home Page | Dashboard | Summary Output |
|---|---|---|
| _(screenshot)_ | _(screenshot)_ | _(screenshot)_ |

---

## 🚀 Future Enhancements

- [ ] 📄 PDF summarization
- [ ] 📊 Analytics dashboard
- [ ] 🌍 Multi-language support
- [ ] ☁️ Deployment (AWS / GCP / Vercel)
- [ ] 💬 Chat with documents

---

## ⚠️ Important Notes

- **Never commit your `.env` file** — add it to `.gitignore`
- Ignore FAISS artifacts by adding to `.gitignore`:

```gitignore
.env
backend/faiss_indexes/
*.pkl
*.faiss
```

---

## 🤝 Contributing

Pull requests are welcome! To contribute:

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes
git commit -m "Add: your feature description"

# 4. Push and open a Pull Request
git push origin feature/your-feature-name
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- [LangChain](https://www.langchain.com/) — LLM orchestration framework
- [Groq API](https://groq.com/) — Lightning-fast LLM inference
- [FAISS](https://faiss.ai/) — Efficient vector similarity search

---

<p align="center">Built with ❤️ Dinesh Seervi.</p>
