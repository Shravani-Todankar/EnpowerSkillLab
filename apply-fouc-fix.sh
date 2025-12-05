#!/bin/bash

# Script to apply FOUC fix to HTML files
# This adds CSS to hide containers and JavaScript to show them after loading

# List of files to update (excluding already fixed ones)
FILES=(
    "student/profile.html"
    "student/account-settings.html"
    "student/attendance copy.html"
    "student/attendance.html"
    "student/leaderboard.html"
    "student/reports.html"
    "student/badges.html"
    "student/event-calendar.html"
    "student/newsletter.html"
    "school-admin/student-list.html"
    "school-admin/teacher-list.html"
    "school-admin/dashboard.html"
    "school-admin/add-student.html"
    "school-admin/add-teacher.html"
    "thinking-coach/student-list.html"
    "thinking-coach/mark-attendance.html"
    "thinking-coach/dashboard.html"
    "super-admin/dashboard.html"
    "program-coordinator/dashboard.html"
    "parent/dashboard.html"
)

CSS_BLOCK='
    <style>
        /* Prevent FOUC - hide containers until loaded */
        #sidebar-container:empty,
        #header-container:empty {
            opacity: 0;
            visibility: hidden;
        }

        #sidebar-container.loaded,
        #header-container.loaded {
            opacity: 1;
            visibility: visible;
            transition: opacity 0.2s ease-in;
        }
    </style>'

JS_BLOCK='
                // Mark containers as loaded to make them visible with smooth transition
                document.getElementById('\''sidebar-container'\'').classList.add('\''loaded'\'');
                document.getElementById('\''header-container'\'').classList.add('\''loaded'\'');'

for file in "${FILES[@]}"; do
    filepath="/Users/apple/Desktop/EnpowerSkillLab/$file"

    if [ -f "$filepath" ]; then
        echo "Processing: $file"

        # Check if CSS block already exists
        if grep -q "Prevent FOUC" "$filepath"; then
            echo "  - CSS already exists, skipping CSS insertion"
        else
            # Add CSS block before </head>
            sed -i '' "s|</head>|${CSS_BLOCK}\n</head>|" "$filepath"
            echo "  - Added CSS block"
        fi

        # Check if JS block already exists
        if grep -q "Mark containers as loaded" "$filepath"; then
            echo "  - JS already exists, skipping JS insertion"
        else
            # Find and add JS block after initializeHeader call
            # This will add it before the closing of setTimeout
            sed -i '' "/if (typeof initializeHeader === 'function') {/,/}/ {
                /}/a\\
${JS_BLOCK}
            }" "$filepath"
            echo "  - Added JS block"
        fi

        echo "  ✓ Completed"
    else
        echo "File not found: $filepath"
    fi
done

echo ""
echo "All files processed!"
