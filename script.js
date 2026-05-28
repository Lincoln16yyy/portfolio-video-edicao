// Seleciona todos os links do menu que começam com '#'
const links = document.querySelectorAll('.menu a[href^="#"]');

links.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const destino = document.querySelector(targetId);

        if (destino) {
            window.scrollTo({
                top: destino.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// 1. EFEITO MÁQUINA DE ESCREVER (Refinado)
const textoOriginal = "Transformando material bruto em histórias dinâmicas.";
const elementoTexto = document.getElementById("efeito-maquina");
let indexLetra = 0;

function digitar() {
    if (elementoTexto && indexLetra < textoOriginal.length) {
        elementoTexto.innerHTML += textoOriginal.charAt(indexLetra);
        indexLetra++;
        setTimeout(digitar, 40);
    }
}
setTimeout(digitar, 500);


// 2. ANIMAÇÃO DE SURGIMENTO (SCROLL REVEAL)
const elementosReveal = document.querySelectorAll('.reveal');

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

elementosReveal.forEach(elemento => {
    observador.observe(elemento);
});

// 3. FAQ TOGGLE (Com Acessibilidade)
function toggleFAQ(button) {
    const item = button.parentElement;
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    // Fechar todos os outros
    document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('ativo');
        el.querySelector('.faq-pergunta').setAttribute('aria-expanded', 'false');
    });
    
    // Abrir/Fechar o clicado
    if (!isExpanded) {
        item.classList.add('ativo');
        button.setAttribute('aria-expanded', 'true');
    }
}

// 4. COPIAR EMAIL
function copiarEmail() {
    const email = "kakuoriginal2@gmail.com";
    const btn = document.querySelector('.btn-copiar');
    
    navigator.clipboard.writeText(email).then(() => {
        const originalIcon = btn.innerHTML;
        btn.innerHTML = "✅";
        btn.classList.add('sucesso');
        
        setTimeout(() => {
            btn.innerHTML = originalIcon;
            btn.classList.remove('sucesso');
        }, 2000);
    }).catch(err => {
        console.error('Erro ao copiar: ', err);
    });
}

// 5. CARREGAR VÍDEOS AO CLICAR (Performance)
document.querySelectorAll('.video-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', function() {
        const videoId = this.getAttribute('data-video-id');
        const iframe = document.createElement('iframe');
        
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '100%');
        iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen', 'true');
        
        this.innerHTML = '';
        this.appendChild(iframe);
    });
});

// 6. BARRA DE PROGRESSO & BOTÃO VOLTAR AO TOPO & SCROLL SPY
const progressBar = document.getElementById('scroll-progress');
const backToTopBtn = document.getElementById('back-to-top');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.menu a');

window.addEventListener('scroll', () => {
    // Barra de progresso
    const windowScroll = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    if (progressBar) progressBar.style.width = scrolled + "%";

    // Botão Voltar ao Topo
    if (windowScroll > 500) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }

    // Scroll Spy (Menu Ativo)
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (windowScroll >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((a) => {
        a.classList.remove("active");
        if (a.getAttribute("href").includes(current)) {
            a.classList.add("active");
        }
    });
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 7. ANIMAÇÃO DE NÚMEROS (CONTADORES)
const numerosSection = document.getElementById('numeros');
const contadores = document.querySelectorAll('.contagem');
let animado = false;

function iniciarContagem() {
    contadores.forEach(contador => {
        const alvo = +contador.getAttribute('data-target');
        const incremento = alvo / 50; // Velocidade da animação

        const atualizarContador = () => {
            const valorAtual = +contador.innerText;
            if (valorAtual < alvo) {
                contador.innerText = Math.ceil(valorAtual + incremento);
                setTimeout(atualizarContador, 30);
            } else {
                contador.innerText = alvo;
            }
        };
        atualizarContador();
    });
}

// Observador para disparar os números quando a seção aparecer
const observadorNumeros = new IntersectionObserver((entradas) => {
    if (entradas[0].isIntersecting && !animado) {
        iniciarContagem();
        animado = true;
    }
}, { threshold: 0.5 });

if (numerosSection) observadorNumeros.observe(numerosSection);

// 8. FEEDBACK DO FORMULÁRIO
const formulario = document.querySelector('.contato-form form');
if (formulario) {
    formulario.addEventListener('submit', function() {
        const btn = this.querySelector('.botao-enviar');
        btn.innerHTML = "Enviando...";
        btn.classList.add('enviando');
    });
}