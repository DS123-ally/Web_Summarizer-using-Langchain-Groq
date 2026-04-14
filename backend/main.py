import os
from typing import Literal

from fastapi import FastAPI, HTTPException
from auth_routes import router as auth_router, ensure_default_user
from auth_dependency import get_current_user
from fastapi import Depends
from fastapi.middleware.cors import CORSMiddleware
from rag_pipeline import chat_with_website, get_recent_chats, summarize_website
from pydantic import BaseModel, Field
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(__file__)
load_dotenv(os.path.join(BASE_DIR, ".env"))
load_dotenv(os.path.join(BASE_DIR, "..", ".env"))

app = FastAPI()

origins = [
    o.strip()
    for o in os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:5173").split(",")
    if o.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
ensure_default_user()

class URLRequest(BaseModel):
    url: str
    strategy: Literal["stuff", "map_reduce", "refine"] = "stuff"
    summary_length: str | int = "medium"


class ChatRequest(BaseModel):
    url: str
    question: str
    history: list[str] = Field(default_factory=list)


@app.get("/protected")
def protected(user_id: str = Depends(get_current_user)):
    return {"message": "Access granted", "user_id": user_id}


@app.post("/summarize")
def summarize(req: URLRequest, user_id: str = Depends(get_current_user)):
    try:
        return summarize_website(
            req.url,
            strategy=req.strategy,
            summary_length=req.summary_length,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/chat")
def chat(req: ChatRequest, user_id: str = Depends(get_current_user)):
    try:
        return chat_with_website(req.url, req.question, req.history, user_id=user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 


@app.get("/chat/history")
def chat_history(user_id: str = Depends(get_current_user)):
    try:
        return {"items": get_recent_chats(user_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))