import axios from "axios";

// Base URL of back-end API
const API_URL = // Replace with actual back-end URL

// Axios instance for common configurations
export const API = axios.create({
    baseURL: API_URL
});