// main.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initScrollEffects();
    initAnimations();
    initMobileMenu();
    initProjectCards();
    initTypewriterEffect();
    initParticles();
});

// ===== NAVIGATION FUNCTIONALITY =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    document.getElementById('nav-toggle').classList.remove('active');
                }
            }
        });
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for smooth sequential animations
                setTimeout(() => {
                    entry.target.classList.add('fade-in-up');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation with proper initial states
    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .consulting-card, .speaking-card, .contact-card');
    animateElements.forEach((el, index) => {
        // Set initial state to prevent jerky animations
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });
    
    // Parallax effect for hero section (disabled on mobile for performance)
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const heroBackground = document.querySelector('.hero-particles');
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }, 16));
    }
    
    // Mobile-specific scroll optimizations
    if (window.innerWidth <= 768) {
        const mobileObserverOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const mobileObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 50);
                    mobileObserver.unobserve(entry.target);
                }
            });
        }, mobileObserverOptions);
        
        // Apply mobile-specific animations with smooth easing
        const mobileElements = document.querySelectorAll('.timeline-item, .project-card, .consulting-card, .speaking-card, .contact-card');
        mobileElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            mobileObserver.observe(el);
        });
    }
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Animate stats on scroll
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        animateNumbers();
                    }, 300);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    // Smooth hover effects for cards (desktop only)
    if (window.innerWidth > 768) {
        const cards = document.querySelectorAll('.project-card, .consulting-card, .speaking-card, .contact-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Initialize hero animations
    initHeroAnimations();
}

// ===== HERO ANIMATIONS =====
function initHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-actions, .hero-stats');
    
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200 + 500);
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const hamburger = this.querySelector('.hamburger');
            if (hamburger) {
                hamburger.classList.toggle('active');
            }
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                
                const hamburger = navToggle.querySelector('.hamburger');
                if (hamburger) {
                    hamburger.classList.remove('active');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                
                const hamburger = navToggle.querySelector('.hamburger');
                if (hamburger) {
                    hamburger.classList.remove('active');
                }
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                
                const hamburger = navToggle.querySelector('.hamburger');
                if (hamburger) {
                    hamburger.classList.remove('active');
                }
            }
        });
    }
}

// ===== PROJECT CARDS =====
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const image = card.querySelector('.project-image img');
        const overlay = card.querySelector('.project-overlay');
        
        if (image && overlay) {
            // Desktop hover effects
            if (window.innerWidth > 768) {
                card.addEventListener('mouseenter', () => {
                    overlay.style.opacity = '1';
                    image.style.transform = 'scale(1.1)';
                });
                
                card.addEventListener('mouseleave', () => {
                    overlay.style.opacity = '0';
                    image.style.transform = 'scale(1)';
                });
            }
            
            // Mobile touch effects
            if (window.innerWidth <= 768) {
                let touchStartTime = 0;
                let touchEndTime = 0;
                
                card.addEventListener('touchstart', (e) => {
                    touchStartTime = new Date().getTime();
                    overlay.style.opacity = '0.5';
                    image.style.transform = 'scale(1.05)';
                }, { passive: true });
                
                card.addEventListener('touchend', (e) => {
                    touchEndTime = new Date().getTime();
                    const touchDuration = touchEndTime - touchStartTime;
                    
                    // If it's a quick tap, show overlay briefly
                    if (touchDuration < 300) {
                        overlay.style.opacity = '1';
                        image.style.transform = 'scale(1.1)';
                        
                        setTimeout(() => {
                            overlay.style.opacity = '0';
                            image.style.transform = 'scale(1)';
                        }, 500);
                    } else {
                        overlay.style.opacity = '0';
                        image.style.transform = 'scale(1)';
                    }
                }, { passive: true });
                
                card.addEventListener('touchcancel', () => {
                    overlay.style.opacity = '0';
                    image.style.transform = 'scale(1)';
                }, { passive: true });
            }
        }
    });
}

// ===== TYPEWRITER EFFECT =====
function initTypewriterEffect() {
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const text = heroName.textContent;
        heroName.textContent = '';
        heroName.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroName.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        };
        
        // Start typewriter effect after hero animations
        setTimeout(typeWriter, 1500);
    }
}

// ===== PARTICLES EFFECT =====
function initParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (particlesContainer) {
        // Create floating particles
        for (let i = 0; i < 20; i++) {
            createParticle(particlesContainer);
        }
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(99, 102, 241, 0.3);
        border-radius: 50%;
        pointer-events: none;
        animation: float 6s ease-in-out infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 6}s;
    `;
    
    container.appendChild(particle);
}

// ===== UTILITY FUNCTIONS =====
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;
        
        const updateNumber = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current) + (stat.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
            }
        };
        
        updateNumber();
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations and effects
}, 16)); // ~60fps

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Keyboard navigation for mobile menu
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Focus management for mobile menu
function manageFocus() {
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu.querySelectorAll('.nav-link');
    
    if (navMenu.classList.contains('active')) {
        // Trap focus within menu when open
        const firstLink = navLinks[0];
        const lastLink = navLinks[navLinks.length - 1];
        
        navLinks.forEach(link => {
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    if (e.shiftKey && this === firstLink) {
                        e.preventDefault();
                        lastLink.focus();
                    } else if (!e.shiftKey && this === lastLink) {
                        e.preventDefault();
                        firstLink.focus();
                    }
                }
            });
        });
    }
}

// ===== LAZY LOADING =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== THEME TOGGLE (FOR FUTURE USE) =====
function initThemeToggle() {
    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Theme toggle functionality can be added here
    // This is a placeholder for future light/dark mode implementation
}

// ===== ANALYTICS (FOR FUTURE USE) =====
function initAnalytics() {
    // Google Analytics or other tracking code can be added here
    // This is a placeholder for future analytics implementation
}

// ===== SERVICE WORKER (FOR FUTURE USE) =====
function initServiceWorker() {
    // Service worker registration for PWA features
    // This is a placeholder for future PWA implementation
    if ('serviceWorker' in navigator) {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    }
}

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.PortfolioApp = {
    initNavigation,
    initSmoothScrolling,
    initScrollEffects,
    initAnimations,
    initMobileMenu,
    initProjectCards,
    initTypewriterEffect,
    initParticles,
    animateNumbers,
    debounce,
    throttle
};

// ===== CSS ANIMATIONS (ADDED VIA JAVASCRIPT) =====
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.6;
        }
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .hamburger.active {
        transform: rotate(45deg);
        transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .hamburger.active::before {
        transform: rotate(-90deg) translate(-6px, 0);
        transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .hamburger.active::after {
        transform: rotate(90deg) translate(-6px, 0);
        transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .hamburger::before,
    .hamburger::after {
        content: '';
        position: absolute;
        width: 25px;
        height: 3px;
        background: var(--text-primary);
        transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .hamburger::before {
        transform: translateY(-8px);
    }
    
    .hamburger::after {
        transform: translateY(8px);
    }
    
    .particle {
        animation: float 6s ease-in-out infinite;
    }
    
    .fade-in-up {
        animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Smooth scroll behavior */
    html {
        scroll-behavior: smooth;
    }
    
    /* Prevent layout shifts during animations */
    .hero-name {
        min-height: 1.2em;
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        transition-property: transform, opacity, color, background-color, border-color, box-shadow;
        transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
`;

document.head.appendChild(style);
