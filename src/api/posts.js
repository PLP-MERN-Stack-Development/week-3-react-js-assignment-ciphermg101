import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const getPosts = async ({ _page = 1, _limit = 10, q = '' } = {}) => {
  try {
    const params = { _page, _limit };
    if (q) {
      params.title_like = q;
    }

    const response = await axios.get(API_URL, { params });
    
    const totalCount = parseInt(response.headers['x-total-count'] || '0', 10);
    
    return {
      data: response.data,
      total: totalCount,
      page: _page,
      totalPages: Math.ceil(totalCount / _limit),
      limit: _limit
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw error;
  }
};

export const getPostComments = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    throw error;
  }
};
