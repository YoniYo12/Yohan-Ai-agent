import bcrypt
import jwt
import datetime
import os
from dotenv import load_dotenv

load_dotenv()
JWT_SECRET = os.getenv("JWT_SECRET", "supersecretkey")  # CHANGE THIS

# Hash password
def hash_password(password):
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

# Check password
def check_password(password, hashed):
    return bcrypt.checkpw(password.encode("utf-8"), hashed)

# Create JWT token
def create_token(user_id):
    payload = {
        "user_id": str(user_id),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

# Decode JWT
def decode_token(token):
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
    except:
        return None
