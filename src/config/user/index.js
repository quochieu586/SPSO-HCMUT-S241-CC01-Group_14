import axios from "axios";

const BASE_URL = 'http://localhost:5000/api'

const userAPI = axios.create({
    baseURL: BASE_URL,
})

userAPI.interceptors.request.use((config) => {
    const studentId = localStorage.getItem('studentId')
    if (studentId) {
        config.headers['studentId'] = studentId;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
})

export default userAPI