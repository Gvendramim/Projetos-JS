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
  