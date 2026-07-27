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
    const scrollProgress = document.querySelector('.scroll-progress');

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

    // ======================== Scroll Progress Bar ========================
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
            scrollProgress.style.width = scrolled + '%';
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

    // ======================== Quiz Interativo ========================
    const quizContainer = document.querySelector('.quiz-container');

    if (quizContainer) {
        const questions = quizContainer.querySelectorAll('.quiz-question');
        const progressBar = quizContainer.querySelector('.quiz-progress-bar');
        const resultDiv = quizContainer.querySelector('.quiz-result');
        const resultIcon = quizContainer.querySelector('.quiz-result-icon');
        const resultTitle = quizContainer.querySelector('.quiz-result-title');
        const resultText = quizContainer.querySelector('.quiz-result-text');
        const restartBtn = quizContainer.querySelector('.quiz-restart');
        let currentQuestion = 0;
        let totalScore = 0;

        function updateProgress() {
            const pct = ((currentQuestion + 1) / questions.length) * 100;
            progressBar.style.width = pct + '%';
        }

        function showResult() {
            const quizQuestions = quizContainer.querySelector('.quiz-questions');
            const quizProgress = quizContainer.querySelector('.quiz-progress');
            quizQuestions.style.display = 'none';
            quizProgress.style.display = 'none';
            resultDiv.style.display = 'block';

            if (totalScore <= 3) {
                resultIcon.textContent = '🌿';
                resultTitle.textContent = 'Você está bem, mas pode cuidar ainda mais';
                resultText.textContent = 'Suas respostas indicam que você está lidando bem com os desafios do dia a dia. Mas se perceber que algo incomoda, um espaço de escuta pode ajudar você a se conhecer melhor e prevenir futuras crises.';
            } else if (totalScore <= 6) {
                resultIcon.textContent = '🌱';
                resultTitle.textContent = 'Vale a pena conversar com um profissional';
                resultText.textContent = 'Algumas das suas respostas mostram que você pode estar carregando coisas que um processo terapêutico poderia ajudar a organizar. Não é preciso estar em crise para buscar ajuda — às vezes, conversar é o primeiro passo.';
            } else {
                resultIcon.textContent = '💛';
                resultTitle.textContent = 'A terapia pode fazer diferença na sua vida';
                resultText.textContent = 'Suas respostas sugerem que você está passando por um momento em que o apoio profissional pode ser muito útil. Um espaço seguro e sem julgamentos pode te ajudar a entender melhor o que está sentindo e encontrar novos caminhos.';
            }

            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        function resetQuiz() {
            currentQuestion = 0;
            totalScore = 0;
            questions.forEach(q => q.classList.remove('active'));
            questions[0].classList.add('active');
            resultDiv.style.display = 'none';
            quizContainer.querySelector('.quiz-questions').style.display = 'block';
            quizContainer.querySelector('.quiz-progress').style.display = 'block';
            updateProgress();
        }

        quizContainer.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', () => {
                const parent = option.closest('.quiz-question');
                parent.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
                totalScore += parseInt(option.dataset.value);

                setTimeout(() => {
                    parent.classList.remove('active');
                    currentQuestion++;
                    if (currentQuestion < questions.length) {
                        questions[currentQuestion].classList.add('active');
                        updateProgress();
                    } else {
                        showResult();
                    }
                }, 350);
            });
        });

        if (restartBtn) {
            restartBtn.addEventListener('click', resetQuiz);
        }
    }

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
