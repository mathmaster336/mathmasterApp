// src/utils/axiosInstance.js
import axios from "axios";
// import { getLocalStorage } from "../Utils/HelperMethods/Localstorage";

// ✅ Axios for addmessage (auth, courses)
export const MMapi = axios.create({
    baseURL: "https://authapi-t6kumycyca-em.a.run.app",
    // baseURL: "http://192.168.1.7:5001/mathmaster-cbffc/asia-south2/authApi"
    // or Firebase URL: "https://asia-south2-<project-id>.cloudfunctions.net/addmessage"
});

// ✅ Axios for contentapi (content-related data)
export const ContentApi = axios.create({
    // baseURL: "https://contentapi-t6kumycyca-em.a.run.app",
    baseURL:"http://192.168.1.4:5001/mathmaster-cbffc/asia-south2/contentApi"
    // or Firebase URL: "https://asia-south2-<project-id>.cloudfunctions.net/contentapi"
});

// Common request interceptor for both
const attachToken = (config) => {
    //   const token = getLocalStorage("token");
    const token = "mmauth"
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    config.headers.userType = "admin";
    return config;
};

// Attach interceptors
[MMapi, ContentApi].forEach((instance) => {
    instance.interceptors.request.use(attachToken, (error) => Promise.reject(error));

    instance.interceptors.response.use(
        (response) => response.data,
        (error) => {
            if (error.response?.status === 401) {
                console.warn("Unauthorized - redirect or logout user");
            }
            return Promise.reject(error);
        }
    );
});


