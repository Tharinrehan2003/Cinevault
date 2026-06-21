from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # 1. Import the CORS middleware
from app.routers import movies, auth, ratings

app = FastAPI(title="CineVault API")

# 2. Configure allowed origins (your Next.js frontend website address)
origins = [
    "http://localhost:3000",
]

# 3. Add the CORS middleware to handle preflight (OPTIONS) requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods, including POST and OPTIONS
    allow_headers=["*"],  # Allows all communication headers
)

# Your existing routers
app.include_router(movies.router)
app.include_router(auth.router)
app.include_router(ratings.router)

@app.get("/")
def root():
    return {"message": "CineVault API is running"}