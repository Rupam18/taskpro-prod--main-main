/* ===================================
   TaskPro — Settings JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ========== AUTH CHECK ==========
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (!token || !user) {
      window.location.href = 'login.html';
      return;
    }
  
    // Update UI with user info
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userAvatar').textContent = user.name.charAt(0).toUpperCase();
    
    // Fill Form
    document.getElementById('settingName').value = user.name;
    document.getElementById('settingEmail').value = user.email;

    // ========== API UTILS ==========
    const API_BASE = CONFIG.API_BASE_URL;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // ========== UI HANDLERS ==========
    
    // Color Swatches
    const swatches = document.querySelectorAll('.color-swatch');
    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            swatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            const color = swatch.dataset.color;
            showToast(`Accent color updated to ${color}`);
            // In a real app, we'd update a CSS variable or save to DB
        });
    });

    // Profile Form
    const profileForm = document.getElementById('profileForm');
    profileForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = document.getElementById('settingName').value;
        
        // Update local storage
        user.name = newName;
        localStorage.setItem('user', JSON.stringify(user));
        
        // Update sidebar
        document.getElementById('userName').textContent = newName;
        
        showToast('Profile updated successfully!');
    });

    // Toast Helper
    function showToast(message) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }

    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = 'login.html';
    });
});
