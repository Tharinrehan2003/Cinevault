from pydantic import BaseModel
from typing import Optional
import uuid

class RatingCreate(BaseModel):
    stars: Optional[int] = None
    vote: Optional[str] = None

class RatingResponse(BaseModel):
    id: uuid.UUID
    movie_id: uuid.UUID
    user_id: uuid.UUID
    stars: Optional[int] = None
    vote: Optional[str] = None

    class Config:
        from_attributes = True

class CommentCreate(BaseModel):
    content: str

class CommentResponse(BaseModel):
    id: uuid.UUID
    movie_id: uuid.UUID
    user_id: uuid.UUID
    content: str

    class Config:
        from_attributes = True