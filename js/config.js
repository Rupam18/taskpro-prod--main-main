const CONFIG = {
    // Explicitly point to the Render backend for production
    API_BASE_URL: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:5001/api'
        : 'https://taskpro-prod-main-main.onrender.com/api', 
};

// Export for use in other scripts
window.CONFIG = CONFIG;
