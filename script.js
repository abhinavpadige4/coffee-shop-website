// Mobile Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

navToggle.addEventListener('click', () => {
    const isOpen = navList.getAttribute('data-visible') === 'true';
    navToggle.setAttribute('aria-expanded', !isOpen);
    navList.setAttribute('data-visible', !isOpen);
    
    // Update screen reader text
    const toggleIcon = navToggle.querySelector('.sr-only');
    if (toggleIcon) {
        toggleIcon.textContent = isOpen ? 'Open menu' : 'Close menu';
    }
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.setAttribute('data-visible', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
        const toggleIcon = navToggle.querySelector('.sr-only');
        if (toggleIcon) {
            toggleIcon.textContent = 'Open menu';
        }
    });
});

// Form Validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const formSuccess = document.getElementById('form-success');

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Validate form
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset errors
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    formSuccess.textContent = '';
    
    let isValid = true;
    
    // Validate name
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Please enter your name';
        nameInput.focus();
        isValid = false;
    }
    
    // Validate email
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Please enter your email';
        emailInput.focus();
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        emailInput.focus();
        isValid = false;
    }
    
    // Validate message
    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Please enter a message';
        messageInput.focus();
        isValid = false;
    }
    
    if (isValid) {
        // Simulate form submission
        formSuccess.textContent = 'Thank you for your message! We will get back to you soon.';
        contactForm.reset();
        
        // Clear success message after 5 seconds
        setTimeout(() => {
            formSuccess.textContent = '';
        }, 5000);
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for fade-in
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add fade-in class when sections are in view
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial check for sections already in view
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight - 100) {
            section.classList.add('fade-in');
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
`;
document.head.appendChild(style);

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        lazyImages.forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        // Fallback for older browsers
        const lazyLoad = function() {
            lazyImages.forEach(img => {
                if (img.getBoundingClientRect().top < window.innerHeight && 
                    img.getBoundingClientRect().bottom > 0 && 
                    getComputedStyle(img).display !== 'none') {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                }
            });
            
            if (lazyImages.length === 0) {
                document.removeEventListener('scroll', lazyLoad);
                window.removeEventListener('resize', lazyLoad);
                window.removeEventListener('orientationchange', lazyLoad);
            }
        };
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationchange', lazyLoad);
    }
});

// Accessibility enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add skip link focus styling
    const skipLink = document.querySelector('.skip-link');
    skipLink.style.position = 'fixed';
    skipLink.style.top = '-40px';
    skipLink.style.left = '0';
    skipLink.style.background = 'var(--primary)';
    skipLink.style.color = 'var(--white)';
    skipLink.style.padding = '8px 16px';
    skipLink.style.zIndex = '1000';
    skipLink.style.transition = 'top 0.3s ease';
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    // Ensure all form elements have proper labels
    const formElements = document.querySelectorAll('input, textarea, select');
    formElements.forEach(element => {
        if (!element.hasAttribute('aria-label') && !element.hasAttribute('aria-labelledby')) {
            const id = element.id;
            if (id) {
                const label = document.querySelector(`label[for="${id}"]`);
                if (!label) {
                    // Create aria-label from placeholder or name
                    const placeholder = element.getAttribute('placeholder');
                    const name = element.getAttribute('name');
                    if (placeholder) {
                        element.setAttribute('aria-label', placeholder);
                    } else if (name) {
                        element.setAttribute('aria-label', name.replace(/[_]/g, ' '));
                    }
                }
            }
        }
    });
});