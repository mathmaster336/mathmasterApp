// src/api/axiosConfig.js

import axios from 'axios';

const MMapi = axios.create({
    baseURL: 'https://your-api-url.com/api', // 🔁 Replace with your actual API
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Interceptors for auth token or error handling
axiosInstance.interceptors.request.use(
    async config => {
        // const token = await AsyncStorage.getItem('token'); // If you're using tokens
        const token = "your_auth_token_here"
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default MMapi;
