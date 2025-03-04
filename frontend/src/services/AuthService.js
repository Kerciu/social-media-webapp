import API from "../api/api";

const AuthService = {
    login: async (username, password) => {
        const response = await API.post('/token/', {username, password});
        return response.data;
    },
}

export default AuthService;