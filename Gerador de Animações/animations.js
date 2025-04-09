document.getElementById("apply-animation").addEventListener("click", () => {
  const animationType = document.getElementById("animation-type").value;
  const duration = parseInt(document.getElementById("duration").value);
  const element = document.getElementById("animated-element");

  element.classList.remove("fadeIn", "slideIn", "rotate");
  element.classList.add(animationType);

  setTimeout(() => {
    element.classList.remove(animationType);
  }, duration);
});


document.getElementById("apply-animation").addEventListener("click", () => {
  const animationType = document.getElementById("animation-type").value;
  const duration = parseInt(document.getElementById("duration").value);
  const element = document.getElementById("animated-element");

  element.style.animationDuration = `${duration}ms`;
  element.classList.remove("fadeIn", "slideIn", "rotate");
  element.classList.add(animationType);

  setTimeout(() => {
    element.classList.remove(animationType);
  }, duration);
});

document.getElementById("copy-animation").addEventListener("click", () => {
  const animationType = document.getElementById("animation-type").value;
  const duration = document.getElementById("duration").value;

  const animationsCSS = {
    fadeIn: `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fadeIn {
  animation: fadeIn ${duration}ms ease-in-out;
}
        `,
    slideIn: `
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.slideIn {
  animation: slideIn ${duration}ms ease-out;
}
        `,
    rotate: `
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.rotate {
  animation: rotate ${duration}ms linear;
}
        `
  };

  const codeToCopy = animationsCSS[animationType].trim();

  const textarea = document.getElementById("animation-code");
  textarea.value = codeToCopy;
  textarea.select();
  document.execCommand("copy");

  alert("Código da animação copiado para a área de transferência!");
});
