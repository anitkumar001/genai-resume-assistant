import axios from "axios";

const api = axios.create({
  baseURL: "https://genai-resume-assistant.onrender.com",
});

export default api;