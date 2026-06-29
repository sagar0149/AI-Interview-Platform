from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text

from app.database import Base


class Resume(Base):

    __tablename__ = "resumes"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    filename = Column(
        String,
        nullable=False
    )

    extracted_text = Column(
        Text,
        nullable=True
    )

    skills = Column(
        Text,
        nullable=True
    )
    
    