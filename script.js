// script.js

document.addEventListener('DOMContentLoaded', function() {
    const menuHamburger = document.querySelector('.menu-hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    menuHamburger.addEventListener('click', () => {
        // Alterna a classe 'active' para o menu e para o ícone
        navLinks.classList.toggle('active');
        menuHamburger.classList.toggle('active');
        
        // Impede a rolagem da página quando o menu está ativo
        if (navLinks.classList.contains('active')) {
            body.classList.add('no-scroll');
        } else {
            body.classList.remove('no-scroll');
        }
    });

    // Opcional: Fechar o menu ao clicar em um link (bom para one-page sites)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuHamburger.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });
});

// =======================================================
// === FUNCIONALIDADE DO ACORDEÃO (FAQ) ===
// =======================================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const answer = item.querySelector('.faq-answer');
        const currentlyActive = item.classList.contains('active');

        // Fecha todos os outros itens abertos
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
            // Define a altura máxima com base no conteúdo da resposta
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});