import os
import smtplib

from email.message import EmailMessage


# =========================================================
# EMAIL CONFIGURATION
# =========================================================

SMTP_HOST = os.getenv(
    "SMTP_HOST",
    "smtp.gmail.com",
)

SMTP_PORT = int(
    os.getenv(
        "SMTP_PORT",
        "587",
    )
)

SMTP_USERNAME = os.getenv(
    "SMTP_USERNAME",
)

SMTP_PASSWORD = os.getenv(
    "SMTP_PASSWORD",
)

EMAIL_FROM = os.getenv(
    "EMAIL_FROM",
    SMTP_USERNAME,
)

SMTP_USE_TLS = os.getenv(
    "SMTP_USE_TLS",
    "true",
).lower() == "true"


# =========================================================
# SEND OTP EMAIL
# =========================================================

def send_otp_email(
    recipient_email: str,
    otp: str,
):
    """
    Send OTP verification email.
    """

    # -----------------------------------------------------
    # Validate configuration
    # -----------------------------------------------------

    if not SMTP_USERNAME:
        raise RuntimeError(
            "SMTP_USERNAME environment variable is missing"
        )

    if not SMTP_PASSWORD:
        raise RuntimeError(
            "SMTP_PASSWORD environment variable is missing"
        )

    if not EMAIL_FROM:
        raise RuntimeError(
            "EMAIL_FROM environment variable is missing"
        )

    if not recipient_email:
        raise ValueError(
            "Recipient email is required"
        )

    if not otp:
        raise ValueError(
            "OTP is required"
        )

    # -----------------------------------------------------
    # Create email
    # -----------------------------------------------------

    message = EmailMessage()

    message["Subject"] = (
        "AI Interview - Password Reset OTP"
    )

    message["From"] = EMAIL_FROM

    message["To"] = recipient_email

    message.set_content(
        f"""
Hello,

We received a request to reset your password
for your AI Interview account.

Your verification code is:

{otp}

This code is required to create a new password.

If you did not request a password reset,
you can safely ignore this email.

Regards,
AI Interview Platform
"""
    )

    # -----------------------------------------------------
    # Connect to SMTP server
    # -----------------------------------------------------

    try:

        with smtplib.SMTP(
            SMTP_HOST,
            SMTP_PORT,
            timeout=30,
        ) as server:

            # -------------------------------------------------
            # Start TLS
            # -------------------------------------------------

            if SMTP_USE_TLS:
                server.starttls()

            # -------------------------------------------------
            # Login
            # -------------------------------------------------

            server.login(
                SMTP_USERNAME,
                SMTP_PASSWORD,
            )

            # -------------------------------------------------
            # Send email
            # -------------------------------------------------

            server.send_message(
                message
            )

    except smtplib.SMTPAuthenticationError as e:

        print(
            "SMTP AUTHENTICATION ERROR:",
            repr(e),
        )

        raise RuntimeError(
            "Email authentication failed. "
            "Check SMTP_USERNAME and SMTP_PASSWORD."
        )

    except smtplib.SMTPConnectError as e:

        print(
            "SMTP CONNECTION ERROR:",
            repr(e),
        )

        raise RuntimeError(
            "Unable to connect to email server."
        )

    except smtplib.SMTPException as e:

        print(
            "SMTP ERROR:",
            repr(e),
        )

        raise RuntimeError(
            "Unable to send OTP email."
        )

    except Exception as e:

        print(
            "EMAIL ERROR:",
            repr(e),
        )

        raise RuntimeError(
            "Unexpected error while sending OTP email."
        )