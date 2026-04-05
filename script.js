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
            menuBtn.querySelector('i').classList.remove('fa-times');
            menuBtn.querySelector('i').classList.add('fa-bars');
        });
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    if (mainHeader) {
        if (window.scrollY > 50) {
            mainHeader.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            mainHeader.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    }
});

// Smooth reveal animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .help-item, .benefit-card, .course-card, .proof-card, .step-card, .problem-card, .solution-card, .ops-card, .audience-card, .usecase-item, .feature-detail-card, .preview-card');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.03}s, transform 0.6s ease ${index * 0.03}s`;
        observer.observe(el);
    });
});

// Counter animation for proof section
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
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

// Trigger counter animation when proof section is visible
const proofSection = document.querySelector('.proof-section');
if (proofSection) {
    const proofObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                proofObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    proofObserver.observe(proofSection);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = mainHeader ? mainHeader.offsetHeight : 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});