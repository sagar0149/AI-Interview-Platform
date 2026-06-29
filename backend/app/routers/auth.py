
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.user import UserCreate
from app.schemas.user import UserLogin

from app.services.auth_service import (
    create_user,
    authenticate_user
)

from app.core.security import (
    hash_password
)

import random

from app.models.user import User

from app.schemas.user import (
    ForgotPasswordRequest,
    VerifyOTPRequest
)

from app.config.email_config import (
    send_otp_email
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# ==========================
# Register
# ==========================
@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    return create_user(
        db,
        user.name,
        user.email,
        user.password
    )


# ==========================
# Login
# ==========================
@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    db_user = authenticate_user(
        db,
        user.email,
        user.password
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    return {
        "message": "Login Successful",
        "user_id": db_user.id
    }


# ==========================
# Forgot Password
# ==========================
@router.post("/forgot-password")
def forgot_password(
    data: ForgotPasswordRequest,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Email not found"
        )

    otp = str(
        random.randint(
            100000,
            999999
        )
    )

    user.otp = otp

    db.commit()

    send_otp_email(
        data.email,
        otp
    )

    return {
        "message":
        "OTP sent successfully"
    }


# ==========================
# Verify OTP + Reset Password
# ==========================
@router.post("/verify-otp")
def verify_otp(
    data: VerifyOTPRequest,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if user.otp != data.otp:

        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        )

    # HASH PASSWORD BEFORE SAVING
    user.password = hash_password(
        data.new_password
    )

    user.otp = None

    db.commit()

    return {
        "message":
        "Password reset successful"
    }

