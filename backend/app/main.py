from app.schemas.response_models import APIResponse
from app.services.jd_service import compare_resume_with_jd
from fastapi import Form
from app.services.ats_service import analyze_resume
#from app.services.vector_service import search_resume
from app.services.gemini_service import ask_resume_question
from fastapi.middleware.cors import CORSMiddleware
#from app.services.vector_service import store_resume
from fastapi import FastAPI, UploadFile, File
import os
from app.routers.chat import router as chat_router

from app.services.pdf_service import extract_text_from_pdf
from pydantic import BaseModel

from app.services.gemini_service import ask_gemini

app = FastAPI(
    title="GenAI Resume Assistant",
    version="1.0.0",
    description="End-to-End GenAI Project using FastAPI and Gemini"
)
app.include_router(chat_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://genai-resume-assistant-bouw-mauve.vercel.app",
        "https://genai-resume-assistant-two.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str



@app.get("/")
def home():
    return {
        "message": "Welcome to GenAI Resume Assistant"
    }




@app.get("/health")
def health():
    return {
        "status": "Running",
        "server": "FastAPI"
    }




#@app.post("/chat")
#def chat(request: ChatRequest):
 #   answer = ask_gemini(request.message)

  #  return {
   #     "question": request.message,
    #    "answer": answer
    #}



#@app.post("/ask-resume")
#def ask_resume(request: ChatRequest):
#
 #   chunks = search_resume(request.message)
#
 #   context = "\n\n".join(chunks)
#
 #   answer = ask_resume_question(context, request.message)
#
 #   return APIResponse(
  #  success=True,
   # message="Answer generated successfully.",
    #data={
     #   "question": request.message,
      #  "answer": answer,
       # "context_used": chunks
    #}
#)



@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as f:
        f.write(await file.read())

    resume_text = extract_text_from_pdf(file_path)

    return APIResponse(
        success=True,
        message="Resume uploaded successfully.",
        data={
            "filename": file.filename,
            "resume_text": resume_text
        }
    )



@app.post("/analyze-resume")
async def analyze_uploaded_resume(file: UploadFile = File(...)):
    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as f:
        f.write(await file.read())

    resume_text = extract_text_from_pdf(file_path)

    analysis = analyze_resume(resume_text)

    return APIResponse(
    success=True,
    message="Resume analyzed successfully.",
    data={
    "filename": file.filename,
    "analysis": analysis,
    "resume_text": resume_text
}
)

@app.post("/job-match")
async def job_match(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as f:
        f.write(await file.read())

    resume_text = extract_text_from_pdf(file_path)

    result = compare_resume_with_jd(
        resume_text,
        job_description
    )

    return APIResponse(
    success=True,
    message="Job matching completed successfully.",
    data={
        "filename": file.filename,
        "analysis": result
    }
)
