from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.rating import Rating
from app.models.comment import Comment
from app.models.user import User
from app.schemas.rating import RatingCreate, RatingResponse, CommentCreate, CommentResponse
from app.auth import get_current_user
from typing import List
import uuid

router = APIRouter(tags=["Ratings & Comments"])

@router.post("/movies/{movie_id}/rate", response_model=RatingResponse)
def rate_movie(
    movie_id: str,
    rating: RatingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    existing = db.query(Rating).filter(
        Rating.movie_id == movie_id,
        Rating.user_id == current_user.id
    ).first()

    if existing:
        existing.stars = rating.stars
        existing.vote = rating.vote
        db.commit()
        db.refresh(existing)
        return existing

    new_rating = Rating(
        movie_id=uuid.UUID(movie_id),
        user_id=current_user.id,
        stars=rating.stars,
        vote=rating.vote
    )
    db.add(new_rating)
    db.commit()
    db.refresh(new_rating)
    return new_rating

@router.post("/movies/{movie_id}/comment", response_model=CommentResponse)
def add_comment(
    movie_id: str,
    comment: CommentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_comment = Comment(
        movie_id=uuid.UUID(movie_id),
        user_id=current_user.id,
        content=comment.content
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment

@router.get("/movies/{movie_id}/comments", response_model=List[CommentResponse])
def get_comments(movie_id: str, db: Session = Depends(get_db)):
    comments = db.query(Comment).filter(Comment.movie_id == movie_id).all()
    return comments