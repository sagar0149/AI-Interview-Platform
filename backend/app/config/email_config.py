
import os
import smtplib

from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()

EMAIL_ADDRESS = os.getenv(
    "EMAIL_ADDRESS"
)

EMAIL_PASSWORD = os.getenv(
    "EMAIL_PASSWORD"
)


def send_otp_email(
    recipient_email,
    otp
):

    subject = (
        "AI Interview Platform - OTP"
    )

    body = f"""
Your OTP is:

{otp}

Do not share this OTP.

AI Interview Platform
"""

    msg = MIMEText(body)

    msg["Subject"] = subject
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = recipient_email

    server = smtplib.SMTP(
        "smtp.gmail.com",
        587
    )

    server.starttls()

    server.login(
        EMAIL_ADDRESS,
        EMAIL_PASSWORD
    )

    server.sendmail(
        EMAIL_ADDRESS,
        recipient_email,
        msg.as_string()
    )

    server.quit()
