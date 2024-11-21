import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/', 
});

export const login = async (username, password) => {
  try {
    const response = await API.post('login/', { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default API;