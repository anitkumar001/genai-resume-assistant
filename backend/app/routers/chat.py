from fastapi import APIRouter
from app.schemas.chat_schema import ChatRequest, ChatResponse
from app.services.gemini_service import ask_resume_question

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    answer = ask_resume_question(
        request.resume_text,
        request.question
    )

    return ChatResponse(answer=answer)