from fastapi import FastAPI
from app.routers import movies

app = FastAPI(title="CineVault API")

app.include_router(movies.router)

@app.get("/")
def root():
    return {"message": "CineVault API is running"}