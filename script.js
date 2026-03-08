// Select elements
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const mainHeader = document.getElementById('mainHeader');

// Toggle Mobile Menu
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Toggle Icon
    const icon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.querySelector('i').classList.remove('fa-times');
        menuBtn.querySelector('i').classList.add('fa-bars');
    });
});

// Header scroll effect (optional shadow)
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        mainHeader.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        mainHeader.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
});