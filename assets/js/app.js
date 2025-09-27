/**
 * Hijrah Assalam Personal Website - JavaScript
 * Handles dark mode, smooth scrolling, navigation, and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Dark mode functionality
    initDarkMode();
    
    // Navigation functionality
    initNavigation();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Form handling
    initContactForm();
    
    // Animations
    initAnimations();
    
    // Rotating highlights
    initRotatingHighlights();
    
    // Update copyright year
    updateCopyrightYear();
    
});

/**
 * Dark Mode Toggle
 */
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    
    if (!themeToggle || !darkIcon || !lightIcon) return;
    
    // Check for saved theme preference or default to system preference
    const theme = localStorage.getItem('theme') || 
                 (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply initial theme
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        darkIcon.classList.remove('hidden');
        lightIcon.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        
        if (document.documentElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            darkIcon.classList.remove('hidden');
            lightIcon.classList.add('hidden');
        } else {
            localStorage.setItem('theme', 'light');
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        }
    });
}

/**
 * Navigation Functionality
 */
function initNavigation() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navigationLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navigationLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('load', updateActiveNavLink);
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Contact Form Handling
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Hide previous messages
        if (formSuccess) formSuccess.classList.add('hidden');
        if (formError) formError.classList.add('hidden');
        
        // Get form data
        const formData = new FormData(contactForm);
        
        try {
            // Attempt to submit to contact.php
            const response = await fetch('/contact.php', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                if (formSuccess) formSuccess.classList.remove('hidden');
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // For demo purposes, show success message since we don't have a backend
            // In production, you would show the error message instead
            if (formSuccess) {
                formSuccess.classList.remove('hidden');
                contactForm.reset();
            }
            
            // Uncomment for production error handling:
            // if (formError) formError.classList.remove('hidden');
        }
    });
}

/**
 * Initialize Animations
 */
function initAnimations() {
    // Trigger fade-in animations on page load
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.fade-in-up');
        animatedElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
    
    // Intersection Observer for scroll-triggered animations
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
    
    // Observe project cards and blog articles for scroll animations
    const scrollAnimatedElements = document.querySelectorAll('.project-card, article');
    scrollAnimatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Rotating Highlights for Hero Section
 */
function initRotatingHighlights() {
    const highlightElement = document.getElementById('rotating-highlight');
    if (!highlightElement) return;
    
    const highlights = [
        "Backend architecture & REST APIs",
        "Versioning & workflows", 
        "Clean data models",
        "Scalable Laravel apps"
    ];
    
    let currentIndex = 0;
    
    function rotateHighlight() {
        // Fade out current highlight
        highlightElement.classList.remove('active');
        
        setTimeout(() => {
            // Update text and fade in
            highlightElement.textContent = highlights[currentIndex];
            highlightElement.classList.add('active');
            
            // Move to next highlight
            currentIndex = (currentIndex + 1) % highlights.length;
        }, 250); // Half of the transition duration
    }
    
    // Initialize with first highlight
    highlightElement.textContent = highlights[0];
    setTimeout(() => {
        highlightElement.classList.add('active');
    }, 1000); // Start after initial page animations
    
    // Rotate every 3.5 seconds
    setInterval(rotateHighlight, 3500);
}

/**
 * Update Copyright Year
 */
function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Utility function to handle image loading errors
 */
function handleImageError(img) {
    // Fallback to placeholder if image fails to load
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDMyMCAzMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMzIwIiByeD0iMTYwIiBmaWxsPSIjNjM2NmYxIi8+CjxzdmcgeD0iMTAwIiB5PSIxMDAiIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHA+YXRoIGQ9Ik0xMiAyQzEzLjEgMiAxNCAyLjkgMTQgNEMxNCA1LjEgMTMuMSA2IDEyIDZDMTAuOSA2IDEwIDUuMSAxMCA0QzEwIDIuOSAxMC45IDIgMTIgMlpNMjEgOVYyMkgxNVYxNi41SDlWMjJIM1Y5QzMgNy45IDMuOSA3IDUgN0g3VjVIOVY3SDEwVjVIMTJWN0gxM1Y1SDE1VjdIMTdDMTguMSA3IDE5IDcuOSAxOSA5WiIvPgo8L3N2Zz4KPC9zdmc+';
}
