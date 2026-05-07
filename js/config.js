const CONFIG = {
    // Automatically switch between local and production API
    API_BASE_URL: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:5001/api'
        : `${window.location.origin}/api`, 
};

// Export for use in other scripts
window.CONFIG = CONFIG;
