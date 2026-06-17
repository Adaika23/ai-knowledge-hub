# ================================
# 🔹 Imports
# ================================
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# 🔹 Load environment variables (.env)
from dotenv import load_dotenv
import os

# 🔹 OpenAI client
from openai import OpenAI

# ================================
# 🔹 Load .env file
# ================================
load_dotenv()

# ================================
# 🔹 Initialize OpenAI client
# ================================
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")  # reads from .env
)

# ================================
# 🔹 Create FastAPI app
# ================================
app = FastAPI()

# ================================
# 🔹 Enable CORS (frontend → backend)
# ================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================================
# 🔹 Request model (input format)
# ================================
class AIRequest(BaseModel):
    question: str

# ================================
# 🔹 Root endpoint (test)
# ================================
@app.get("/")
def home():
    return {"message": "Backend is running"}

# ================================
# 🤖 AI Assistant Route
# ================================
@app.post("/ask-ai")
def ask_ai(request: AIRequest):
    """
    Receives a question from the frontend,
    sends it to OpenAI,
    and returns the AI-generated answer.
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a helpful AI assistant for an AI Knowledge Hub app."
                    ),
                },
                {
                    "role": "user",
                    "content": request.question,
                },
            ],
        )

        return {
            "answer": response.choices[0].message.content
        }

    except Exception as e:
        return {
            "answer": f"AI error: {str(e)}"
        }