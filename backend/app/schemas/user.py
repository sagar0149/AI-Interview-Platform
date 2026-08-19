from pydantic import BaseModel


# =========================================================
# REGISTER
# =========================================================

class UserCreate(BaseModel):
    name: str
    email: str
    password: str


# =========================================================
# LOGIN
# =========================================================

class UserLogin(BaseModel):
    email: str
    password: str


# =========================================================
# FORGOT PASSWORD
# =========================================================

class ForgotPasswordRequest(BaseModel):
    email: str


# =========================================================
# VERIFY OTP / RESET PASSWORD
# =========================================================

class VerifyOTPRequest(BaseModel):
    email: str
    otp: str
    new_password: str | None = None