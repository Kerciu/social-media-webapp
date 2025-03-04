import API from "../api/api";

const AuthService = {
    login: async (username, password) => {
        const response = await API.post('/token/', {username, password});
        return response.data;
    },

    refreshToken: async () => {
        const response = await API.post('/token/refresh/');
        return response.data;
    },
}

export default AuthService;