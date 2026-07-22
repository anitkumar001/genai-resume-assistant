import json
import re
from urllib import response

from app.services.gemini_service import ask_gemini


def clean_json(response: str):
    response = response.strip()

    response = re.sub(r"^```json", "", response)
    response = re.sub(r"^```", "", response)
    response = re.sub(r"```$", "", response)

    return response.strip()


def compare_resume_with_jd(resume_text: str, job_description: str):

    prompt = f"""
You are an ATS recruiter.

Compare the resume with the Job Description.

Return ONLY valid JSON.
IMPORTANT:

A skill CANNOT appear in both matching_skills and missing_skills.

matching_skills = skills found in BOTH resume and job description.

missing_skills = skills present in the job description but NOT present in the resume.

Schema:

{{
    "match_score": 0,
    "matching_skills": [],
    "missing_skills": [],
    "missing_keywords": [],
    "suggestions": []
}}

Resume:
{resume_text}

Job Description:
{job_description}
"""

    response = ask_gemini(prompt)
    print("=" * 80)
    print("RAW GEMINI RESPONSE:")
    print(response)
    print("=" * 80)

    cleaned = clean_json(response)

    try:
        data = json.loads(cleaned)
        print("PARSED JSON:")
        print(data)
        matching = data.get("matching_skills", [])
        missing = data.get("missing_skills", [])

        # Convert matching skills to lowercase for comparison
        matching_lower = {skill.lower().strip() for skill in matching}
        filtered_missing = [
             skill
            for skill in missing
            if skill.lower().strip() not in matching_lower
        ]

        data["missing_skills"] = filtered_missing
        return data




    except Exception:

        return {
            "error": "Invalid JSON",
            "raw_response": response
        }