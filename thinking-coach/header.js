// Header functionality
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for header to be loaded
    setTimeout(initializeHeader, 100);
});

function initializeHeader() {
    // User dropdown toggle
    const userInfoToggle = document.getElementById('userInfoToggle');
    const userDropdownMenu = document.getElementById('userDropdownMenu');

    // Notification dropdown toggle
    const notificationToggle = document.getElementById('notificationToggle');
    const notificationDropdownMenu = document.getElementById('notificationDropdownMenu');

    if (!userInfoToggle || !userDropdownMenu || !notificationToggle || !notificationDropdownMenu) {
        // Retry if elements not found yet
        setTimeout(initializeHeader, 100);
        return;
    }

    // User dropdown toggle
    userInfoToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdownMenu.classList.toggle('active');
        // Close notification dropdown if open
        notificationDropdownMenu.classList.remove('active');
    });

    // Notification dropdown toggle
    notificationToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationDropdownMenu.classList.toggle('active');
        // Close user dropdown if open
        userDropdownMenu.classList.remove('active');
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!userDropdownMenu.contains(e.target) && !userInfoToggle.contains(e.target)) {
            userDropdownMenu.classList.remove('active');
        }
        if (!notificationDropdownMenu.contains(e.target) && !notificationToggle.contains(e.target)) {
            notificationDropdownMenu.classList.remove('active');
        }
    });

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                // Add logout logic here
                window.location.href = '../auth/sign-in.html';
            }
        });
    }

    // Fullscreen functionality
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function() {
            toggleFullscreen();
        });
    }
}

function toggleFullscreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement &&
        !document.mozFullScreenElement && !document.msFullscreenElement) {
        // Enter fullscreen
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Safari
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }

        // Change icon to exit fullscreen
        const fullscreenIcon = document.querySelector('.fullscreen-btn .material-symbols-outlined');
        if (fullscreenIcon) {
            fullscreenIcon.textContent = 'fullscreen_exit';
        }
    } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // Safari
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }

        // Change icon back to fullscreen
        const fullscreenIcon = document.querySelector('.fullscreen-btn .material-symbols-outlined');
        if (fullscreenIcon) {
            fullscreenIcon.textContent = 'fullscreen';
        }
    }
}

// Listen for fullscreen change events to update icon
document.addEventListener('fullscreenchange', updateFullscreenIcon);
document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
document.addEventListener('mozfullscreenchange', updateFullscreenIcon);
document.addEventListener('MSFullscreenChange', updateFullscreenIcon);

function updateFullscreenIcon() {
    const fullscreenIcon = document.querySelector('.fullscreen-btn .material-symbols-outlined');
    if (fullscreenIcon) {
        if (document.fullscreenElement || document.webkitFullscreenElement ||
            document.mozFullScreenElement || document.msFullscreenElement) {
            fullscreenIcon.textContent = 'fullscreen_exit';
        } else {
            fullscreenIcon.textContent = 'fullscreen';
        }
    }
}
