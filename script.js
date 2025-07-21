// script.js - Versão Final, Limpa e Organizada

document.addEventListener('DOMContentLoaded', function() {

    // 1. INICIALIZAÇÃO DE ANIMAÇÕES
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
    });

    // 2. CÓDIGO DO MENU HAMBÚRGUER
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

    // 3. CÓDIGO DO ACORDEÃO (FAQ)
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const answer = item.querySelector('.faq-answer');
                const currentlyActive = item.classList.contains('active');

                // Fecha todos os outros itens
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
                    }
                });

                // Abre ou fecha o item clicado
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

    // 4. CÓDIGO DO BOTÃO VOLTAR AO TOPO
    const backToTopBtn = document.getElementById('back-to-top-btn');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});