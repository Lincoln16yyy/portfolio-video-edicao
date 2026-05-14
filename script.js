// Seleciona todos os links do menu que começam com '#'
const links = document.querySelectorAll('.menu a[href^="#"]');

links.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Impede o "teleporte" seco padrão do HTML

        // Pega o ID da seção de destino (ex: #projetos, #servicos)
        const destino = document.querySelector(this.getAttribute('href'));

        // Faz a tela deslizar até o destino suavemente
        window.scrollTo({
            top: destino.offsetTop - 80, // O '- 80' desconta a altura do menu fixo para ele não cobrir o título da seção
            behavior: 'smooth'
        });
    });
});

// 1. EFEITO MÁQUINA DE ESCREVER
const textoOriginal = "Transformando material bruto em histórias dinâmicas.";
const elementoTexto = document.getElementById("efeito-maquina");
let indexLetra = 0;

function digitar() {
    if (indexLetra < textoOriginal.length) {
        elementoTexto.innerHTML += textoOriginal.charAt(indexLetra);
        indexLetra++;
        setTimeout(digitar, 40); // Velocidade da digitação (40ms)
    }
}
// Começa a digitar meio segundo após o site carregar
setTimeout(digitar, 500);


// 2. ANIMAÇÃO DE SURGIMENTO (SCROLL REVEAL)
const elementosReveal = document.querySelectorAll('.reveal');

// IntersectionObserver é uma API moderna que detecta quando um elemento aparece na tela
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('active'); // Adiciona a classe que faz surgir
        }
    });
}, { threshold: 0.1 }); // Dispara quando 10% da seção aparecer na tela

// Manda o observador vigiar todas as seções com a classe .reveal
elementosReveal.forEach(elemento => {
    observador.observe(elemento);
});

function toggleFAQ(element) {
    const item = element.parentElement;
    const isActive = item.classList.contains('ativo');
    
    // Fechar todos os outros
    document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('ativo');
    });
    
    // Abrir o clicado
    if (!isActive) {
        item.classList.add('ativo');
    }
}