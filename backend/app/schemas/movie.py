from pydantic import BaseModel
from typing import Optional, List
from decimal import Decimal
import uuid

class MovieBase(BaseModel):
    title: str
    description: str
    poster_url: Optional[str] = None
    release_year: Optional[int] = None
    director: Optional[str] = None
    imdb_rating: Optional[Decimal] = None
    rotten_tomatoes: Optional[int] = None
    my_rating: Optional[Decimal] = None
    trailer_url: Optional[str] = None
    genres: Optional[List[str]] = None
    cast: Optional[list] = None

class MovieCreate(MovieBase):
    pass

class MovieResponse(MovieBase):
    id: uuid.UUID

    class Config:
        from_attributes = True