/* 
🚀 Simple JavaScript for Beginners
This file makes your profile interactive and saves your changes!
*/

// Welcome message when page loads
console.log("🎉 Welcome to your personal profile!");
console.log("✏️ Click on any text to edit it directly!");
console.log("💾 Your changes are saved automatically!");

// Wait for page to load, then start our script
document.addEventListener('DOMContentLoaded', function () {
    loadSavedData();
    setupAutoSave();
    console.log("✅ Profile loaded and ready to edit!");
});

// Load any saved data from browser storage
function loadSavedData() {
    // Get all editable elements
    const editableElements = document.querySelectorAll('[data-save]');

    editableElements.forEach(function (element) {
        const saveKey = element.getAttribute('data-save');
        const savedText = localStorage.getItem(saveKey);

        if (savedText) {
            element.textContent = savedText;
            console.log("📖 Loaded saved text for: " + saveKey);
        }
    });
}

// Save data automatically when user edits text
function setupAutoSave() {
    const editableElements = document.querySelectorAll('[data-save]');

    editableElements.forEach(function (element) {
        // Save when user finishes editing (loses focus)
        element.addEventListener('blur', function () {
            const saveKey = element.getAttribute('data-save');
            const newText = element.textContent.trim();

            localStorage.setItem(saveKey, newText);
            console.log("💾 Saved: " + saveKey + " = " + newText);

            // Show a quick save notification
            showSaveMessage();
        });

        // Also save when user presses Enter
        element.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Don't add new line
                element.blur(); // This triggers the save
            }
        });
    });
}

// Show a quick "saved" message
function showSaveMessage() {
    // Create a small notification
    const message = document.createElement('div');
    message.textContent = '💾 Saved!';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #00BB77;
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: bold;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    document.body.appendChild(message);

    // Show the message
    setTimeout(() => message.style.opacity = '1', 100);

    // Hide and remove the message after 2 seconds
    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => document.body.removeChild(message), 300);
    }, 2000);
}

// Fun button function - shows random messages
function showMessage() {
    const messages = [
        "🎉 Welcome to my profile!",
        "🚀 I love coding!",
        "💚 Thanks for visiting!",
        "🌟 Let's build something awesome!",
        "💻 Happy coding!",
        "🤝 Let's connect!"
    ];

    // Pick a random message
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    // Show it in a popup
    alert(randomMessage);

    console.log("🎯 Button clicked! Message: " + randomMessage);
}

// Simple function to clear all saved data (for testing)
function clearAllData() {
    localStorage.clear();
    location.reload(); // Refresh the page
    console.log("🗑️ All saved data cleared!");
}

// Make clearAllData available in console for developers
window.clearAllData = clearAllData;

console.log("💡 Tip: Type 'clearAllData()' in console to reset everything!");
console.log("🔧 Edit the social links in the HTML file to add your real URLs!");

/*
🎯 BEGINNER LEARNING NOTES:

1. localStorage - Saves data in your browser
2. addEventListener - Listens for user actions like clicks
3. document.querySelector - Finds HTML elements
4. console.log - Shows messages in browser developer tools
5. Math.random() - Generates random numbers

Try opening developer tools (F12) to see console messages!
*/

// Initialize Feather Icons
document.addEventListener('DOMContentLoaded', function () {
    feather.replace();
    initializeProfile();
});

// Profile data structure
let profileData = {
    name: 'Your Name Here',
    title: 'Full Stack Developer & Open Source Enthusiast',
    description: 'Passionate developer with a love for creating beautiful, functional web applications. I enjoy contributing to open source projects and helping others learn to code. Always exploring new technologies and building amazing things! 🚀',
    image: null,
    social: {
        github: { username: 'yourusername', url: '' },
        linkedin: { username: 'yourusername', url: '' },
        twitter: { username: 'yourusername', url: '' },
        email: { username: 'your.email@example.com', url: '' }
    },
    stats: {
        projects: '15+',
        contributions: '120+',
        followers: '500+'
    },
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'CSS', 'HTML', 'Git']
};

