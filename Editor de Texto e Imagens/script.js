// Editor de Texto
function formatText(command) {
  document.execCommand(command, false, null);
}

function saveText() {
  const text = document.querySelector('.editor').innerText;
  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'texto_editado.txt';
  link.click();
}

// Editor de Imagens
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imgElement = new Image();

function loadImage(event) {
  let reader = new FileReader();
  reader.onload = function () {
      imgElement.src = reader.result;
  }
  reader.readAsDataURL(event.target.files[0]);
}

imgElement.onload = function () {
  canvas.width = imgElement.width;
  canvas.height = imgElement.height;
  ctx.drawImage(imgElement, 0, 0);
}

function adjustImage() {
  const brightness = document.getElementById('brightness').value;
  const contrast = document.getElementById('contrast').value;
  const saturation = document.getElementById('saturation').value;

  ctx.filter = `brightness(${brightness}) contrast(${contrast}) saturate(${saturation})`;
  ctx.drawImage(imgElement, 0, 0);
}

function applyFilter(filter) {
  ctx.filter = filter === 'grayscale' ? 'grayscale(100%)' : 'sepia(100%)';
  ctx.drawImage(imgElement, 0, 0);
}

document.getElementById('download-btn').addEventListener('click', function() {
  const imageURL = canvas.toDataURL('image/png'); 
  const link = document.createElement('a');
  link.href = imageURL;
  link.download = 'imagem_editada.png'; 
  link.click();
});