import API from "../api/api";

const AuthService = {
    login: async (username, password) => {
        const response = await API.post('/token/', {username, password});
        return response.data;
    },

    register: async ({ username, email, firstName, lastName, password }) => {
        const response = await API.post('/register/', {
          username,
          email,
          first_name: firstName,
          last_name: lastName,
          password,
        });
        return response.data;
    },

    refreshToken: async () => {
        const response = await API.post('/token/refresh/');
        return response.data;
    },
}

export default AuthService;