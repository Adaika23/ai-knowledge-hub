AI Knowledge Hub

An AI-powered knowledge management platform that allows users to save notes, search knowledge, and interact with AI using semantic search and embeddings.

🚀 Project Overview

AI Knowledge Hub is a full-stack AI application that combines:

React frontend
FastAPI backend
PostgreSQL database
OpenAI embeddings
JWT authentication
Semantic search
AI assistant integration

The application allows users to:

✅ Register and login securely
✅ Create and manage notes
✅ Search notes with keyword search
✅ Use AI semantic search to find related notes
✅ Store embeddings in PostgreSQL
✅ Retrieve AI-related notes using cosine similarity
✅ Use an AI assistant interface
✅ Toggle dark mode UI

🏗️ System Architecture
React Frontend
↓
FastAPI Backend
↓
PostgreSQL Database
↓
OpenAI Embeddings
↓
Semantic Search Engine
🛠️ Tech Stack
Frontend
React
Vite
JavaScript
CSS
Fetch API
Backend
FastAPI
Python
SQLAlchemy
Pydantic
JWT Authentication
Passlib (Password Hashing)
OpenAI API
Database
PostgreSQL
pgAdmin 4
AI Features
OpenAI Embeddings
Cosine Similarity
Semantic Search
📂 Project Structure
ai-knowledge-hub/
│
├── backend/
│ ├── main.py
│ ├── database.py
│ ├── models.py
│ ├── schemas.py
│ ├── requirements.txt
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── styles.css
│ │
│ ├── package.json
│ └── vite.config.js
│
└── README.md
✨ Features
🔐 Authentication System

Users can:

Register accounts
Login securely
Store JWT tokens
Access protected routes
Logout securely

Authentication uses:

JWT tokens
Password hashing
FastAPI dependency protection
📝 Notes System

Users can:

Create notes
View notes
Search notes
Store notes in PostgreSQL

Each note contains:

Title
Content
Embedding vector
User ID
🔎 Keyword Search

The application supports standard keyword-based searching.

Example:

Artificial Intelligence

Returns notes that directly match keywords.

🤖 AI Semantic Search

The platform includes AI semantic search using OpenAI embeddings.

Semantic search understands meaning instead of exact keywords.

Example:

Search Query:

security monitoring

AI Result:

Cybersecurity
SOC analysts monitor security alerts.

Even though the exact words are different.

🧠 Embedding System

Each note automatically generates an embedding vector.

Embedding flow:

User Note
↓
OpenAI Embedding API
↓
Embedding Vector
↓
Stored in PostgreSQL

Embeddings are later used for:

Semantic search
AI retrieval
AI-powered recommendations
📊 Cosine Similarity

The backend compares embeddings using cosine similarity.

This allows the system to rank notes based on meaning.

Example similarity scores:

Cybersecurity → 0.54
Artificial Intelligence → 0.15

Higher scores mean stronger semantic relationships.

🤖 AI Assistant

The project includes an AI assistant interface where users can ask questions.

Current capabilities:

Ask general AI questions
AI-generated responses
Chat-style UI

Upcoming improvements:

AI answers using personal notes (RAG)
Context-aware note retrieval
Personalized AI responses
🌙 Dark Mode

The application includes a dark mode toggle.

Features:

Light/Dark theme switching
Modern UI styling
Improved user experience
⚙️ Installation Guide
1️⃣ Clone Repository
git clone https://github.com/your-username/ai-knowledge-hub.git
cd ai-knowledge-hub
2️⃣ Backend Setup

Navigate to backend:

cd backend

Create virtual environment:

python -m venv venv

Activate virtual environment:

Windows
venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt
3️⃣ Configure Environment Variables

Create:

backend/.env

Add:

OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=your_postgresql_database_url
SECRET_KEY=your_secret_key
4️⃣ Start Backend Server
uvicorn main:app --reload

Backend runs at:

http://127.0.0.1:8000
5️⃣ Frontend Setup

Navigate to frontend:

cd frontend

Install dependencies:

npm install

Start frontend:

npm run dev

Frontend runs at:

http://localhost:5173
🗄️ PostgreSQL Setup

The project uses PostgreSQL for persistent storage.

Tables include:

users

Stores:

user accounts
usernames
hashed passwords
notes

Stores:

note titles
note content
embeddings
user relationships
🔒 Protected API Routes

Protected routes require JWT authentication.

Example:

POST /notes
GET /notes
GET /semantic-search

Authentication uses:

Authorization: Bearer <token>
📡 API Routes
Authentication
POST /register
POST /login
Notes
GET /notes
POST /notes
Search
GET /search
GET /semantic-search
AI Assistant
POST /ask-ai
🧪 Example Semantic Search Flow
User Search
↓
Generate Query Embedding
↓
Retrieve Stored Note Embeddings
↓
Cosine Similarity Comparison
↓
Return Most Related Notes
🚀 Future Improvements

Planned upgrades:

AI Retrieval-Augmented Generation (RAG)

Allow AI to answer questions using personal notes.

Example:

What do my notes say about cybersecurity?
Additional Features
Edit notes
Delete notes
Categories/tags
File uploads
AI summarization
Voice assistant
Mobile responsiveness
Deployment to cloud
🌍 Deployment Goals
Frontend
Vercel
Netlify
Backend
Render
Railway
Database
Neon
Supabase
📸 Current Project Status

✅ Authentication complete
✅ PostgreSQL integration complete
✅ OpenAI embeddings complete
✅ Semantic search complete
✅ AI assistant UI complete
✅ Dark mode complete
✅ JWT protection complete
✅ Full-stack integration complete

👨‍💻 Developer

Adaika Obub

Computer Science Student
San Diego State University
Full-Stack Development • AI • Cybersecurity

📄 License

This project is for educational and portfolio purposes.

⭐ Acknowledgments

Special thanks to:

OpenAI
FastAPI
React
PostgreSQL
SQLAlchemy
Vite

for providing the tools and technologies used in this project.

I updated your README with a complete professional project overview covering:

AI semantic search
OpenAI embeddings
PostgreSQL integration
JWT authentication
React + FastAPI architecture
Installation/setup steps
API routes
Project structure
Future roadmap
RAG system plans
Deployment goals
Feature explanations
Technical architecture
