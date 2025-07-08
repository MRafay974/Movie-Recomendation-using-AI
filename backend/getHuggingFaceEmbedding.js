const axios = require('axios');

async function getEmbeddings(data) {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.url, // ✅ set your HuggingFace API URL in .env file
        headers: {
            'Authorization': `Bearer ${process.env.apiKey}`, // ✅ set your HuggingFace API key in .env file
            'Content-Type': 'application/json'
        },
        data: {
            inputs: data  // ✅ pass raw string or array of strings here
        }
    };
    // 
    try {
        const response = await axios.request(config);
        console.log('response->', response.data);
        return response.data;
    } catch (err) {
        console.error('HuggingFace API error:', err.response?.data || err.message);
    }
}

module.exports = {
    getEmbeddings
};

 getEmbeddings("I love sci fi movies.")