from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from db import users_collection
from bson import ObjectId

auth_bp = Blueprint("auth", __name__)

# REGISTER
@auth_bp.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data["name"]
    email = data["email"]
    password = data["password"]

    if users_collection.find_one({"email": email}):
        return {"error": "User already exists"}, 400

    hashed_pw = generate_password_hash(password)
    result = users_collection.insert_one({
        "name": name,
        "email": email,
        "password": hashed_pw
    })

    session["user_id"] = str(result.inserted_id)
    session["email"] = email

    return {"name": name, "email": email}


# LOGIN
@auth_bp.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

    user = users_collection.find_one({"email": email})
    if not user or not check_password_hash(user["password"], password):
        return {"error": "Invalid credentials"}, 400

    session["user_id"] = str(user["_id"])
    session["email"] = user["email"]

    return {"name": user["name"], "email": user["email"]}


# CHECK LOGIN (ME)
@auth_bp.route("/api/me", methods=["GET"])
def me():
    if "user_id" not in session:
        return {"error": "Not logged in"}, 401

    user = users_collection.find_one({"_id": ObjectId(session["user_id"])})

    return {"name": user["name"], "email": user["email"]}


# LOGOUT
@auth_bp.route("/api/logout", methods=["POST"])
def logout():
    session.clear()
    return {"message": "Logged out"}
