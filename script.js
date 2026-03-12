document.addEventListener('DOMContentLoaded', function() {

    // ======================== AOS Init ========================
    AOS.init({
        duration: 900,
        once: true,
        offset: 80,
        easing: 'ease-out-cubic',
    });

    // ======================== Navbar Shrink on Scroll ========================
    const header = document.getElementById('main-header');

    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            if (currentScroll > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ======================== Mobile Menu ========================
    const menuHamburger = document.querySelector('.menu-hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (menuHamburger) {
        menuHamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuHamburger.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuHamburger.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });
    });

    // ======================== FAQ Accordion ========================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const answer = item.querySelector('.faq-answer');
                const currentlyActive = item.classList.contains('active');

                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
                    }
                });

                if (currentlyActive) {
                    item.classList.remove('active');
                    answer.style.maxHeight = '0px';
                } else {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });

    // ======================== Back to Top ========================
    const backToTopBtn = document.getElementById('back-to-top-btn');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ======================== Sobre Section Reveal ========================
    const sobreSection = document.querySelector('.sobre-section');

    if (sobreSection) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    sobreSection.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(sobreSection);
    }

    // ======================== Active Nav Link Highlight ========================
    const sections = document.querySelectorAll('section[id]');
    const navLinkElements = document.querySelectorAll('.nav-links a');

    function highlightNav() {
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height) {
                navLinkElements.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();

    // ======================== Parallax Hero (Desktop) ========================
    const hero = document.querySelector('.hero');

    if (hero && window.innerWidth >= 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = `calc(50% + ${scrolled * 0.3}px)`;
            }
        }, { passive: true });
    }

    // ======================== Cookie Banner ========================
    const cookieBanner = document.getElementById('cookie-banner');
    const btnAceitarCookies = document.getElementById('btn-aceitar-cookies');

    if (cookieBanner && btnAceitarCookies) {
        if (!localStorage.getItem('cookiesAccepted')) {
            // Aguarda 1s para exibir o banner com animação suave
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1000);
        }

        btnAceitarCookies.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('show');
        });
    }
});
