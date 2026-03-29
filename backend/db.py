from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["summarizer"]

users_col = db["users"]
summaries_col = db["summaries"]
chat_history_col = db["chat_history"]