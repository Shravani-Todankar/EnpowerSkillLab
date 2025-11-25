// Header functionality
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for header to be loaded
    setTimeout(initializeHeader, 100);
});

function initializeHeader() {
    // User dropdown toggle
    const userInfoToggle = document.getElementById('userInfoToggle');
    const userDropdownMenu = document.getElementById('userDropdownMenu');

    if (!userInfoToggle || !userDropdownMenu) {
        // Retry if elements not found yet
        setTimeout(initializeHeader, 100);
        return;
    }

    userInfoToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdownMenu.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!userDropdownMenu.contains(e.target) && !userInfoToggle.contains(e.target)) {
            userDropdownMenu.classList.remove('active');
        }
    });

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                // Add logout logic here
                // window.location.href = '/login';
            }
        });
    }
}
