// script.js

document.addEventListener('DOMContentLoaded', function() {
  const menuHamburger = document.querySelector('.menu-hamburger');
  const navLinks = document.querySelector('.nav-links');

  menuHamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Opcional: Fechar o menu ao clicar em um link (bom para one-page sites)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
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