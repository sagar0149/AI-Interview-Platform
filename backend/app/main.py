from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base
from app.database import engine

from app.models.user import User
from app.models.resume import Resume
from app.models.interview_result import InterviewResult

from app.routers import auth
from app.routers import resume
from app.routers import interview
from app.routers import video
from app.routers import resume_builder
from app.routers import profile

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Interview Platform",
    version="1.0.0"
)

app.include_router(
    video.router
)

app.include_router(
    profile.router
)

app.include_router(
    resume_builder.router
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router)
app.include_router(resume.router)
app.include_router(interview.router)


@app.get("/")
def root():
    return {
        "message": "AI Interview Platform Backend Running",
        "status": "success"
    }


@app.get("/health")
def health():
    return {
        "server": "running",
        "database": "sqlite"
    }