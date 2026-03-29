from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from db import users_col
from auth import hash_password, verify_password, create_access_token
import uuid

router = APIRouter()

class UserSignup(BaseModel):
    email: str
    username: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

# ✅ Signup
@router.post("/signup")
def signup(user: UserSignup):
    # Validate input
    if len(user.username) < 3:
        raise HTTPException(status_code=400, detail="Username must be at least 3 characters")
    if len(user.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")
    if len(user.password) > 72:
        raise HTTPException(status_code=400, detail="Password too long (max 72 characters)")

    # Check if email already exists
    existing_email = users_col.find_one({"email": user.email})
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already exists")

    # Check if username already exists
    existing_username = users_col.find_one({"username": user.username})
    if existing_username:
        raise HTTPException(status_code=400, detail="Username already taken")

    users_col.insert_one({
        "_id": str(uuid.uuid4()),
        "email": user.email,
        "username": user.username,
        "password": hash_password(user.password)
    })

    return {"message": "Account created successfully! Please log in.", "success": True}

# ✅ Login
@router.post("/login")
def login(user: UserLogin):
    db_user = users_col.find_one({"email": user.email})

    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"user_id": db_user["_id"]})

    return {"access_token": token}