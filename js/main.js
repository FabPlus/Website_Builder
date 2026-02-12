/* =============================================
   WeTalkData — Main JavaScript
   ============================================= */

(function () {
    'use strict';

    // --- Navigation: Scroll effect ---
    var nav = document.getElementById('nav');
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');

    if (nav) {
        function handleNavScroll() {
            if (window.scrollY > 50) {
                nav.classList.add('nav--scrolled');
            } else {
                nav.classList.remove('nav--scrolled');
            }
        }

        window.addEventListener('scroll', handleNavScroll, { passive: true });
        handleNavScroll();
    }

    // --- Mobile menu toggle ---
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav__link').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Scroll animations (Intersection Observer) ---
    var animatedElements = document.querySelectorAll(
        '.service-card, .work-card, .blog-card, .stat-card, .about__text, .about__industries, .about__profile, .contact__content, .contact__form-wrap, .manifesto__container, .challenges__col'
    );

    animatedElements.forEach(function (el) {
        el.classList.add('fade-in');
    });

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        animatedElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        animatedElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // --- Active nav link highlight ---
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav__link');

    function highlightActiveNav() {
        var scrollY = window.scrollY + 120;

        sections.forEach(function (section) {
            var sectionTop = section.offsetTop - 120;
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

    if (sections.length > 0) {
        window.addEventListener('scroll', highlightActiveNav, { passive: true });
    }

    // --- Contact form handling ---
    var contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var submitBtn = contactForm.querySelector('button[type="submit"]');
            var originalText = submitBtn.textContent;
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#2dd4a8';
            submitBtn.style.borderColor = '#2dd4a8';
            submitBtn.style.color = '#0a1a1a';
            submitBtn.disabled = true;

            setTimeout(function () {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.borderColor = '';
                submitBtn.style.color = '';
                submitBtn.disabled = false;
                contactForm.reset();
            }, 3000);
        });
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
})();
