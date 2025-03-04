import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const API = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

export default API;