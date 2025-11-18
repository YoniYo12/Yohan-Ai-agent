from flask import Flask
from flask_cors import CORS

from routes.flashcards import flashcards_bp
from routes.quiz import quiz_bp
from routes.agent import agent_bp  
from routes.auth import auth_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp)
app.register_blueprint(flashcards_bp)
app.register_blueprint(quiz_bp)
app.register_blueprint(agent_bp)  

if __name__ == "__main__":
    app.run(debug=True)
