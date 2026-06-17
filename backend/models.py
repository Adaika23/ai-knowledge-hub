# =========================================
# 📦 Import SQLAlchemy Components
# =========================================
from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    ForeignKey,
    DateTime,
    JSON
)

from datetime import datetime
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

    # Relationship: one user can have many chat messages
    chats = relationship("Chat", back_populates="user")


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

# ================================
# 💬 Chat Model
# ================================
class Chat(Base):
    """
    Stores AI conversations for each user.
    """

    __tablename__ = "chats"

    # Primary key
    id = Column(Integer, primary_key=True, index=True)

    # Owner of this conversation
    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    # Who sent the message
    # Example: "user" or "ai"
    sender = Column(String)

    # Message text
    message = Column(Text)

    # Time created
    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    # Relationship
    user = relationship(
        "User",
        back_populates="chats"
    )

    # ================================
# 📄 Uploaded Documents
# ================================
class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    filename = Column(String)

    content = Column(Text)

    embedding = Column(JSON)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

