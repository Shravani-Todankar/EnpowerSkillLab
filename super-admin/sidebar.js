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
            // Dashboard
            'dashboard.html': 'nav-dashboard',

            // Schools
            'school-list.html': 'nav-school-list',
            'onboard-school.html': 'nav-add-school',
            'school-details.html': 'nav-school-details',

            // Users - School Admins
            'schooladmin-list.html': 'nav-school-admins',
            'onboard-school-admin.html': 'nav-add-school-admins',

            // Users - Program Coordinators
            'program-coordinator-list.html': 'nav-program-coordinators',
            'onboard-pc.html': 'nav-add-program-coordinators',

            // Users - Thinking Coaches
            'teacher-list.html': 'nav-thinking-coaches',
            'add-teacher.html': 'nav-add-thinking-coaches',

            // Users - Students
            'student-list.html': 'nav-students-list',
            'add-student.html': 'nav-add-student',

            // Users - Parents
            'parent-list.html': 'nav-parent-list',
            'onboard-parent.html': 'nav-add-parent',

            // Users - Bulk Upload
            'bulk-upload.html': 'nav-bulk-upload',

            // Academics
            'learning-pillars.html': 'nav-learning-pillars',
            'competencies.html': 'nav-competencies',
            'profiles.html': 'nav-profiles',
            'weightage-mapping.html': 'nav-weightage-mapping',
            'academic-year-locking.html': 'nav-academic-year-locking',

            // LMS Management
            'lessons-library.html': 'nav-lessons-library',
            'add-lesson.html': 'nav-add-lesson',
            'categories-modules.html': 'nav-categories-modules',

            // Monitoring
            'assessment-monitoring.html': 'nav-assessment-monitoring',
            'attendance-monitoring.html': 'nav-attendance-monitoring',
            'lms-monitoring.html': 'nav-lms-monitoring',
            'multi-school-comparison.html': 'nav-multi-school-comparison',

            // Reports & Analytics
            'platform-analytics.html': 'nav-platform-analytics',
            'download-reports.html': 'nav-download-reports',

            // Settings
            'system-settings.html': 'nav-system-settings',
            'terms-privacy.html': 'nav-terms-privacy',
            'billing.html': 'nav-billing',

            // My Account
            'profile.html': 'nav-profile',
            'change-password.html': 'nav-change-password'
        };

        // Remove all active classes from links
        sidebarLinks.forEach(link => link.classList.remove('active'));

        // Remove all active classes from dropdown toggles
        document.querySelectorAll('.sidebar-dropdown-toggle').forEach(toggle => {
            toggle.classList.remove('active');
        });

        // Add active class to current page link
        if (navLinks[currentPage]) {
            const activeLink = document.getElementById(navLinks[currentPage]);
            if (activeLink) {
                activeLink.classList.add('active');

                // Also add active class to parent dropdown toggle if link is inside a dropdown
                const parentDropdown = activeLink.closest('.sidebar-dropdown');
                if (parentDropdown) {
                    const dropdownToggle = parentDropdown.querySelector('.sidebar-dropdown-toggle');
                    if (dropdownToggle) {
                        dropdownToggle.classList.add('active');
                    }
                }
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
