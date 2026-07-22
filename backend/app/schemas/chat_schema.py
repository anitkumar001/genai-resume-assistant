from pydantic import BaseModel


class ChatRequest(BaseModel):
    resume_text: str
    question: str


class ChatResponse(BaseModel):
    answer: str