// Edit mode state
let editMode = false;

// Initialize the profile
function initializeProfile() {
    console.log('🎉 Welcome to your Interactive Personal Profile!');
    console.log('✨ Features: Click-to-edit, Auto-save, Image upload');
    console.log('🎯 Toggle edit mode to customize your profile!');

    loadProfileData();
    setupEventListeners();
    renderProfile();

    // Show welcome message
    setTimeout(() => {
        showNotification('👋 Welcome! Toggle edit mode to customize your profile', 'info');
    }, 1000);
}

// Load profile data from localStorage
function loadProfileData() {
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
        try {
            profileData = { ...profileData, ...JSON.parse(savedData) };
            console.log('✅ Profile data loaded from storage');
        } catch (error) {
            console.error('❌ Error loading profile data:', error);
        }
    }
}

// Save profile data to localStorage
function saveProfileData() {
    try {
        localStorage.setItem('profileData', JSON.stringify(profileData));
        showSaveIndicator();
        console.log('💾 Profile data saved successfully');
    } catch (error) {
        console.error('❌ Error saving profile data:', error);
        showNotification('Error saving data', 'error');
    }
}

// Render the profile with current data
function renderProfile() {
    // Update basic info
    document.getElementById('userName').textContent = profileData.name;
    document.getElementById('userTitle').textContent = profileData.title;
    document.getElementById('userDescription').textContent = profileData.description;

    // Update stats
    document.getElementById('projectsCount').textContent = profileData.stats.projects;
    document.getElementById('contributionsCount').textContent = profileData.stats.contributions;
    document.getElementById('followersCount').textContent = profileData.stats.followers;

    // Update social links
    updateSocialLink('github', profileData.social.github);
    updateSocialLink('linkedin', profileData.social.linkedin);
    updateSocialLink('twitter', profileData.social.twitter);
    updateSocialLink('email', profileData.social.email);

    // Update skills
    renderSkills();

    // Update profile image if exists
    if (profileData.image) {
        updateProfileImage(profileData.image);
    }
}

// Update social link
function updateSocialLink(platform, data) {
    const linkElement = document.getElementById(`${platform}Link`);
    const usernameElement = linkElement.querySelector('.username');

    if (usernameElement) {
        usernameElement.textContent = data.username;
    }

    // Update href based on platform
    let url = data.url;
    if (!url && data.username !== getPlaceholder(platform)) {
        switch (platform) {
            case 'github':
                url = `https://github.com/${data.username}`;
                break;
            case 'linkedin':
                url = `https://linkedin.com/in/${data.username}`;
                break;
            case 'twitter':
                url = `https://twitter.com/${data.username}`;
                break;
            case 'email':
                url = `mailto:${data.username}`;
                break;
        }
    }

    linkElement.href = url || '#';
    linkElement.target = platform === 'email' ? '' : '_blank';
}

// Get placeholder text for different platforms
function getPlaceholder(platform) {
    const placeholders = {
        github: 'yourusername',
        linkedin: 'yourusername',
        twitter: 'yourusername',
        email: 'your.email@example.com'
    };
    return placeholders[platform] || '';
}

// Render skills
function renderSkills() {
    const skillsContainer = document.getElementById('skillsContainer');
    skillsContainer.innerHTML = '';

    profileData.skills.forEach((skill, index) => {
        const skillElement = createSkillElement(skill, index);
        skillsContainer.appendChild(skillElement);
    });
}

// Create skill element
function createSkillElement(skill, index) {
    const span = document.createElement('span');
    span.className = 'skill-tag';
    span.textContent = skill;
    span.dataset.index = index;

    if (editMode) {
        span.addEventListener('click', () => editSkill(index));
        span.addEventListener('dblclick', () => removeSkill(index));
        span.title = 'Click to edit, double-click to remove';
        span.style.cursor = 'pointer';
    }

    return span;
}

