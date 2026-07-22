import json
import re

from app.services.gemini_service import ask_gemini


def analyze_resume(resume_text: str):
    prompt = f"""
You are an expert ATS (Applicant Tracking System) Resume Reviewer.

Analyze the following resume carefully.

Return ONLY valid JSON.

DO NOT:
- Write markdown
- Write ```json
- Write explanations
- Write notes before or after JSON

Return EXACTLY this JSON format:

{{
    "score": 0,
    "strengths": [],
    "weaknesses": [],
    "missing_sections": [],
    "technical_skills": [],
    "projects_summary": "",
    "suggestions": [],
    "summary": ""
}}

Scoring Rules:
- Score must be between 0 and 100.
- strengths must be an array of strings.
- weaknesses must be an array of strings.
- missing_sections must be an array of strings.
- technical_skills must contain only technical skills.
- projects_summary should be 2-4 sentences.
- suggestions should contain actionable improvements.
- summary should be a concise overall evaluation.

Resume:

{resume_text}
"""

    response = ask_gemini(prompt)
    

    # Remove Markdown code fences if Gemini adds them
    cleaned = re.sub(r"```json|```", "", response).strip()

    try:
        data = json.loads(cleaned)

        return {
            "score": data.get("score", 0),
            "strengths": data.get("strengths", []),
            "weaknesses": data.get("weaknesses", []),
            "missing_sections": data.get("missing_sections", []),
            "technical_skills": data.get("technical_skills", []),
            "projects_summary": data.get("projects_summary", ""),
            "suggestions": data.get("suggestions", []),
            "summary": data.get("summary", "")
        }

    except Exception as e:
        print("JSON Parsing Error:", e)
        print("Gemini Response:", response)

        return {
            "score": 0,
            "strengths": [],
            "weaknesses": [],
            "missing_sections": [],
            "technical_skills": [],
            "projects_summary": "",
            "suggestions": [],
            "summary": "",
            "raw_response": response
        }