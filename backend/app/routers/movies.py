from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.movie import Movie
from app.schemas.movie import MovieCreate, MovieResponse
from typing import List

router = APIRouter(prefix="/movies", tags=["Movies"])

@router.get("/", response_model=List[MovieResponse])
def get_all_movies(db: Session = Depends(get_db)):
    movies = db.query(Movie).all()
    return movies

@router.get("/{movie_id}", response_model=MovieResponse)
def get_movie(movie_id: str, db: Session = Depends(get_db)):
    movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie

@router.post("/", response_model=MovieResponse)
def create_movie(movie: MovieCreate, db: Session = Depends(get_db)):
    db_movie = Movie(**movie.model_dump())
    db.add(db_movie)
    db.commit()
    db.refresh(db_movie)
    return db_movie