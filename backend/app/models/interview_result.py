from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text

from app.database import Base


class InterviewResult(Base):
    __tablename__ = "interview_results"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    role = Column(String)

    question = Column(Text)

    answer = Column(Text)

    evaluation = Column(Text)

    score = Column(Integer)

    feedback = Column(Text)