import axios from "axios";

const ADMIN_BASE_URL = 'http://localhost:5000/api/admin'

const adminAPI = axios.create({
    baseURL: ADMIN_BASE_URL,
})

export default adminAPI