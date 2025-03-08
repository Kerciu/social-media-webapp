import API from "../api/api"

const FollowerService = {
    toggleFollow: async (username) => {
        const response = await API.post('/toggle-follow/', {username});
        return response.data;
    }
}

export default FollowerService;