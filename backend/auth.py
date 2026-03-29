# auth.py
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import hashlib

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def _preprocess_password(password: str) -> str:
    """
    Pre-hash password with SHA256 to work around bcrypt's 72-byte limit.
    SHA256 produces a 64-character hex string which is always < 72 bytes.
    This approach is consistent and eliminates all edge cases.
    """
    password_bytes = password.encode('utf-8')
    sha256_hash = hashlib.sha256(password_bytes).hexdigest()
    return sha256_hash

def hash_password(password: str):
    # Always pre-hash with SHA256 for consistency and to avoid bcrypt's 72-byte limit
    processed = _preprocess_password(password)
    return pwd_context.hash(processed)

def verify_password(plain, hashed):
    # Apply the same preprocessing before verification
    processed = _preprocess_password(plain)
    return pwd_context.verify(processed, hashed)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=60)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)