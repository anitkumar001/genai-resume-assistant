# GenAI Resume Assistant

An AI-powered resume analysis and career guidance web application built with **React, Vite, FastAPI, and Google's Gemini API**. It helps users review a resume, compare it with a job description, and ask questions about their resume through a conversational assistant.

## Live Demo

Try the deployed application here:

**[GenAI Resume Assistant — Live Demo](https://genai-resume-assistant-bouw-mauve.vercel.app/)**

## Features

- **Resume upload:** Upload a PDF resume and extract its text.
- **AI resume review:** Generate an ATS-style review with a score, strengths, weaknesses, missing sections, technical skills, project summary, and improvement suggestions.
- **Job-description matching:** Compare a resume against a job description to identify matching skills, missing skills, keywords, and suggested improvements.
- **Resume Q&A chatbot:** Ask questions about the uploaded resume and receive career-oriented guidance grounded in the supplied resume text.
- **Dashboard and web interface:** React-based pages for the home screen, dashboard, upload, ATS analysis, chat, and job matching.
- **API documentation:** FastAPI provides interactive API documentation through Swagger UI.

> **Note:** AI-generated scores and recommendations are estimates, not guarantees of ATS performance or employment outcomes. Review outputs before using them in job applications.

## Technology Stack

### Frontend
- React
- Vite
- React Router
- Axios
- Framer Motion
- React Markdown
- React Hot Toast

### Backend
- Python
- FastAPI
- Pydantic
- PyMuPDF for PDF text extraction
- Google Gen AI SDK for Gemini API access
- python-multipart for file uploads

## Project Structure

```text
genai-resume-assistant/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── routers/
│   │   │   └── chat.py
│   │   ├── schemas/
│   │   └── services/
│   │       ├── ats_service.py
│   │       ├── gemini_service.py
│   │       ├── jd_service.py
│   │       └── pdf_service.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── Context/
│   │   └── App.jsx
│   ├── package.json
│   └── index.html
├── .gitignore
└── README.md
```

## Prerequisites

Install the following before running the project:

- Python 3.11+ recommended
- Node.js and npm (use a version compatible with the Vite version in `frontend/package.json`)
- A Gemini API key from Google AI Studio

## Setup and Run

Run the backend and frontend in separate terminals.

### 1. Clone the repository

```bash
git clone https://github.com/anitkumar001/genai-resume-assistant.git
cd genai-resume-assistant
```

### 2. Configure the backend

Open a terminal in the repository root:

```bash
cd backend
python -m venv venv
```

Activate the environment.

**Windows PowerShell:**
```powershell
.\venv\Scripts\Activate.ps1
```

**Windows Command Prompt:**
```bat
venv\Scripts\activate.bat
```

**macOS / Linux:**
```bash
source venv/bin/activate
```

Install dependencies:

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

Create a file named `backend/.env` and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Do not commit `.env` or publish your API key.

Start the API server from the `backend` directory:

```bash
uvicorn app.main:app --reload
```

Backend URLs:
- API root: http://127.0.0.1:8000/
- Health check: http://127.0.0.1:8000/health
- Swagger API docs: http://127.0.0.1:8000/docs
- OpenAPI schema: http://127.0.0.1:8000/openapi.json

### 3. Configure the frontend

Open a second terminal from the repository root:

```bash
cd frontend
npm install
npm run dev
```

Vite normally serves the app at http://localhost:5173. Open the URL printed in your terminal.

If the frontend uses a hard-coded backend URL, make sure it points to `http://127.0.0.1:8000` for local development. The current backend CORS configuration permits `http://localhost:5173` and two configured deployment origins.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/` | API welcome message |
| `GET` | `/health` | Basic backend health status |
| `POST` | `/upload-resume` | Upload a PDF and return extracted text |
| `POST` | `/analyze-resume` | Run ATS-style resume analysis |
| `POST` | `/job-match` | Compare a PDF resume with a submitted job description |
| `POST` | `/chat` | Ask a question using supplied resume text |

For `/upload-resume` and `/analyze-resume`, send a multipart form with a `file` field. For `/job-match`, send multipart form fields `file` and `job_description`. The `/chat` endpoint expects JSON with `resume_text` and `question`.

You can explore request schemas and try endpoints using `/docs`.

## Configuration and Security Notes

- Keep API keys in environment variables; never hard-code or commit credentials.
- Treat resumes as sensitive personal data. Only upload documents you are authorized to process.
- Before public deployment, add file-size limits, file-type/content validation, safer temporary-file handling, rate limiting, authentication if needed, and a clear data-retention policy.
- The current upload handlers save files in a local `uploads/` directory. Review retention and cleanup behavior before deploying with real user data.
- LLM outputs may be inaccurate or malformed. Validate model output and handle API errors and quota limits.
- Do not use AI-generated scores as the sole basis for hiring or career decisions.

## Current Scope and Future Improvements

Potential next steps include:
- Stronger request validation and centralized error handling
- Automated backend and frontend tests
- Secure temporary uploads and automatic cleanup
- Evidence-based skill matching and explainable scoring
- Personalized learning roadmaps and interview practice
- User accounts and persistent progress tracking
- Docker-based deployment and CI checks

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make and test your changes.
4. Open a pull request with a clear description.

## Author

**Anit Kumar Nag**

GitHub: [@anitkumar001](https://github.com/anitkumar001)

---

Built as a learning project to explore generative AI, resume analysis, and full-stack application development.