// Setup event listeners
function setupEventListeners() {
    // Edit toggle button
    const editToggle = document.getElementById('editToggle');
    editToggle.addEventListener('click', toggleEditMode);

    // Image upload
    const profileImage = document.getElementById('profileImage');
    const imageInput = document.getElementById('imageInput');

    profileImage.addEventListener('click', () => {
        if (editMode) imageInput.click();
    });

    imageInput.addEventListener('change', handleImageUpload);

    // Contact button
    document.getElementById('contactBtn').addEventListener('click', handleContact);

    // Download button  
    document.getElementById('downloadBtn').addEventListener('click', handleDownload);

    // Add skill button
    document.getElementById('addSkillBtn').addEventListener('click', addSkill);

    // Setup editable elements
    setupEditableElements();
}

// Setup editable elements
function setupEditableElements() {
    const editables = document.querySelectorAll('.editable');

    editables.forEach(element => {
        element.addEventListener('click', () => {
            if (editMode) makeEditable(element);
        });

        element.addEventListener('blur', () => {
            if (editMode) saveEditableContent(element);
        });

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                element.blur();
            }
        });
    });
}

// Toggle edit mode
function toggleEditMode() {
    editMode = !editMode;
    const toggleBtn = document.getElementById('editToggle');
    const toggleText = toggleBtn.querySelector('span');
    const body = document.body;

    if (editMode) {
        body.classList.add('edit-mode');
        toggleBtn.classList.add('active');
        toggleText.textContent = 'Exit Edit';
        showNotification('✏️ Edit mode enabled - Click on text to edit', 'info');
    } else {
        body.classList.remove('edit-mode');
        toggleBtn.classList.remove('active');
        toggleText.textContent = 'Edit Mode';
        showNotification('👀 View mode enabled', 'info');
    }

    renderSkills(); // Re-render skills with correct event listeners
}

// Make element editable
function makeEditable(element) {
    const currentText = element.textContent;
    const placeholder = element.dataset.placeholder || '';

    // Skip if already editing
    if (element.contentEditable === 'true') return;

    element.contentEditable = true;
    element.focus();

    // Select all text
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // Style for editing
    element.style.outline = '2px solid var(--jade-primary)';
    element.style.backgroundColor = 'rgba(0, 187, 119, 0.1)';
    element.style.borderRadius = '4px';
    element.style.padding = '4px';
}

// Save editable content
function saveEditableContent(element) {
    if (element.contentEditable !== 'true') return;

    element.contentEditable = false;
    element.style.outline = '';
    element.style.backgroundColor = '';
    element.style.borderRadius = '';
    element.style.padding = '';

    const newContent = element.textContent.trim();
    const elementId = element.id;

    // Update profile data based on element
    switch (elementId) {
        case 'userName':
            profileData.name = newContent;
            break;
        case 'userTitle':
            profileData.title = newContent;
            break;
        case 'userDescription':
            profileData.description = newContent;
            break;
        case 'projectsCount':
            profileData.stats.projects = newContent;
            break;
        case 'contributionsCount':
            profileData.stats.contributions = newContent;
            break;
        case 'followersCount':
            profileData.stats.followers = newContent;
            break;
        default:
            // Handle social usernames
            const socialElement = element.closest('.social-link');
            if (socialElement) {
                const platform = socialElement.id.replace('Link', '');
                profileData.social[platform].username = newContent;
                updateSocialLink(platform, profileData.social[platform]);
            }
    }

    saveProfileData();
}

// Handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
        showNotification('Please select a valid image file', 'error');
        return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showNotification('Image size should be less than 5MB', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const imageData = e.target.result;
        profileData.image = imageData;
        updateProfileImage(imageData);
        saveProfileData();
        showNotification('📸 Profile image updated!', 'success');
    };

    reader.readAsDataURL(file);
}

