// Header functionality
let isHeaderInitialized = false;
let retryCount = 0;
const MAX_RETRIES = 20; // Max 2 seconds of retries

// Note: initializeHeader should be called explicitly from the HTML page
// after the header HTML is loaded via fetch, not via DOMContentLoaded

// Reset function to clear state (useful for reinitialization)
function resetHeaderState() {
    isHeaderInitialized = false;
    retryCount = 0;
}

function initializeHeader() {
    // Reset state first to ensure clean initialization
    if (!isHeaderInitialized) {
        resetHeaderState();
    } else {
        // Already initialized, skip
        return;
    }

    // User dropdown toggle
    const userInfoToggle = document.getElementById('userInfoToggle');
    const userDropdownMenu = document.getElementById('userDropdownMenu');

    // Notification dropdown toggle
    const notificationToggle = document.getElementById('notificationToggle');
    const notificationDropdownMenu = document.getElementById('notificationDropdownMenu');
    const notificationWrapper = document.querySelector('.notification-wrapper');
    const userInfoWrapper = document.querySelector('.user-info-wrapper');

    if (!userInfoToggle || !userDropdownMenu || !notificationToggle || !notificationDropdownMenu) {
        // Retry if elements not found yet, but limit retries
        retryCount++;
        if (retryCount < MAX_RETRIES) {
            setTimeout(initializeHeader, 100);
        } else {
            console.error('Header elements not found after maximum retries');
        }
        return;
    }

    // Mark as initialized to prevent duplicate event listeners
    isHeaderInitialized = true;

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
        if (userInfoWrapper && !userInfoWrapper.contains(e.target)) {
            userDropdownMenu.classList.remove('active');
        }
        if (notificationWrapper && !notificationWrapper.contains(e.target)) {
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
                // window.location.href = '/login';
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

    // Listen for fullscreen change events to update icon (only add once)
    document.addEventListener('fullscreenchange', updateFullscreenIcon);
    document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
    document.addEventListener('mozfullscreenchange', updateFullscreenIcon);
    document.addEventListener('MSFullscreenChange', updateFullscreenIcon);
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
