const axios = require('axios');

// Function to handle Axios errors
function handleAxiosError(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Request failed with status code:', error.response.status);
        console.error('Response data:', error.response.data);
    } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from server');
        console.error('Request config:', error.request);
    } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error setting up request:', error.message);
    }
    throw error;
}

// Function to handle GET requests
async function get(url, config) {
    try {
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

// Function to handle POST requests
async function post(url, data, config) {
    try {
        const response = await axios.post(url, data, config);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

module.exports = { get, post }