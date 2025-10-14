const layer1 = document.getElementById('layer1');
const layer2 = document.getElementById('layer2');

layer1.addEventListener('click', () => {
  // Añadimos clase para animar desaparición
  layer1.classList.add('r-clicked');

  // Al terminar animación, ocultamos layer1 y mostramos layer2
  layer1.addEventListener('animationend', () => {
    layer1.style.display = 'none';
    layer2.classList.add('visible');
    layer2.setAttribute('aria-hidden', 'false');
  }, {once: true});
});
