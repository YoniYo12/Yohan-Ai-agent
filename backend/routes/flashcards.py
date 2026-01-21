from flask import Blueprint, request, jsonify
from services.openai_service import ask_openai
import json
import re

flashcards_bp = Blueprint("flashcards_bp", __name__)

@flashcards_bp.route("/api/flashcards", methods=["POST"])
def generate_flashcards():
    data = request.get_json()
    topic = data.get("topic")

    prompt = f"""
    Generate 5 study flashcards about {topic}.
    
    Return ONLY valid JSON.
    No markdown. No code blocks. No explanations.
    The output must match this EXACT format:
    
    [
      {{"question": "string", "answer": "string"}},
      {{"question": "string", "answer": "string"}},
      {{"question": "string", "answer": "string"}},
      {{"question": "string", "answer": "string"}},
      {{"question": "string", "answer": "string"}}
    ]
    
    Rules:
    - DO NOT wrap JSON in backticks.
    - Return ONLY the JSON array, nothing else.
    """

    ai_response = ask_openai(prompt)

    try:
        # Remove markdown code blocks if present
        cleaned_response = re.sub(r'^```json\s*', '', ai_response.strip())
        cleaned_response = re.sub(r'\s*```$', '', cleaned_response)
        
        flashcards = json.loads(cleaned_response)
        return jsonify(flashcards)
    except Exception as e:
        return jsonify({"error": "Invalid JSON", "raw": ai_response, "exception": str(e)}), 500
