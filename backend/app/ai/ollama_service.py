
import re
import json
from ollama import chat


# ==========================
# Resume Analysis
# ==========================
def analyze_resume(resume_text):

    prompt = f"""
You are an expert ATS Resume Analyzer.

Analyze the resume and return ONLY valid JSON.

Format:

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
- Extract actual experience from the resume.
- Extract actual skills from the resume.
- Identify strengths.
- Identify weaknesses.
- Suggest suitable job roles.
- Suggest missing keywords.
- Suggest resume improvements.
- Return ONLY JSON.
- No markdown.
- No explanation.
- No code block.

Resume:

{resume_text}
"""

    try:

        response = chat(
            model="llama3.1:8b",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        content = response[
            "message"
        ]["content"].strip()

        content = content.replace(
            "```json",
            ""
        )

        content = content.replace(
            "```",
            ""
        )

        result = json.loads(
            content
        )

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


# ==========================
# Interview Questions
# ==========================
def generate_interview_questions(
    resume_text
):

    prompt = f"""
Generate 10 interview questions based on this resume.

Mix:
- Technical Questions
- HR Questions
- Project Questions

Resume:

{resume_text}

Return only questions.
"""

    try:

        response = chat(
            model="llama3.1:8b",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        content = response[
            "message"
        ]["content"]

        questions = []

        for line in content.split(
            "\n"
        ):

            line = line.strip()

            if (
                len(line) > 5
                and "?" in line
            ):
                questions.append(
                    line
                )

        if len(questions) > 0:
            return questions

        return [
            "Tell me about yourself",
            "What is Python?",
            "What is FastAPI?",
            "Explain REST API",
            "Describe one project from your resume"
        ]

    except Exception:

        return [
            "Tell me about yourself",
            "What is Python?",
            "What is FastAPI?",
            "Explain REST API",
            "Describe one project from your resume"
        ]


# ==========================
# Evaluate Answer
# ==========================
def evaluate_answer(
    question,
    answer
):

    prompt = f"""
You are a Senior Technical Interviewer.

Question:
{question}

Candidate Answer:
{answer}

Evaluate the answer.

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
Provide a professional answer that would score 10/10.

Final Feedback:
...
"""

    try:

        response = chat(
            model="llama3.1:8b",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        evaluation = response[
            "message"
        ]["content"]

        score = 0

        match = re.search(
            r"Score:\s*(\d+)",
            evaluation
        )

        if match:

            score = int(
                match.group(1)
            )

        return {
            "score": score,
            "evaluation": evaluation
        }

    except Exception as e:

        return {
            "score": 0,
            "evaluation":
            f"Evaluation Error: {str(e)}"
        }

