from pydantic import BaseModel


class UserCreate(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str
    
from pydantic import BaseModel


class ForgotPasswordRequest(BaseModel):
    email: str


class VerifyOTPRequest(BaseModel):
    email: str
    otp: str
    new_password: str
    
    
class ForgotPasswordRequest(BaseModel):
    email: str


class VerifyOTPRequest(BaseModel):
    email: str
    otp: str
    new_password: str


