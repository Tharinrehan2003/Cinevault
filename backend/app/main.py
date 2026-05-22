from fastapi import FastAPI
from app.routers import movies, auth, ratings

app = FastAPI(title="CineVault API")

app.include_router(movies.router)
app.include_router(auth.router)
app.include_router(ratings.router)

@app.get("/")
def root():
    return {"message": "CineVault API is running"}