// Update profile image
function updateProfileImage(imageData) {
    const placeholder = document.querySelector('.image-placeholder');
    placeholder.style.backgroundImage = `url(${imageData})`;
    placeholder.style.backgroundSize = 'cover';
    placeholder.style.backgroundPosition = 'center';
    placeholder.innerHTML = ''; // Remove icon
}

// Skill management
function addSkill() {
    if (!editMode) {
        showNotification('Enable edit mode to add skills', 'info');
        return;
    }

    const skillName = prompt('Enter skill name:');
    if (skillName && skillName.trim()) {
        profileData.skills.push(skillName.trim());
        renderSkills();
        saveProfileData();
        showNotification(`✨ Added skill: ${skillName}`, 'success');
    }
}

function editSkill(index) {
    const currentSkill = profileData.skills[index];
    const newSkill = prompt('Edit skill:', currentSkill);

    if (newSkill !== null && newSkill.trim()) {
        profileData.skills[index] = newSkill.trim();
        renderSkills();
        saveProfileData();
        showNotification(`✏️ Updated skill: ${newSkill}`, 'success');
    }
}

function removeSkill(index) {
    if (confirm('Remove this skill?')) {
        const removedSkill = profileData.skills.splice(index, 1)[0];
        renderSkills();
        saveProfileData();
        showNotification(`🗑️ Removed skill: ${removedSkill}`, 'info');
    }
}

// Button handlers
function handleContact() {
    const email = profileData.social.email.username;
    if (email && email !== 'your.email@example.com') {
        window.location.href = `mailto:${email}?subject=Hello from your profile!`;
    } else {
        showNotification('📧 Please add your email address first', 'info');
    }
}

function handleDownload() {
    // Generate a simple text resume
    const resumeContent = `
${profileData.name}
${profileData.title}

${profileData.description}

CONTACT:
GitHub: ${profileData.social.github.username}
LinkedIn: ${profileData.social.linkedin.username}
Email: ${profileData.social.email.username}

SKILLS:
${profileData.skills.join(', ')}

STATS:
Projects: ${profileData.stats.projects}
Contributions: ${profileData.stats.contributions}
Followers: ${profileData.stats.followers}
`.trim();

    downloadTextFile(resumeContent, `${profileData.name.replace(/\s+/g, '_')}_Resume.txt`);
    showNotification('📄 Resume downloaded!', 'success');
}

// Utility functions
function downloadTextFile(content, filename) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function showSaveIndicator() {
    const indicator = document.getElementById('saveIndicator');
    indicator.classList.add('show');

    setTimeout(() => {
        indicator.classList.remove('show');
    }, 2000);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '12px 24px',
        borderRadius: '25px',
        color: 'white',
        fontWeight: '500',
        fontSize: '14px',
        zIndex: '9999',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        opacity: '0',
        transition: 'all 0.3s ease'
    });

    // Set background color based on type
    const colors = {
        info: '#00BB77',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b'
    };

    notification.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);

    // Hide notification
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Export data functionality
function exportProfile() {
    const dataStr = JSON.stringify(profileData, null, 2);
    downloadTextFile(dataStr, `${profileData.name.replace(/\s+/g, '_')}_Profile_Data.json`);
    showNotification('📤 Profile data exported!', 'success');
}

// Import data functionality  
function importProfile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = function (event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const importedData = JSON.parse(e.target.result);
                profileData = { ...profileData, ...importedData };
                renderProfile();
                saveProfileData();
                showNotification('📥 Profile data imported successfully!', 'success');
            } catch (error) {
                showNotification('❌ Error importing profile data', 'error');
            }
        };
        reader.readAsText(file);
    };

    input.click();
}

// Console commands for advanced users
console.log('🎯 Advanced Commands:');
console.log('- exportProfile() - Export your profile data');
console.log('- importProfile() - Import profile data from file');
console.log('- profileData - Access/modify profile data directly');
console.log('- renderProfile() - Refresh the display');

// Make functions available globally for console use
window.exportProfile = exportProfile;
window.importProfile = importProfile;
window.profileData = profileData;
window.renderProfile = renderProfile;
