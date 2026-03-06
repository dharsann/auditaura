import sys
import asyncio

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router

app = FastAPI(title="AI Compliance Agent")

# Allow CORS for frontend requests (e.g., from localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust if frontend runs on different port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)