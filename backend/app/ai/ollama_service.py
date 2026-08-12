import os
import re
import json

from google import genai


# ==========================================
# Gemini Client
# ==========================================

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("WARNING: GEMINI_API_KEY is not configured.")

client = genai.Client(
    api_key=GEMINI_API_KEY
)


MODEL_NAME = "gemini-3.6-flash"


# ==========================================
# Helper: Generate Gemini Response
# ==========================================

def generate_response(prompt: str) -> str:

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    return response.text.strip()


# ==========================================
# Resume Analysis
# ==========================================

def analyze_resume(resume_text):

    prompt = f"""
You are an expert ATS Resume Analyzer.

Analyze the following resume and return ONLY valid JSON.

Use EXACTLY this structure:

{{
    "ats_score": 0,
    "experience": "",
    "education": "",
    "skills": [],
    "strengths": [],
    "weaknesses": [],
    "recommended_jobs": [],
    "missing_keywords": [],
    "improvement_tips": []
}}

Rules:

- ATS score must be between 0 and 100.
- Extract actual education from the resume.
- Extract actual work experience from the resume.
- Extract actual technical and professional skills.
- Identify genuine strengths.
- Identify genuine weaknesses.
- Suggest suitable job roles.
- Suggest relevant missing keywords.
- Suggest practical resume improvements.
- Do not invent experience that is not present.
- Return ONLY JSON.
- Do not use markdown.
- Do not use ```json.
- Do not add explanations outside the JSON.

Resume:

{resume_text}
"""

    try:

        content = generate_response(prompt)

        # Remove accidental markdown if Gemini adds it
        content = content.replace(
            "```json",
            ""
        )

        content = content.replace(
            "```",
            ""
        )

        content = content.strip()

        result = json.loads(content)

        return result

    except Exception as e:

        print(
            "Resume Analysis Error:",
            str(e)
        )

        return {
            "ats_score": 0,
            "experience": "Not Found",
            "education": "Not Found",
            "skills": [],
            "strengths": [],
            "weaknesses": [
                "AI analysis failed"
            ],
            "recommended_jobs": [],
            "missing_keywords": [],
            "improvement_tips": []
        }


# ==========================================
# Generate Interview Questions
# ==========================================

def generate_interview_questions(
    resume_text
):

    prompt = f"""
You are an expert technical interviewer.

Generate 10 interview questions based on this resume.

Include a mixture of:

- Technical questions
- HR questions
- Project questions
- Questions about skills listed in the resume
- Questions about the candidate's experience

Resume:

{resume_text}

Return ONLY the questions.

Return one question per line.
Do not add explanations.
Do not use markdown.
"""

    try:

        content = generate_response(prompt)

        questions = []

        for line in content.split("\n"):

            line = line.strip()

            # Remove common numbering
            line = re.sub(
                r"^[\-\*\d\.\)\s]+",
                "",
                line
            ).strip()

            if (
                len(line) > 5
                and "?" in line
            ):
                questions.append(line)

        if len(questions) >= 5:

            return questions[:10]

        return [
            "Tell me about yourself.",
            "What are your strongest technical skills?",
            "Explain one project from your resume.",
            "What challenges did you face while developing your project?",
            "Why should we hire you?"
        ]

    except Exception as e:

        print(
            "Interview Question Error:",
            str(e)
        )

        return [
            "Tell me about yourself.",
            "What are your strongest technical skills?",
            "Explain one project from your resume.",
            "What challenges did you face while developing your project?",
            "Why should we hire you?"
        ]


# ==========================================
# Evaluate Interview Answer
# ==========================================

def evaluate_answer(
    question,
    answer
):

    prompt = f"""
You are a Senior Technical Interviewer.

Evaluate the candidate's answer.

Question:

{question}

Candidate Answer:

{answer}

Return EXACTLY in this format:

Score: X/10

Technical Accuracy:
...

Communication:
...

Strengths:
...

Areas of Improvement:
...

Keywords Interviewers Expect:
...

Ideal Answer:
...

Final Feedback:
...

The score must be between 0 and 10.
"""

    try:

        evaluation = generate_response(prompt)

        score = 0

        match = re.search(
            r"Score:\s*(\d+)",
            evaluation,
            re.IGNORECASE
        )

        if match:

            score = int(
                match.group(1)
            )

            score = max(
                0,
                min(10, score)
            )

        return {
            "score": score,
            "evaluation": evaluation
        }

    except Exception as e:

        print(
            "Answer Evaluation Error:",
            str(e)
        )

        return {
            "score": 0,
            "evaluation":
                f"Evaluation Error: {str(e)}"
        }