# =========================================
# 📦 Pydantic Schemas
# =========================================
# Schemas control API request and response data

from pydantic import BaseModel


# =========================================
# 👤 User Registration Schema
# =========================================
class UserRegister(BaseModel):
    username: str
    password: str


# =========================================
# 🔐 User Login Schema
# =========================================
class UserLogin(BaseModel):
    username: str
    password: str


# =========================================
# 📝 Schema for Creating Notes
# =========================================
class NoteCreate(BaseModel):
    title: str
    content: str


# =========================================
# 📤 Schema for Returning Notes
# =========================================
class NoteResponse(BaseModel):

    # Note ID
    id: int

    # Note title
    title: str

    # Note content
    content: str

    # Owner user ID
    user_id: int

    class Config:
        from_attributes = True


# =========================================
# 🤖 AI Request Schema
# =========================================
class AIRequest(BaseModel):
    question: str