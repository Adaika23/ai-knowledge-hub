# =========================================
# 📦 Import SQLAlchemy Components
# =========================================

from sqlalchemy import Column, Integer, String, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship

# Import Base from database.py
from database import Base


# =========================================
# 👤 Users Table Model
# =========================================
class User(Base):
    __tablename__ = "users"

    # User ID
    id = Column(Integer, primary_key=True, index=True)

    # Username must be unique
    username = Column(String, unique=True, index=True, nullable=False)

    # Hashed password, not plain password
    hashed_password = Column(String, nullable=False)

    # Relationship: one user can have many notes
    notes = relationship("Note", back_populates="owner")


# =========================================
# 📝 Notes Table Model
# =========================================
class Note(Base):
    __tablename__ = "notes"

    # Note ID
    id = Column(Integer, primary_key=True, index=True)

    # Note title
    title = Column(String, index=True)

    # Note content
    content = Column(String)

    # Stores OpenAI embedding vector for semantic search
    embedding = Column(JSON, nullable=True)

    # Connect note to user ID
    user_id = Column(Integer, ForeignKey("users.id"))

    # Relationship: each note belongs to one user
    owner = relationship("User", back_populates="notes")