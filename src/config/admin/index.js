import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:8000";

const adminAPI = axios.create({
    baseURL: `${BASE_URL}/admin`,
})

export default adminAPI