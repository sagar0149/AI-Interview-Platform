from reportlab.lib.pagesizes import letter
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)
from reportlab.lib.styles import getSampleStyleSheet


def generate_report(
    filename,
    question,
    answer,
    evaluation
):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter
    )

    styles = getSampleStyleSheet()

    content = []

    content.append(
        Paragraph(
            "AI Interview Report",
            styles["Title"]
        )
    )

    content.append(
        Spacer(1, 20)
    )

    content.append(
        Paragraph(
            f"<b>Question:</b><br/>{question}",
            styles["BodyText"]
        )
    )

    content.append(
        Spacer(1, 10)
    )

    content.append(
        Paragraph(
            f"<b>Your Answer:</b><br/>{answer}",
            styles["BodyText"]
        )
    )

    content.append(
        Spacer(1, 10)
    )

    content.append(
        Paragraph(
            f"<b>AI Evaluation:</b><br/>{evaluation}",
            styles["BodyText"]
        )
    )

    doc.build(content)