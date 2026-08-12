import os
import uuid

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import getSampleStyleSheet

from google import genai


# ==========================================
# Gemini Configuration
# ==========================================

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("WARNING: GEMINI_API_KEY is not configured.")

client = genai.Client(
    api_key=GEMINI_API_KEY
)

MODEL_NAME = "gemini-3.6-flash"


# ==========================================
# Router
# ==========================================

router = APIRouter(
    prefix="/api/resume-builder",
    tags=["Resume Builder"]
)


# ==========================================
# Request Model
# ==========================================

class SummaryRequest(BaseModel):
    skills: str
    projects: str


# ==========================================
# Generate Resume PDF
# ==========================================

@router.post("/generate-pdf")
async def generate_resume_pdf(
    data: dict
):

    try:

        # Vercel allows temporary file storage in /tmp
        output_folder = "/tmp/generated_resumes"

        os.makedirs(
            output_folder,
            exist_ok=True
        )

        filename = (
            f"resume_{uuid.uuid4()}.pdf"
        )

        pdf_path = os.path.join(
            output_folder,
            filename
        )

        doc = SimpleDocTemplate(
            pdf_path
        )

        styles = getSampleStyleSheet()

        content = []

        # ==================================
        # Personal Information
        # ==================================

        content.append(
            Paragraph(
                str(data.get("name", "")),
                styles["Title"]
            )
        )

        content.append(
            Spacer(1, 12)
        )

        content.append(
            Paragraph(
                f"Email: {data.get('email', '')}",
                styles["BodyText"]
            )
        )

        content.append(
            Paragraph(
                f"Phone: {data.get('phone', '')}",
                styles["BodyText"]
            )
        )

        content.append(
            Paragraph(
                f"Location: {data.get('location', '')}",
                styles["BodyText"]
            )
        )

        content.append(
            Spacer(1, 12)
        )

        # ==================================
        # Resume Sections
        # ==================================

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

            value = data.get(
                section,
                ""
            )

            if value:

                content.append(
                    Paragraph(
                        section.title(),
                        styles["Heading2"]
                    )
                )

                content.append(
                    Paragraph(
                        str(value),
                        styles["BodyText"]
                    )
                )

                content.append(
                    Spacer(1, 10)
                )

        # ==================================
        # Create PDF
        # ==================================

        doc.build(content)

        return FileResponse(
            pdf_path,
            media_type="application/pdf",
            filename="Resume.pdf"
        )

    except Exception as e:

        print(
            "Resume PDF Error:",
            str(e)
        )

        raise HTTPException(
            status_code=500,
            detail=f"PDF generation failed: {str(e)}"
        )


# ==========================================
# Generate AI Resume Summary
# ==========================================

@router.post("/generate-summary")
async def generate_summary(
    data: SummaryRequest
):

    prompt = f"""
You are a professional resume writer.

Generate a professional resume summary for a candidate.

Skills:
{data.skills}

Projects:
{data.projects}

Write 4-5 professional sentences.

The summary should:
- Be professional.
- Be suitable for a modern resume.
- Highlight relevant technical skills.
- Mention project experience where appropriate.
- Avoid making up information.
- Be concise.
- Return ONLY the summary.
"""

    try:

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )

        summary = response.text.strip()

        return {
            "summary": summary
        }

    except Exception as e:

        print(
            "Resume Summary Error:",
            str(e)
        )

        raise HTTPException(
            status_code=500,
            detail=f"AI summary generation failed: {str(e)}"
        )