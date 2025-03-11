import API from "../api/api";

const PostService = {
    getPosts: async (username) => {
        const response = await API.get(`/user-posts/${username}/`);
        return response.data;
    }
}

export default PostService