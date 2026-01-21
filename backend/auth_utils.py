import jwt
import os
from datetime import datetime, timedelta
from bson import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET")



def hash_password(password):
    return generate_password_hash(password)


def check_password(password, hashed):
    return check_password_hash(hashed, password)



def create_token(user_id):
    payload = {
        "user_id": str(user_id),
        "exp": datetime.utcnow() + timedelta(days=7)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")



def decode_token(token):
    try:
        decoded = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        decoded["user_id"] = ObjectId(decoded["user_id"])
        return decoded
    except Exception as e:
        print("DECODE ERROR:", e)
        return None
