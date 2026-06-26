# AI Knowledge Hub

AI Knowledge Hub is a full-stack web application that allows users to save notes, upload documents, search knowledge, and ask AI questions based on their personal knowledge base.

## Features

- User registration and login
- JWT authentication
- Create, read, update, and delete notes
- Keyword search
- Semantic search using OpenAI embeddings
- Upload PDF, DOCX, and TXT documents
- Extract text from uploaded documents
- AI assistant powered by RAG
- AI answers based on saved notes and uploaded documents
- Source cards with similarity scores
- Chat history
- Clear chat history
- Download chat history
- Markdown AI responses
- Responsive login UI
- Environment variable support for deployment

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS
- React Markdown

### Backend

- FastAPI
- Python
- SQLAlchemy
- PostgreSQL
- JWT authentication
- OpenAI API
- PyMuPDF
- python-docx

### AI

- OpenAI chat model
- OpenAI embeddings
- Cosine similarity
- Retrieval-Augmented Generation

## Project Structure

```text
AI-KNOWLEDGE-HUB
|
|-- backend
|   |-- .env
|   |-- requirements.txt
|   |-- database.py
|   |-- main.py
|   |-- models.py
|   |-- schemas.py
|
|-- frontend
|   |-- .env
|   |-- package.json
|   |-- src
|   |-- public
|
|-- README.md
|-- .gitignore
```

## How It Works

1. A user creates notes or uploads documents.
2. The backend extracts text from uploaded files.
3. The system generates embeddings for notes and documents.
4. When the user asks a question, the app generates an embedding for the question.
5. The backend compares the question embedding with stored note and document embeddings.
6. The most relevant sources are selected.
7. The AI answers using only those sources.
8. The frontend displays the answer, source cards, previews, and similarity scores.

## Main Backend Endpoints

```text
POST   /register
POST   /login
GET    /notes
POST   /notes
PUT    /notes/{note_id}
DELETE /notes/{note_id}

GET    /search
GET    /semantic-search

POST   /upload-document
GET    /documents
GET    /documents/{document_id}
DELETE /documents/{document_id}

POST   /ask-ai
GET    /chat-history
DELETE /chat-history
```

## Environment Variables

### Frontend `.env`

```env
VITE_API_URL=http://127.0.0.1:8000
```

### Backend `.env`

```env
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=your_database_url
```

## Run Locally

### Backend

```bash
cd backend
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## Deployment Plan

### Frontend

Deploy React frontend using Vercel or Netlify.

Set this environment variable:

```env
VITE_API_URL=https://your-backend-url.com
```

### Backend

Deploy FastAPI backend using Render.

Required setup:

```text
Build command:
pip install -r requirements.txt

Start command:
uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Database

Use hosted PostgreSQL such as:

- Render PostgreSQL
- Neon
- Supabase

## Screenshots

Add screenshots here:

```text
Login Page
Dashboard
Notes Page
Document Upload
AI Chat
Source Cards
Semantic Search
```

## Future Improvements

- Mobile responsive layout
- Better loading animations
- Streaming AI responses
- Persistent source cards in chat history
- User profile settings
- Password reset
- Deployment with production database
- Improved dashboard analytics

## Author

Adaika Obub

Computer Science graduate and full-stack developer focused on AI-powered applications, backend systems, semantic search, and secure web development.

## License

This project is for learning, portfolio, and demonstration purposes.
