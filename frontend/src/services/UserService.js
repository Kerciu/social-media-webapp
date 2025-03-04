import API from "../api/api"

const UserService = {
    getUserProfileData: async (username) => {
        const response = await API.get(`/user-data/${username}/`)
        return response.data
    }
}

export default UserService