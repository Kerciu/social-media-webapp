import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

API = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

export default API;