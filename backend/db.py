import os

from dotenv import load_dotenv
from pymongo import MongoClient

BASE_DIR = os.path.dirname(__file__)
load_dotenv(os.path.join(BASE_DIR, ".env"))
load_dotenv(os.path.join(BASE_DIR, "..", ".env"))

mongodb_url = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
db_name = os.getenv("MONGODB_DB_NAME", "summarizer")

client = MongoClient(mongodb_url)
db = client[db_name]

users_col = db["users"]
summaries_col = db["summaries"]
chat_history_col = db["chat_history"]