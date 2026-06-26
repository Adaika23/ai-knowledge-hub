# =========================================
# 📦 Database Configuration
# =========================================

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# =========================================
# 🔐 PostgreSQL Database URL
# =========================================

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:Postgre-2026-Sql$@localhost:5432/ai_knowledge_hub"
)

# =========================================
# ⚙️ Create Database Engine
# =========================================
engine = create_engine(DATABASE_URL)

# =========================================
# 🧩 Create Database Session
# =========================================
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# =========================================
# 🏗️ Base Class for Models
# =========================================
Base = declarative_base()

# =========================================
# 🔄 Database Dependency
# =========================================
# Creates a database session for each request

def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()