const CONFIG = {
    // Change this to your production API URL when deployed
    API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5001/api'
        : 'https://taskpro-prod-main-main.onrender.com/api', // Your Render URL
};

// Export for use in other scripts
window.CONFIG = CONFIG;
