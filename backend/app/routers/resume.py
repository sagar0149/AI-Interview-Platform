
import os

from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import HTTPException

from pypdf import PdfReader

from app.ai.ollama_service import (
    analyze_resume,
    generate_interview_questions
)

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...)
):

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    try:

        filepath = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        with open(
            filepath,
            "wb"
        ) as buffer:

            buffer.write(
                await file.read()
            )

        resume_text = ""

        reader = PdfReader(
            filepath
        )

        for page in reader.pages:

            text = page.extract_text()

            if text:
                resume_text += (
                    text + "\n"
                )

        if not resume_text.strip():

            raise HTTPException(
                status_code=400,
                detail="No readable text found in PDF"
            )

        # AI Resume Analysis
        analysis = analyze_resume(
            resume_text
        )

        # AI Interview Questions
        questions = (
            generate_interview_questions(
                resume_text
            )
        )

        return {
            "success": True,
            "filename": file.filename,
            "analysis": analysis,
            "questions": questions
        }

    except Exception as e:

        print(
            "Resume Error:",
            str(e)
        )

        raise HTTPException(
            status_code=500,
            detail=f"Resume Processing Error: {str(e)}"
        )

