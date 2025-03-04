import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import AuthService from '../services/AuthService';

const API = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

API.interceptors.response.use(
    (response) => (response),
    async (error) => {
        const origRequest = error.config;

        if (error.response?.status === 401 && !origRequest._retry) {
            origRequest._retry = true;

            try {
                const response = await AuthService.refreshToken();
                return API(origRequest);
            } catch(refreshError) {
                window.location.replace('/login');
                return Promise.reject(refreshError);
            }
        }
    }
)

export default API;