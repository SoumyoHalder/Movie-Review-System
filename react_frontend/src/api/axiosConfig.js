import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8080", // Use the local backend URL
  headers: { "ngrok-skip-browser-warning": "true" } // This header can be removed if not needed
});

export default api;
