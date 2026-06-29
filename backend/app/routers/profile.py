
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User

router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)


@router.get("/{user_id}")
def get_profile(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email
    }
    

from pydantic import BaseModel


class UpdateProfileRequest(BaseModel):
    name: str
    email: str


@router.put("/update/{user_id}")
def update_profile(
    user_id: int,
    data: UpdateProfileRequest,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.name = data.name
    user.email = data.email

    db.commit()

    return {
        "message":
        "Profile updated successfully"
    }
    
    
class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


@router.put("/change-password/{user_id}")
def change_password(
    user_id: int,
    data: ChangePasswordRequest,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if user.password != data.current_password:

        raise HTTPException(
            status_code=400,
            detail="Current password is incorrect"
        )

    user.password = data.new_password

    db.commit()

    return {
        "message":
        "Password updated successfully"
    }





