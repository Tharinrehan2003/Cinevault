from sqlalchemy import Column, String, Text, Integer, DECIMAL, ARRAY
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy import DateTime
import uuid
from app.database import Base

class Movie(Base):
    __tablename__ = "movies"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    poster_url = Column(String(500))
    release_year = Column(Integer)
    director = Column(String(100))
    imdb_rating = Column(DECIMAL(3, 1))
    rotten_tomatoes = Column(Integer)
    my_rating = Column(DECIMAL(3, 1))
    trailer_url = Column(String(500))
    genres = Column(ARRAY(String))
    cast = Column(JSONB)
    created_at = Column(DateTime, server_default=func.now())