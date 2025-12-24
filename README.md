You can copy–paste this directly into your repository.

🌐 Website Summarizer — LangChain + Groq

A lightweight Streamlit web application that extracts content from a website URL and generates a concise summary using LangChain and Groq LLMs (LLaMA models).

Built for learning, experimentation, and real-world usage with modern LLM tooling.

🚀 Features

1. 🔗 Summarize any public website via URL

2. ⚡ Powered by Groq (LLaMA-3.1-8B-Instant)

3. 🧠 Uses LangChain summarization chains

4. 🎛 Adjustable summary length

5. 🧪 Developer Debug Mode (prompt, docs, runtime info)

6. 📥 Download summary as a .txt file

7. 🧩 Compatible with multiple LangChain versions (safe fallbacks)


🛠 Tech Stack

1. Python 3.10+

2. Streamlit — UI

3. LangChain

4. Groq API (ChatGroq)

5. Unstructured — Web content extraction

6. Validators

📂 Project Structure
Web_Summarizer-using-Langchain-Groq/
│
├── app.py                 # Main Streamlit application
├── requirements.txt       # Project dependencies
├── README.md              # Documentation
└── venv/                  # Virtual environment (ignored)

⚙️ Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/DS123-ally/Web_Summarizer-using-Langchain-Groq.git
cd Web_Summarizer-using-Langchain-Groq

2️⃣ Create & Activate Virtual Environment

python -m venv venv
venv\Scripts\activate

3️⃣ Install Dependencies

pip install -r requirements.txt

4️⃣ Get Groq API Key

1. Create an account at 👉 https://console.groq.com

2. Generate an API key

5️⃣ Run the Application

python -m streamlit run app.py

Access the app at:
👉 http://localhost:8501



👨‍🎓 Author

Dinesh
Computer Engineering Student
Focused on AI, LLMs, LangChain, and Full-Stack Development

⭐ Support

If you find this project helpful:

⭐ Star the repository

🍴 Fork it

🧠 Extend it with new features.











   
