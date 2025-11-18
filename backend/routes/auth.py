from flask import Blueprint, request, jsonify
from db import users_collection
from auth_utils import hash_password, check_password, create_token, decode_token

auth_bp = Blueprint("auth_bp", __name__)

# REGISTER
@auth_bp.route("/api/auth/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # Check if user exists
    if users_collection.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 400

    # Create user
    hashed_pw = hash_password(password)
    result = users_collection.insert_one({
        "name": name,
        "email": email,
        "password": hashed_pw
    })

    token = create_token(result.inserted_id)
    return jsonify({"token": token, "name": name, "email": email})
    

# LOGIN
@auth_bp.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"error": "Invalid credentials"}), 400

    if not check_password(password, user["password"]):
        return jsonify({"error": "Invalid credentials"}), 400

    token = create_token(user["_id"])

    return jsonify({
        "token": token,
        "name": user["name"],
        "email": user["email"]
    })

# ME — Protected route
@auth_bp.route("/api/auth/me", methods=["GET"])
def me():
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"error": "No token"}), 401

    decoded = decode_token(token)
    if not decoded:
        return jsonify({"error": "Invalid token"}), 401

    user = users_collection.find_one({"_id": decoded["user_id"]})
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "name": user["name"],
        "email": user["email"]
    })
