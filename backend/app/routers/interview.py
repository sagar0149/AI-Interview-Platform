
from fastapi import APIRouter
from pydantic import BaseModel

from fastapi.responses import FileResponse

from app.database import SessionLocal
from app.models.interview_result import InterviewResult

from app.utils.pdf_generator import (
    generate_report
)

from app.ai.ollama_service import (
    generate_interview_questions,
    evaluate_answer
)

router = APIRouter(
    prefix="/interview",
    tags=["Interview"]
)


class InterviewRequest(BaseModel):
    role: str


class EvaluationRequest(BaseModel):
    question: str
    answer: str


# Generate Interview Questions
@router.post("/generate")
def generate_interview(data: InterviewRequest):

    questions = generate_interview_questions(
        data.role
    )

    return {
        "role": data.role,
        "questions": questions
    }


# Evaluate Answer
@router.post("/evaluate")
def evaluate_interview_answer(
    data: EvaluationRequest
):

    result = evaluate_answer(
        data.question,
        data.answer
    )

    db = SessionLocal()

    interview = InterviewResult(
        role="General",
        question=data.question,
        answer=data.answer,
        evaluation=result["evaluation"],
        score=result["score"]
    )

    db.add(interview)
    db.commit()

    return {
        "score": result["score"],
        "evaluation": result["evaluation"]
    }


# Interview History
@router.get("/history")
def get_history():

    db = SessionLocal()

    interviews = db.query(
        InterviewResult
    ).all()

    return interviews


# Analytics
@router.get("/analytics")
def analytics():

    db = SessionLocal()

    interviews = db.query(
        InterviewResult
    ).all()

    total = len(interviews)

    if total == 0:

        return {
            "total_interviews": 0,
            "average_score": 0,
            "highest_score": 0
        }

    scores = [
        interview.score
        for interview in interviews
        if interview.score is not None
    ]

    average_score = (
        sum(scores) / len(scores)
        if scores else 0
    )

    highest_score = (
        max(scores)
        if scores else 0
    )

    return {
        "total_interviews": total,
        "average_score": round(
            average_score,
            2
        ),
        "highest_score": highest_score
    }


# Download PDF Report
@router.post("/report")
def download_report(
    data: EvaluationRequest
):

    result = evaluate_answer(
        data.question,
        data.answer
    )

    filename = "interview_report.pdf"

    generate_report(
        filename,
        data.question,
        data.answer,
        result["evaluation"]
    )

    return FileResponse(
        filename,
        media_type="application/pdf",
        filename="Interview_Report.pdf"
    )
