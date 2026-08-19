from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.user import (
    UserCreate,
    UserLogin,
    ForgotPasswordRequest,
    VerifyOTPRequest,
)

from app.services.auth_service import (
    create_user,
    authenticate_user,
)

from app.core.security import hash_password

from app.models.user import User

from app.config.email_config import send_otp_email

import random


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"],
)


# =========================================================
# REGISTER
# =========================================================

@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    return create_user(
        db,
        user.name,
        user.email,
        user.password,
    )


# =========================================================
# LOGIN
# =========================================================

@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db),
):
    db_user = authenticate_user(
        db,
        user.email,
        user.password,
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    return {
        "message": "Login Successful",
        "user_id": db_user.id,
    }


# =========================================================
# FORGOT PASSWORD
# =========================================================

@router.post("/forgot-password")
def forgot_password(
    data: ForgotPasswordRequest,
    db: Session = Depends(get_db),
):
    # -----------------------------------------------------
    # Validate email
    # -----------------------------------------------------

    email = data.email.strip().lower()

    if not email:
        raise HTTPException(
            status_code=400,
            detail="Email address is required",
        )

    # -----------------------------------------------------
    # Find user
    # -----------------------------------------------------

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Email not found",
        )

    # -----------------------------------------------------
    # Generate 6-digit OTP
    # -----------------------------------------------------

    otp = str(
        random.randint(
            100000,
            999999,
        )
    )

    # -----------------------------------------------------
    # Save OTP
    # -----------------------------------------------------

    user.otp = otp

    try:
        db.commit()

    except Exception as e:
        db.rollback()

        print(
            "DATABASE ERROR WHILE SAVING OTP:",
            repr(e),
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to generate verification code",
        )

    # -----------------------------------------------------
    # Send OTP email
    # -----------------------------------------------------

    try:
        send_otp_email(
            email,
            otp,
        )

    except Exception as e:

        print(
            "OTP EMAIL ERROR:",
            repr(e),
        )

        # Remove OTP if email couldn't be sent
        try:
            user.otp = None
            db.commit()
        except Exception:
            db.rollback()

        raise HTTPException(
            status_code=500,
            detail="Failed to send OTP email. Please try again later.",
        )

    # -----------------------------------------------------
    # Success
    # -----------------------------------------------------

    return {
        "message": "OTP sent successfully",
    }


# =========================================================
# VERIFY OTP + RESET PASSWORD
# =========================================================

@router.post("/verify-otp")
def verify_otp(
    data: VerifyOTPRequest,
    db: Session = Depends(get_db),
):
    # -----------------------------------------------------
    # Validate input
    # -----------------------------------------------------

    email = data.email.strip().lower()
    otp = str(data.otp).strip()

    if not email:
        raise HTTPException(
            status_code=400,
            detail="Email address is required",
        )

    if not otp:
        raise HTTPException(
            status_code=400,
            detail="OTP is required",
        )

    if not data.new_password:
        raise HTTPException(
            status_code=400,
            detail="New password is required",
        )

    if len(data.new_password) < 8:
        raise HTTPException(
            status_code=400,
            detail="Password must contain at least 8 characters",
        )

    # -----------------------------------------------------
    # Find user
    # -----------------------------------------------------

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    # -----------------------------------------------------
    # Verify OTP
    # -----------------------------------------------------

    if not user.otp:
        raise HTTPException(
            status_code=400,
            detail="No OTP found. Please request a new OTP.",
        )

    if str(user.otp).strip() != otp:
        raise HTTPException(
            status_code=400,
            detail="Invalid OTP",
        )

    # -----------------------------------------------------
    # Hash new password
    # -----------------------------------------------------

    try:
        user.password = hash_password(
            data.new_password
        )

        # Clear OTP after successful reset
        user.otp = None

        db.commit()

    except Exception as e:

        db.rollback()

        print(
            "PASSWORD RESET DATABASE ERROR:",
            repr(e),
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to reset password",
        )

    # -----------------------------------------------------
    # Success
    # -----------------------------------------------------

    return {
        "message": "Password reset successful",
    }