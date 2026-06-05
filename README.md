# 🚀 Web Summarizer using LangChain + Groq

## 📌 Overview

**Web Summarizer** takes any public URL or PDF Document, extracts its content, breaks it into semantic chunks, stores them in a **FAISS vector database**, retrieves the most relevant pieces, and generates a concise, context-aware summary using **Groq's ultra-fast LLMs**. It also features a fully interactive chat interface to let you "talk" to the document. Everything is wrapped in a modern **Next.js App Router** dashboard secured by **Firebase Authentication**.

--- 
 
## ✨ Features

| Feature | Description |
|---|---|
| 🌐 Web Extraction | Pulls content from any public URL |
| 📄 PDF Uploads | Upload and process local PDF documents |
| 🧠 RAG Pipeline | Context-aware summarization via FAISS retrieval |
| ⚡ Groq Inference | Near-instant LLM responses via Llama 3 |
| 💬 Document Chat | Ask specific questions about the processed content |
| 🔐 Firebase Auth | Email/Password & Google Sign-In support |
| 📊 Dashboard | Manage and review past summaries & chats |
| 🎨 Modern UI | Next.js + Tailwind CSS + Framer Motion |

---

## 🏗️ Tech Stack

### Backend
- **Python** + **FastAPI** — REST API server
- **LangChain** — RAG orchestration & text splitting
- **Groq API** — Fast LLM inference
- **FAISS** — Vector store for semantic search
- **Firebase Admin SDK** — Token verification for protected routes

### Frontend
- **Next.js (App Router)** — Modern React framework
- **Tailwind CSS** — Utility-first styling & Glassmorphism
- **Framer Motion** — Smooth micro-animations
- **Firebase JS SDK** — Client-side authentication

---

## 🧠 How It Works

```
User Input (URL / PDF)
      │
      ▼
 Content Extraction (Web Scraper / PyPDFLoader)
      │
      ▼
 Text Chunking (LangChain Splitter)
      │
      ▼
 Embeddings Generation (HuggingFace)
      │
      ▼
 FAISS Vector Store  ←──────────────┐
      │                             │
      ▼                             │
 Relevant Chunk Retrieval ──────────┘
      │
      ▼
 Groq LLM → Summary / Chat Answer
      │
      ▼
 Next.js Dashboard UI
```

---

## 📂 Project Structure

```
Web_Summarizer/
│
├── backend/
│   ├── main.py              # FastAPI app, routes & Firebase Admin setup
│   ├── rag_pipeline.py      # LangChain RAG logic & Document Loading
│   ├── auth_dependency.py   # Firebase token verification
│   ├── db.py                # Database models/config
│   ├── requirements.txt     # Python dependencies
│   └── faiss_indexes/       # Stored FAISS vector indexes (Ignored in Git)
│
├── frontend/
│   ├── app/                 # Next.js App Router (Pages & Layouts)
│   ├── src/
│   │   ├── components/      # Reusable React components (Navbar, Modals)
│   │   ├── context/         # Auth & Theme Context Providers
│   │   ├── lib/             # Firebase init & API request wrappers
│   │   └── pages/           # Page Content Components
│   ├── public/              # Static assets
│   ├── package.json
│   └── next.config.mjs
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

### 3️⃣ Environment & Firebase Keys

1. Create a `.env` file inside the `backend/` folder:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```
2. Place your `serviceAccountKey.json` from the Firebase Console inside the `backend/` folder.

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

Frontend will be available at `http://localhost:3000`

---

## 🔐 Authentication

Authentication has been fully upgraded to **Firebase**:
- **Google Sign-In** — One-click OAuth authentication.
- **Email/Password** — Standard secure signup and login flows.
- **Protected API Routes** — The FastAPI backend securely validates Firebase ID Tokens using the Firebase Admin SDK.

---

## 🚀 Future Enhancements

- [x] 📄 PDF summarization
- [x] 💬 Chat with documents
- [x] 🔐 Firebase Authentication Integration
- [x] 🎨 Next.js App Router Migration
- [ ] 📊 Analytics dashboard
- [ ] 🌍 Multi-language support
- [ ] ☁️ Deployment (AWS / GCP / Vercel)

---

## ⚠️ Important Notes

- **Never commit your `.env` or `serviceAccountKey.json` files!**
- FAISS indexes are automatically stored locally. Make sure your `.gitignore` includes:
  ```gitignore
  backend/serviceAccountKey.json
  backend/faiss_indexes/
  frontend/.next/
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
- [Next.js](https://nextjs.org/) — The React Framework for the Web

---

<p align="center">Built with ❤️ Dinesh Seervi.</p>
