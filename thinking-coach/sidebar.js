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
            'teacher-dashboard.html': 'nav-dashboard',
            'student-list.html': 'nav-student-list',
            'student-profile.html': 'nav-student-profile',
            'mark-attendance.html': 'nav-mark-attendance',
            'attendance-summary.html': 'nav-attendance-summary',
            'enter-competency-ratings.html': 'nav-competency-ratings',
            'assessment-form.html': 'nav-assessment-form',
            'submit-assessment.html': 'nav-submit-assessment',
            'assign-lessons.html': 'nav-assign-lessons',
            'lesson-list.html': 'nav-lesson-list',
            'student-lesson-progress.html': 'nav-student-lesson-progress',
            'add-student-notes.html': 'nav-add-notes',
            'view-past-remarks.html': 'nav-view-remarks',
            'create-class-events.html': 'nav-create-events',
            'event-list.html': 'nav-event-list',
            'class-performance-summary.html': 'nav-class-performance',
            'student-reports.html': 'nav-student-reports',
            'my-profile.html': 'nav-my-profile',
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
