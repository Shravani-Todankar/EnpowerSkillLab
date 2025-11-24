// Sidebar Component JavaScript

// Wait for DOM to be ready before initializing
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
});

function initializeSidebar() {
    // Sidebar toggle functionality for both mobile and desktop
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    // Check if elements exist before adding listeners
    if (!menuToggle || !closeSidebar || !sidebar || !sidebarOverlay) {
        // Retry after a short delay if elements aren't ready
        setTimeout(initializeSidebar, 100);
        return;
    }

    function toggleSidebar() {
        if (window.innerWidth >= 1024) {
            sidebar.classList.toggle('collapsed');
        } else {
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeSidebarFunc() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', toggleSidebar);
    closeSidebar.addEventListener('click', closeSidebarFunc);
    sidebarOverlay.addEventListener('click', closeSidebarFunc);

    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                closeSidebarFunc();
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            closeSidebarFunc();
        } else {
            sidebar.classList.remove('collapsed');
        }
    });

    // Set active link based on current page
    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = {
            'student-dashboard.html': 'nav-dashboard',
            'attendance.html': 'nav-attendance',
            'lms.html': 'nav-lms',
            'leaderboard.html': 'nav-leaderboard',
            'assessment.html': 'nav-assessment',
            'reports.html': 'nav-reports',
            'badges.html': 'nav-badges',
            'event-calendar.html': 'nav-event-calendar',
            'newsletter.html': 'nav-newsletter',
            'announcements.html': 'nav-announcements'
        };

        // Remove all active classes
        sidebarLinks.forEach(link => link.classList.remove('active'));

        // Add active class to current page link
        if (navLinks[currentPage]) {
            const activeLink = document.getElementById(navLinks[currentPage]);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    // Initialize active link
    setActiveLink();
}
