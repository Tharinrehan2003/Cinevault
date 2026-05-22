from fastapi import FastAPI
from app.routers import movies, auth

app = FastAPI(title="CineVault API")

app.include_router(movies.router)
app.include_router(auth.router)

@app.get("/")
def root():
    return {"message": "CineVault API is running"}