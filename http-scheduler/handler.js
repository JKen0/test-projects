// handler.js
const axios = require('axios');

module.exports = async (req, res) => {
    try {
        // Make HTTP request to desired endpoint
        const response = await axios.get('https://v1-api-je3y.onrender.com/test');

        // Respond with success message
        res.status(200).json({ message: 'HTTP request successful' });
    } catch (error) {
        console.error('Error making HTTP request:', error);
        // Respond with error message
        res.status(500).json({ error: 'Internal server error' });
    }
};