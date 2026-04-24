from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware  # ✅ ADD

app = FastAPI()

# ✅ ADD THIS BLOCK
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request format
class AIRequest(BaseModel):
    question: str

# Root route (optional)
@app.get("/")
def home():
    return {"message": "Backend is running"}

# AI endpoint
@app.post("/ask-ai")
def ask_ai(request: AIRequest):
    question = request.question

    return {
        "answer": f"You asked: '{question}'. This is a backend response."
    }