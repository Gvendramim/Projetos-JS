const uploadInput = document.getElementById('upload');
const formatSelect = document.getElementById('format');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const preview = document.getElementById('preview');
const progressBar = document.getElementById('progressBar');

async function processarImagens() {
  const files = Array.from(uploadInput.files);
  const format = formatSelect.value;
  const width = parseInt(widthInput?.value) || null;
  const height = parseInt(heightInput?.value) || null;
  const zip = new JSZip();

  if (!files.length) return alert('Selecione ao menos uma imagem.');

  preview.innerHTML = "";
  progressBar.style.display = 'block';
  progressBar.value = 0;
  progressBar.max = files.length;

  let processedCount = 0;

  const promises = files.map(file => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = function (e) {
        img.src = e.target.result;
        img.onload = function () {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = width || img.width;
          canvas.height = height || img.height;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          if (format === 'pdf') {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({ unit: 'px', format: [canvas.width, canvas.height] });
            pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 0, 0, canvas.width, canvas.height);
            pdf.save(file.name.replace(/\.[^/.]+$/, '') + '.pdf');
            processedCount++;
            progressBar.value = processedCount;
            resolve();
          } else {
            canvas.toBlob(function (blob) {
              zip.file(file.name.replace(/\.[^/.]+$/, '') + '.' + format, blob);
              const imgElement = document.createElement('img');
              imgElement.src = URL.createObjectURL(blob);
              preview.appendChild(imgElement);
              processedCount++;
              progressBar.value = processedCount;
              resolve();
            }, 'image/' + format);
          }
        };
      };

      reader.readAsDataURL(file);
    });
  });

  await Promise.all(promises);

  if (format !== 'pdf') {
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(content);
      a.download = "imagens_convertidas.zip";
      a.click();
    });
  }

  progressBar.style.display = 'none';
}
