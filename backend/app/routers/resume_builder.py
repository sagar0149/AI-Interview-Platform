from ollama import chat
from pydantic import BaseModel
class SummaryRequest(BaseModel):
    skills: str
    projects: str

from fastapi import APIRouter
from fastapi.responses import FileResponse

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)

import uuid
import os

router = APIRouter(
    prefix="/resume-builder",
    tags=["Resume Builder"]
)


@router.post("/generate-pdf")
async def generate_resume_pdf(
    data: dict
):

    filename = (
        f"resume_{uuid.uuid4()}.pdf"
    )

    pdf_path = os.path.join(
        "generated_resumes",
        filename
    )

    os.makedirs(
        "generated_resumes",
        exist_ok=True
    )

    doc = SimpleDocTemplate(
        pdf_path
    )

    styles = (
        getSampleStyleSheet()
    )

    content = []

    content.append(
        Paragraph(
            data.get(
                "name",
                ""
            ),
            styles["Title"]
        )
    )

    content.append(
        Spacer(1, 12)
    )

    content.append(
        Paragraph(
            f"Email: {data.get('email','')}",
            styles["BodyText"]
        )
    )

    content.append(
        Paragraph(
            f"Phone: {data.get('phone','')}",
            styles["BodyText"]
        )
    )

    content.append(
        Paragraph(
            f"Location: {data.get('location','')}",
            styles["BodyText"]
        )
    )

    content.append(
        Spacer(1, 12)
    )

    sections = [
        "summary",
        "experience",
        "education",
        "skills",
        "projects",
        "certifications",
        "achievements",
        "languages",
        "interests"
    ]

    for section in sections:

        content.append(
            Paragraph(
                section.title(),
                styles["Heading2"]
            )
        )

        content.append(
            Paragraph(
                data.get(
                    section,
                    ""
                ),
                styles["BodyText"]
            )
        )

        content.append(
            Spacer(1, 10)
        )

    doc.build(content)

    return FileResponse(
        pdf_path,
        media_type=
        "application/pdf",
        filename="Resume.pdf"
    )
    
    
    
@router.post("/generate-summary")
async def generate_summary(
    data: SummaryRequest
):

    prompt = f"""
You are a professional resume writer.

Generate a professional resume summary.

Skills:
{data.skills}

Projects:
{data.projects}

Write 4-5 professional sentences.

Return only the summary.
"""

    response = chat(
        model="llama3.1:8b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return {
        "summary":
        response["message"]["content"]
    }



