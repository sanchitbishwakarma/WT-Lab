/**
 * CreativeFlow - Digital Agency Website
 * Smooth Section Navigation with Enhanced Features
 * @version 2.0.0
 */

(function () {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================
    const CONFIG = {
        scrollBehavior: 'smooth',
        scrollBlock: 'start',
        activeClass: 'active',
        scrollOffset: 200,
        debounceDelay: 10,
        counterSpeed: 2000
    };

    // ============================================
    // DOM ELEMENTS
    // ============================================
    const DOM = {
        navLinks: null,
        sections: null,
        navbar: null,
        statNumbers: null,
        contactForm: null,
        filterButtons: null,
        portfolioCards: null,
        heroButtons: null
    };

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    /**
     * Debounce function
     */
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    /**
     * Remove URL hash
     */
    const removeURLHash = () => {
        if (window.location.hash) {
            history.replaceState(null, null, window.location.pathname + window.location.search);
        }
    };

    /**
     * Disable scroll restoration
     */
    const disableScrollRestoration = () => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
    };

    /**
     * Scroll to top
     */
    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    // ============================================
    // NAVIGATION FUNCTIONS
    // ============================================

    /**
     * Smooth scroll to section
     */
    const scrollToSection = (targetId) => {
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: CONFIG.scrollBehavior,
                block: CONFIG.scrollBlock
            });
        }
    };

    /**
     * Update active navigation link
     */
    const updateActiveLink = (activeLink) => {
        DOM.navLinks.forEach(link => link.classList.remove(CONFIG.activeClass));
        if (activeLink) {
            activeLink.classList.add(CONFIG.activeClass);
        }
    };

    /**
     * Get current section
     */
    const getCurrentSection = () => {
        let current = '';
        const scrollPosition = window.pageYOffset;

        DOM.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop - CONFIG.scrollOffset) {
                current = section.getAttribute('id');
            }
        });

        return current;
    };

    /**
     * Handle scroll event
     */
    const handleScroll = debounce(() => {
        // Update active nav link
        const currentSection = getCurrentSection();
        if (currentSection) {
            const activeLink = document.querySelector(`.nav-link[data-section="${currentSection}"]`);
            updateActiveLink(activeLink);
        }

        // Add scrolled class to navbar
        if (window.scrollY > 50) {
            DOM.navbar.classList.add('scrolled');
        } else {
            DOM.navbar.classList.remove('scrolled');
        }
    }, CONFIG.debounceDelay);

    /**
     * Handle navigation click
     */
    const handleNavClick = (event) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('data-section');

        if (targetId) {
            scrollToSection(targetId);
            updateActiveLink(event.currentTarget);
        }
    };

    // ============================================
    // COUNTER ANIMATION
    // ============================================

    /**
     * Animate counter
     */
    const animateCounter = (element, target, duration) => {
        let start = 0;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    };

    /**
     * Initialize counters
     */
    const initCounters = () => {
        let hasAnimated = false;

        const checkCounters = () => {
            if (hasAnimated) return;

            const heroSection = document.getElementById('home');
            if (heroSection) {
                const rect = heroSection.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

                if (isVisible) {
                    DOM.statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        animateCounter(stat, target, CONFIG.counterSpeed);
                    });
                    hasAnimated = true;
                }
            }
        };

        window.addEventListener('scroll', checkCounters);
        checkCounters(); // Check on load
    };

    // ============================================
    // PORTFOLIO FILTER
    // ============================================

    /**
     * Filter portfolio items
     */
    const filterPortfolio = (category) => {
        DOM.portfolioCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    };

    /**
     * Handle filter button click
     */
    const handleFilterClick = (event) => {
        const filterValue = event.target.getAttribute('data-filter');

        // Update active button
        DOM.filterButtons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        // Filter items
        filterPortfolio(filterValue);
    };

    // ============================================
    // CONTACT FORM
    // ============================================

    /**
     * Handle form submission
     */
    const handleFormSubmit = (event) => {
        event.preventDefault();

        const formStatus = document.getElementById('formStatus');
        const formData = new FormData(event.target);

        // Simulate form submission
        formStatus.textContent = 'Sending message...';
        formStatus.className = 'form-status';
        formStatus.style.display = 'block';

        setTimeout(() => {
            formStatus.textContent = 'Message sent successfully! We\'ll get back to you soon.';
            formStatus.classList.add('success');
            event.target.reset();

            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }, 1500);
    };

    // ============================================
    // EVENT LISTENERS
    // ============================================

    /**
     * Attach all event listeners
     */
    const attachEventListeners = () => {
        // Navigation links
        DOM.navLinks.forEach(link => {
            link.addEventListener('click', handleNavClick);
        });

        // Hero buttons
        DOM.heroButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetId = e.currentTarget.getAttribute('data-section');
                if (targetId) {
                    scrollToSection(targetId);
                }
            });
        });

        // Scroll listener
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Filter buttons
        if (DOM.filterButtons) {
            DOM.filterButtons.forEach(button => {
                button.addEventListener('click', handleFilterClick);
            });
        }

        // Contact form
        if (DOM.contactForm) {
            DOM.contactForm.addEventListener('submit', handleFormSubmit);
        }
    };

    // ============================================
    // INITIALIZATION
    // ============================================

    /**
     * Cache DOM elements
     */
    const cacheDOMElements = () => {
        DOM.navLinks = document.querySelectorAll('.nav-link');
        DOM.sections = document.querySelectorAll('.section');
        DOM.navbar = document.querySelector('.navbar');
        DOM.statNumbers = document.querySelectorAll('.stat-number');
        DOM.contactForm = document.getElementById('contactForm');
        DOM.filterButtons = document.querySelectorAll('.filter-btn');
        DOM.portfolioCards = document.querySelectorAll('.portfolio-card');
        DOM.heroButtons = document.querySelectorAll('.hero-buttons .btn, .btn[data-section]');
    };

    /**
     * Initialize application
     */
    const init = () => {
        // Cache DOM
        cacheDOMElements();

        // Setup page behavior
        disableScrollRestoration();
        scrollToTop();
        removeURLHash();

        // Attach listeners
        attachEventListeners();

        // Initialize features
        if (DOM.statNumbers.length > 0) {
            initCounters();
        }

        // Set initial active link
        const firstLink = DOM.navLinks[0];
        if (firstLink) {
            updateActiveLink(firstLink);
        }

        console.log('✅ CreativeFlow initialized successfully');
    };

    // ============================================
    // START APPLICATION
    // ============================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose public API
    window.CreativeFlow = {
        scrollToSection,
        getCurrentSection,
        version: '2.0.0'
    };

})();