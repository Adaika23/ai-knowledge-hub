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

from database import Base


# =========================================
# 👤 Users Table Model
# =========================================
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    notes = relationship("Note", back_populates="owner")
    chats = relationship("Chat", back_populates="user")
    documents = relationship("Document", back_populates="owner")


# =========================================
# 📝 Notes Table Model
# =========================================
class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(String)
    embedding = Column(JSON, nullable=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="notes")


# =========================================
# 💬 Chat Model
# =========================================
class Chat(Base):
    __tablename__ = "chats"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    sender = Column(String)
    message = Column(Text)

    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="chats")


# =========================================
# 📄 Documents Table Model (FIXED)
# =========================================
class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    filename = Column(String)
    content = Column(Text)

    embedding = Column(JSON, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="documents")