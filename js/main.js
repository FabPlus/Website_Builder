/* =============================================
   WeTalkData — Main JavaScript
   ============================================= */

(function () {
    'use strict';

    // --- Navigation: Scroll effect ---
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    function handleNavScroll() {
        if (window.scrollY > 50) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // --- Mobile menu toggle ---
    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav__link').forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Scroll animations (Intersection Observer) ---
    var animatedElements = document.querySelectorAll(
        '.service-card, .work-card, .blog-card, .stat-card, .about__text, .about__industries, .contact__content, .contact__form-wrap'
    );

    animatedElements.forEach(function (el) {
        el.classList.add('fade-in');
    });

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    animatedElements.forEach(function (el) {
        observer.observe(el);
    });

    // --- Active nav link highlight ---
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav__link');

    function highlightActiveNav() {
        var scrollY = window.scrollY + 100;

        sections.forEach(function (section) {
            var sectionTop = section.offsetTop - 100;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(function (link) {
                    link.classList.remove('nav__link--active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('nav__link--active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNav, { passive: true });

    // --- Contact form handling ---
    var contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var formData = new FormData(contactForm);
        var data = {};
        formData.forEach(function (value, key) {
            data[key] = value;
        });

        // Show success state
        var submitBtn = contactForm.querySelector('button[type="submit"]');
        var originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.backgroundColor = '#10b981';
        submitBtn.style.borderColor = '#10b981';
        submitBtn.disabled = true;

        setTimeout(function () {
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.style.borderColor = '';
            submitBtn.disabled = false;
            contactForm.reset();
        }, 3000);
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
})();
