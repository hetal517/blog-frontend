import axios from "axios";

const API = axios.create({
    baseURL: "https://blog-backend-production-306e.up.railway.app/api"
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = token;
    }

    return config;
});

export default API;