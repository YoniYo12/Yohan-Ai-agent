from flask import Blueprint, request, jsonify
from services.openai_service import ask_openai
import json

quiz_bp = Blueprint("quiz_bp", __name__)

@quiz_bp.route("/api/quiz", methods=["POST"])
def generate_quiz():
    data = request.get_json()
    topic = data.get("topic")

    prompt = f"""
    Generate a 5-question multiple-choice quiz about {topic}.
    Respond ONLY in valid JSON in this format:

    [
      {{
        "question": "string",
        "options": ["A", "B", "C", "D"],
        "answer": "A"
      }},
      ...
    ]
    """

    ai_response = ask_openai(prompt)

    try:
        quiz_data = json.loads(ai_response)
        return jsonify(quiz_data)
    except:
        return jsonify({"error": "Invalid JSON", "raw": ai_response}), 500
