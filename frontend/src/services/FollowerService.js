import API from "../api/api"

const FollowerService = {
    toggleFollow: async () => {
        const response = await API.post('/toggle-follow/');
        return response.data;
    }
}
