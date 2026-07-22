from google import genai
from google.genai.errors import ServerError
from app.config import GEMINI_API_KEY
import time

client = genai.Client(api_key=GEMINI_API_KEY)

MODEL_NAME = "gemini-3-flash-preview"


def generate_response(prompt: str):
    print("=" * 50)
    print("MODEL:", MODEL_NAME)
    print("Prompt Preview:", prompt[:100])
    print("=" * 50)

    retries = 3

    for attempt in range(retries):
        try:
            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=prompt,
            )

            print("Gemini Success")
            return response.text

        except Exception as e:
            print("Gemini Error:", repr(e))
            raise
    
    


def ask_gemini(prompt: str):
    return generate_response(prompt)


def ask_resume_question(context: str, question: str):

    prompt = f"""
You are an expert AI Resume Assistant and Career Coach.

You have access to the candidate's resume.

Resume:
{context}

Question:
{question}

Instructions:

1. Answer primarily using the resume.
2. If the user asks for career advice, interview tips, resume improvements, skill improvements, or project suggestions, provide professional guidance based on the resume.
3. If specific information is missing from the resume, clearly mention that before giving general advice.
4. Do not invent facts such as experience, certifications, or projects that are not present in the resume.
5. Format the response using Markdown with headings and bullet points.
"""
    return generate_response(prompt)

