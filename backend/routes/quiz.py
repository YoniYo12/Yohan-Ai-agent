from flask import Blueprint, request, jsonify
from services.openai_service import ask_openai
import json

quiz_bp = Blueprint("quiz_bp", __name__)

@quiz_bp.route("/api/quiz", methods=["POST"])
def generate_quiz():
    data = request.get_json()
    topic = data.get("topic")

    prompt = f"""
    You are a quiz generator.

    Create a 5-question multiple-choice quiz about {topic}.

    Return ONLY valid JSON.
    No markdown. No code blocks. No explanations.
    The output must match this EXACT format:

    [
      {{
        "question": "string",
        "options": {{
          "A": "option text",
          "B": "option text",
          "C": "option text",
          "D": "option text"
        }},
        "answer": "A"
      }}
    ]

    Rules:
    - The correct answer MUST be only: "A", "B", "C", or "D".
    - Options MUST be a dictionary with keys A, B, C, D.
    - DO NOT add extra fields.
    - DO NOT wrap JSON in backticks.
    """

    ai_response = ask_openai(prompt)

    try:
        quiz_data = json.loads(ai_response)
        return jsonify(quiz_data)
    except Exception as e:
        print("JSON PARSE ERROR:", e)
        return jsonify({
            "error": "Invalid JSON from AI",
            "raw": ai_response
        }), 500
