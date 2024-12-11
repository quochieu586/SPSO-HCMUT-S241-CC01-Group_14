import axios from "axios";

const BASE_URL = process.env.BASE_URL

const adminAPI = axios.create({
    baseURL: `${BASE_URL}/admin`,
})

export default adminAPI