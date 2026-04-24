from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

notes = []

@app.get("/")
def home():
    return {"message": "Backend is running"}

@app.get("/notes")
def get_notes():
    return notes

@app.post("/notes")
def create_note(note: dict):
    for n in notes:
        if n["title"] == note["title"] and n["content"] == note["content"]:
            return {"message": "Duplicate note ignored"}

    note["id"] = str(uuid.uuid4())
    notes.append(note)

    return {"message": "Note added", "note": note}

@app.get("/search")
def search_notes(query: str):
    results = [
        n for n in notes
        if query.lower() in n["title"].lower()
        or query.lower() in n["content"].lower()
    ]

    return {"results": results}