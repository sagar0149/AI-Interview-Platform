from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Form  # <-- IMPORTANT: Required to read the question from frontend
from fastapi import HTTPException
import os

from app.services.video_analysis import analyze_video

router = APIRouter(
    prefix="/video",
    tags=["Video"]
)

UPLOAD_FOLDER = "video_uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

@router.post("/upload")
async def upload_video(
    file: UploadFile = File(...),
    question: str = Form(...)  # <-- Catching the question from the React frontend
):
    try:
        filepath = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        with open(filepath, "wb") as buffer:
            buffer.write(await file.read())

        # <-- Passing BOTH the file and the question to your AI analyzer
        analysis = analyze_video(filepath, question)

        return {
            "success": True,
            "message": "Video uploaded successfully",
            "filename": file.filename,
            "analysis": analysis
        }

    except Exception as e:
        print("========== VIDEO ERROR ==========")
        print(str(e))
        print("================================")

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )