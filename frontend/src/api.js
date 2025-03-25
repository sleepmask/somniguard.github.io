import axios from 'axios';

export const serverURL = 'http://54.183.21.65:8000/';

// Create an axios instance with your Django backend URL
const API = axios.create({
    baseURL: serverURL,  // Django backend base URL
});

// Login function to get the JWT token
export const login = async (username, password) => {
    try {
        // Send a POST request to the token endpoint (/api/token/)
        const response = await API.post('api/token/', { username, password });

        // Return the response data, which should include the JWT tokens (access and refresh)
        return response.data;
    } catch (error) {
        // If there's an error, throw the error message from the server's response
        if (error.response) {
            // Server responded with an error, such as invalid credentials
            throw new Error(error.response.data.detail || 'Login failed');
        } else if (error.request) {
            // No response from the server (network issues)
            throw new Error('Network error. Please try again.');
        } else {
            // Any other errors (axios issues or invalid request)
            throw new Error(error.message || 'An unexpected error occurred.');
        }
    }
};

export const signup = async (userData) => {
    try {
        const response = await API.post('register/', userData);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(JSON.stringify(error.response.data));
        } else if (error.request) {
            throw new Error('Network error. Please try again.');
        } else {
            throw new Error(error.message || 'An unexpected error occurred.');
        }
    }
};




// Function to fetch protected data using the access token
export const fetchProtectedData = async () => {
    try {
        const token = localStorage.getItem('access_token');  // Get the token from localStorage
        const response = await API.get('api/protected-endpoint/', {
            headers: {
                Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
            },
        });
        return response.data;  // Return the protected data
    } catch (error) {
        throw new Error('Error fetching protected data');
    }
};


export default API;
