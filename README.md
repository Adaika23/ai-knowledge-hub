# 🤖 AI Knowledge Hub

A full-stack AI-powered Knowledge Management System that enables users to store personal notes and documents, perform semantic search using OpenAI embeddings, and ask questions through a Retrieval-Augmented Generation (RAG) assistant.

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected API Routes

## Knowledge Management

- Create, Edit, Delete Notes
- Upload PDF, DOCX, and TXT Documents
- PostgreSQL Storage

## AI Features

- OpenAI Embeddings
- Semantic Search
- Similarity Threshold Filtering
- Retrieval-Augmented Generation (RAG)
- AI Chat Assistant
- Markdown Responses
- Source Attribution
- Source Preview
- Source Viewer

## Chat Features

- Chat History
- Copy Response
- Download Chat
- Clear Chat

---

# Technology Stack

## Frontend

- React
- Vite
- JavaScript
- React Markdown

## Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication

## AI

- OpenAI GPT-4o-mini
- OpenAI text-embedding-3-small

---

# System Architecture

User

↓

React Frontend

↓

FastAPI Backend

↓

PostgreSQL Database

↓

OpenAI Embeddings

↓

Semantic Search

↓

GPT-4o-mini

↓

AI Response with Sources

---

# Installation

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Environment Variables

Create a `.env` file:

```text
OPENAI_API_KEY=your_openai_key
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
```

---

# API Endpoints

## Authentication

POST /register

POST /login

---

## Notes

GET /notes

POST /notes

PUT /notes/{id}

DELETE /notes/{id}

---

## Documents

POST /upload-document

GET /documents

DELETE /documents/{id}

---

## AI

POST /ask-ai

GET /chat-history

DELETE /chat-history

---

# Current Features

- Semantic Search
- RAG
- Similarity Threshold
- Markdown Rendering
- Source Cards
- Source Preview
- Chat History
- Document Upload
- JWT Authentication

---

# Future Improvements

- Confidence Indicator
- Light/Dark Theme
- Responsive Mobile Design
- Streaming AI Responses
- Docker Deployment
- Cloud Deployment

---

# Author

Adaika Obub

Bachelor of Science in Computer Science

San Diego State University

---

# License

MIT License
