// Select elements
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const mainHeader = document.getElementById('mainHeader');

// Toggle Mobile Menu
if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
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
            const icon = menuBtn.querySelector('i');
            if(icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// Header scroll effect (adds shadow on scroll)
window.addEventListener('scroll', () => {
    if (mainHeader) {
        if (window.scrollY > 50) {
            mainHeader.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            mainHeader.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            mainHeader.style.boxShadow = '0 2px 10px rgba(0,0,0,0.03)';
            mainHeader.style.background = 'rgba(255, 255, 255, 0.97)';
        }
    }
});

// Smooth reveal animation on scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Optional: Unobserve after animation to save resources
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Target new design elements
    const animateElements = document.querySelectorAll('.service-card, .split-section, .visual-strip, .stat-item, .proof-card, .step-card, .testimonial-card, .footer-col');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        observer.observe(el);
    });
});

// Counter animation for stats (Visual Strip & Proof Section)
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when stats section is visible
// We look for .visual-strip (Homepage/About) or .proof-section (old class)
const statsSection = document.querySelector('.visual-strip') || document.querySelector('.proof-section');

if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% visible
    
    statsObserver.observe(statsSection);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = mainHeader ? mainHeader.offsetHeight : 85;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});