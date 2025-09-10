/* 
🚀 JAVASCRIPT FILE - Adding Interactivity
This file demonstrates how to add simple JavaScript functionality to your profile.
You can expand this with more interactive features as you learn!
*/

// Welcome message in the console (check browser developer tools!)
console.log("🎉 Welcome to your Personal Profile!");
console.log("💚 Built with the Jade Green theme");
console.log("🔧 Ready for customization!");
console.log("---");
console.log("💡 Tip: Right-click on this page and select 'Inspect' to see developer tools");

// Function to show a welcome message when the fun button is clicked
function showWelcomeMessage() {
    // Array of fun messages to randomly display
    const messages = [
        "🎉 Welcome to my profile! Thanks for visiting!",
        "💚 Hope you like the Jade Green theme!",
        "🚀 This is built with HTML, CSS, and JavaScript!",
        "⭐ Don't forget to star this repository!",
        "🤝 Let's connect and collaborate!",
        "💻 Happy coding and contributing!",
        "🌟 Thanks for being part of the open source community!"
    ];
    
    // Pick a random message from the array
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Show the message in a popup
    alert(randomMessage);
    
    // Also log it to console for developers to see
    console.log("Button clicked! Message:", randomMessage);
}

// Add a subtle animation when the page loads
window.addEventListener('DOMContentLoaded', function() {
    // Get the profile card element
    const profileCard = document.querySelector('.profile-card');
    
    // Add a loading animation class (you can define this in CSS if you want)
    console.log("✅ Page loaded successfully!");
    console.log("🎯 Profile card found:", profileCard ? "Yes" : "No");
    
    // Simple example: Change the page title after 3 seconds
    setTimeout(function() {
        document.title = "✨ Personal Profile - Ready to customize!";
        console.log("📝 Page title updated!");
    }, 3000);
});

/* 
💡 JAVASCRIPT LEARNING TIPS:
1. Open browser developer tools (F12) to see console messages
2. Try adding more interactive features like:
   - Form validation
   - Dynamic content loading
   - Animations with CSS classes
   - Local storage for user preferences
3. Learn about DOM manipulation to change page content
4. Experiment with event listeners for user interactions

🎯 BEGINNER CHALLENGES:
- Add a visitor counter
- Create a theme switcher (light/dark mode)
- Add a simple contact form
- Implement smooth scrolling
- Add typing animation for the name
*/

// Example: Simple visitor counter using localStorage (browser storage)
function updateVisitorCount() {
    // Get current count from browser storage (starts at 0 if first visit)
    let visitCount = localStorage.getItem('profileVisits') || 0;
    
    // Increment the count
    visitCount = parseInt(visitCount) + 1;
    
    // Save back to storage
    localStorage.setItem('profileVisits', visitCount);
    
    // Log to console
    console.log(`👥 You've visited this profile ${visitCount} time(s)!`);
    
    // Uncomment the line below if you want to show visit count on the page
    // document.querySelector('.description').innerHTML += `<br><small>👥 Visit #${visitCount}</small>`;
}

// Call the visitor counter function when page loads
updateVisitorCount();
