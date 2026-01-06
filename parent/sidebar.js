// Sidebar Component JavaScript

// Track if sidebar has been initialized to prevent duplicate event listeners
let isSidebarInitialized = false;
let sidebarRetryCount = 0;
const MAX_SIDEBAR_RETRIES = 20; // Max 2 seconds of retries

// Note: initializeSidebar should be called explicitly from the HTML page
// after the sidebar HTML is loaded via fetch, not via DOMContentLoaded

function initializeSidebar() {
    // Prevent multiple initializations
    if (isSidebarInitialized) {
        return;
    }

    // Sidebar toggle functionality for both mobile and desktop
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    // Check if elements exist before adding listeners
    if (!menuToggle || !closeSidebar || !sidebar || !sidebarOverlay) {
        // Retry after a short delay if elements aren't ready
        sidebarRetryCount++;
        if (sidebarRetryCount < MAX_SIDEBAR_RETRIES) {
            setTimeout(initializeSidebar, 100);
        } else {
            console.error('Sidebar elements not found after maximum retries');
        }
        return;
    }

    // Mark as initialized to prevent duplicate event listeners
    isSidebarInitialized = true;

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

    // Only close sidebar when clicking on actual navigation links (not dropdown toggles)
    const sidebarLinks = sidebar.querySelectorAll('.sidebar-dropdown-menu a, .sidebar-nav > a:not(.sidebar-dropdown-toggle)');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only close sidebar on mobile when clicking actual page links
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
            'dashboard.html': 'nav-dashboard',
            'switch-child.html': 'nav-switch-child',
            'child-performance-summary.html': 'nav-child-performance',
            'daily-monthly-attendance.html': 'nav-attendance',
            'skill-passport.html': 'nav-skill-passport',
            'assessment-summary.html': 'nav-assessment-summary',
            'lesson-progress.html': 'nav-lesson-progress',
            'suggested-lessons.html': 'nav-suggested-lessons',
            'download-report.html': 'nav-download-report',
            'notices.html': 'nav-notices',
            'events.html': 'nav-events',
            'announcements.html': 'nav-announcements',
            'profile.html': 'nav-profile',
            'change-password.html': 'nav-change-password'
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

    // Initialize dropdown functionality
    initializeDropdowns();
}

function initializeDropdowns() {
    const dropdownToggles = document.querySelectorAll('.sidebar-dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();

            const dropdown = this.closest('.sidebar-dropdown');
            const isActive = dropdown.classList.contains('active');

            // Close all other dropdowns
            document.querySelectorAll('.sidebar-dropdown').forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('active');
                }
            });

            // Toggle current dropdown
            if (isActive) {
                dropdown.classList.remove('active');
            } else {
                dropdown.classList.add('active');
            }
        });
    });

    // Keep dropdown open if a child link is active
    const activeDropdownLinks = document.querySelectorAll('.sidebar-dropdown-menu a');
    activeDropdownLinks.forEach(link => {
        if (link.classList.contains('active')) {
            const dropdown = link.closest('.sidebar-dropdown');
            if (dropdown) {
                dropdown.classList.add('active');
            }
        }
    });
}
