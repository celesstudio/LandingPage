// ===== Header: fondo al hacer scroll =====
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Menú móvil =====
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});
nav.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.classList.remove('open');
  })
);

// ===== Reveal al hacer scroll =====
const revealEls = document.querySelectorAll('.section__head, .about__text, .stat, .card, .project, .mindset__card, .mindset__divider, .growth__item, .cta__inner, .hero__inner');
revealEls.forEach(el => el.setAttribute('data-reveal', ''));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ===== Formulario de contacto =====
const CONTACT_EMAIL = 'celescoding@gmail.com';
const form = document.getElementById('subscribeForm');
const email = document.getElementById('email');
const msg = document.getElementById('formMsg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = email.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  if (!valid) {
    msg.textContent = 'Por favor ingresa un correo válido.';
    msg.className = 'cta__msg err';
    return;
  }
  // No hay backend: se abre la ventana de redacción de Gmail en una pestaña nueva.
  // Se evita mailto: porque queda en silencio si el sistema no tiene gestor asociado.
  const asunto = encodeURIComponent('Nuevo proyecto — contacto desde la web');
  const cuerpo = encodeURIComponent(
    `Hola Celes:\n\nQuiero contaros sobre mi proyecto.\n\nMi correo: ${value}\n\n`
  );
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${asunto}&body=${cuerpo}`;
  const tab = window.open(gmail, '_blank', 'noopener');

  if (tab) {
    msg.textContent = 'Abriendo Gmail en una pestaña nueva…';
    msg.className = 'cta__msg ok';
    form.reset();
  } else {
    // El navegador bloqueó la pestaña emergente: se ofrece el correo para copiar.
    msg.textContent = 'Permite las ventanas emergentes o escríbenos a ' + CONTACT_EMAIL;
    msg.className = 'cta__msg err';
  }
});

// ===== Año dinámico en el footer =====
document.getElementById('year').textContent = new Date().getFullYear();
