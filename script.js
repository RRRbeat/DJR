document.addEventListener('DOMContentLoaded', () => {
  const portada = document.getElementById('layer1');
  const menu = document.getElementById('layer2');
  const pages = document.querySelectorAll('.page');
  const volverInicio = document.getElementById('volver-inicio');
  const languageSelect = document.getElementById('language-select');
  const clickSound = document.getElementById('clickSound');
  const transitionSound = document.getElementById('transitionSound');
  const soundToggle = document.getElementById('sound-toggle');

  let soundEnabled = true;
  let unlocked = false;

  // Traducciones
  const translations = {
    es: {
      contact: "Contacto",
      events: "Eventos",
      gallery: "Galería",
      about: "Sobre mí",
      contactTitle: "Contacto",
      contactText: "Enviame un mensaje directo:",
      name: "Tu nombre",
      email: "Tu correo",
      message: "Tu mensaje...",
      send: "Enviar",
      eventsTitle: "Eventos",
      eventsText: "Actualmente produciendo mixtapes y podcast para radio Córdoba, Argentina.",
      galleryTitle: "Galería",
      aboutTitle: "Sobre mí",
      aboutText: "Productor musical, beatmaker y DJ independiente enfocado en mixtapes y sonido urbano.",
      back: "Volver"
    },
    pt: {
      contact: "Contato",
      events: "Eventos",
      gallery: "Galeria",
      about: "Sobre mim",
      contactTitle: "Contato",
      contactText: "Envie-me uma mensagem direta:",
      name: "Seu nome",
      email: "Seu e-mail",
      message: "Sua mensagem...",
      send: "Enviar",
      eventsTitle: "Eventos",
      eventsText: "Atualmente produzindo mixtapes e podcasts para rádio em Córdoba, Argentina.",
      galleryTitle: "Galeria",
      aboutTitle: "Sobre mim",
      aboutText: "Produtor musical, beatmaker e DJ independente focado em mixtapes e som urbano.",
      back: "Voltar"
    },
    en: {
      contact: "Contact",
      events: "Events",
      gallery: "Gallery",
      about: "About me",
      contactTitle: "Contact",
      contactText: "Send me a direct message:",
      name: "Your name",
      email: "Your email",
      message: "Your message...",
      send: "Send",
      eventsTitle: "Events",
      eventsText: "Currently producing mixtapes and podcasts for a radio station in Córdoba, Argentina.",
      galleryTitle: "Gallery",
      aboutTitle: "About me",
      aboutText: "Music producer, beatmaker, and independent DJ focused on mixtapes and urban sound.",
      back: "Back"
    }
  };

  // 🔒 Desbloquear audio en primer clic
  const unlockAudio = () => {
    if (unlocked) return;
    unlocked = true;
    [clickSound, transitionSound].forEach(a => {
      a.play().then(() => {
        a.pause();
        a.currentTime = 0;
      }).catch(() => {});
    });
  };

  // 🔊 Reproducir sonidos
  const playSound = (audio) => {
    if (soundEnabled && unlocked) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  };

  // Mostrar solo un elemento (oculta los demás)
  const showOnly = (el) => {
    document.querySelectorAll('.portada, .menu, .page').forEach(e => e.classList.add('hidden'));
    el.classList.remove('hidden');
    el.classList.add('visible');
  };

  // Animación de letras del menú
  const animateMenuLetters = () => {
    menu.querySelectorAll('a').forEach((link, i) => {
      const key = link.getAttribute('data-key');
      const lang = languageSelect.value;
      link.textContent = '';
      const text = translations[lang][key];
      [...text].forEach((ch, j) => {
        const span = document.createElement('span');
        span.textContent = ch;
        span.style.display = 'inline-block';
        span.style.animation = `${j % 2 === 0 ? 'letterFloatLeft' : 'letterFloatRight'} 0.5s ease forwards`;
        span.style.animationDelay = `${(i * 0.3) + (j * 0.05)}s`;
        link.appendChild(span);
      });
    });
  };

  // 🌎 Cambiar idioma de todo el sitio (excepto portada)
  const updateLanguage = () => {
    const lang = languageSelect.value;
    localStorage.setItem('selectedLang', lang); // Guarda idioma

    animateMenuLetters();

    // Contacto
    document.querySelector('#contacto h2').textContent = translations[lang].contactTitle;
    document.querySelector('#contacto p').textContent = translations[lang].contactText;
    document.querySelector('#contact-form input[type="text"]').placeholder = translations[lang].name;
    document.querySelector('#contact-form input[type="email"]').placeholder = translations[lang].email;
    document.querySelector('#contact-form textarea').placeholder = translations[lang].message;
    document.querySelector('#contact-form button').textContent = translations[lang].send;
    document.querySelector('#contacto .back-btn').textContent = translations[lang].back;

    // Eventos
    document.querySelector('#eventos h2').textContent = translations[lang].eventsTitle;
    document.querySelector('#eventos p').textContent = translations[lang].eventsText;
    document.querySelector('#eventos .back-btn').textContent = translations[lang].back;

    // Galería
    document.querySelector('#galeria h2').textContent = translations[lang].galleryTitle;
    document.querySelector('#galeria .back-btn').textContent = translations[lang].back;

    // Sobre mí
    document.querySelector('#sobre h2').textContent = translations[lang].aboutTitle;
    document.querySelector('#sobre p').textContent = translations[lang].aboutText;
    document.querySelector('#sobre .back-btn').textContent = translations[lang].back;
  };

  // 🔁 Cargar idioma guardado
  const savedLang = localStorage.getItem('selectedLang');
  if (savedLang && translations[savedLang]) {
    languageSelect.value = savedLang;
  }

  // -------- EVENTOS --------
  portada.addEventListener('click', () => {
    unlockAudio();
    playSound(clickSound);
    showOnly(menu);
    animateMenuLetters();
  });

  menu.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    e.preventDefault();
    playSound(clickSound);
    playSound(transitionSound);
    const targetId = link.dataset.target;
    const page = document.getElementById(targetId);
    if (page) showOnly(page);
  });

  document.addEventListener('click', (e) => {
    const back = e.target.closest('.back-btn');
    if (!back) return;
    e.preventDefault();
    playSound(clickSound);
    showOnly(menu);
    animateMenuLetters();
  });

  volverInicio.addEventListener('click', () => {
    playSound(clickSound);
    playSound(transitionSound);
    showOnly(portada);
  });

  soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
  });

  languageSelect.addEventListener('change', updateLanguage);

  // 🔄 Inicializar idioma al cargar
  updateLanguage();
});
