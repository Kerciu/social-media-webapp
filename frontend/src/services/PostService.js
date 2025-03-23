import API from "../api/api";

const PostService = {
    getPosts: async (username) => {
        const response = await API.get(`/user-posts/${username}/`);
        return response.data;
    },

    likePost: async (id) => {
        const response = await API.post(`/like-post/`, { id });
        return response.data;
    },

    createPost: async (description) => {
        const response = await API.post(`/create-post/`, { description });
        return response.data;
    },

    getHomepagePosts: async (pageNum) => {
        const response = await API.get(`/posts/?page=${pageNum}`);
        return response.data;
    }
}

export default PostService