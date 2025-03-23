// Seleção de elementos
const download = document.querySelector(".download");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const qrContainer = document.querySelector("#qr-code");
const qrText = document.querySelector(".qr-text");
const shareBtn = document.querySelector(".share-btn");
const sizes = document.querySelector(".sizes");

const defaultUrl = "#";
let colorLight = "#fff",
    colorDark = "#000",
    text = defaultUrl,
    size = 300;

dark.addEventListener("input", (e) => updateColor("dark", e.target.value));
light.addEventListener("input", (e) => updateColor("light", e.target.value));
qrText.addEventListener("input", handleQRText);
sizes.addEventListener("change", (e) => updateSize(e.target.value));
shareBtn.addEventListener("click", handleShare);

function updateColor(type, value) {
    if (type === "dark") colorDark = value;
    else if (type === "light") colorLight = value;
    generateQRCode();
}

function updateSize(value) {
    size = value;
    generateQRCode();
}

// Atualiza o texto do QR Code e gera um novo código
function handleQRText(e) {
    text = e.target.value.trim() || defaultUrl;
    generateQRCode();
}

// Gera o QR Code e atualiza o link de download
async function generateQRCode() {
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, { text, width: size, height: size, colorLight, colorDark });
    download.href = await resolveDataUrl();
}

// Converte o QR Code para base64 e retorna a URL da imagem
function resolveDataUrl() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const img = qrContainer.querySelector("img");
            if (img?.currentSrc) return resolve(img.currentSrc);

            const canvas = document.querySelector("canvas");
            resolve(canvas?.toDataURL() || "");
        }, 50);
    });
}

// Compartilha o QR Code
async function handleShare() {
    try {
        const base64url = await resolveDataUrl();
        const blob = await (await fetch(base64url)).blob();
        const file = new File([blob], "QRCode.png", { type: blob.type });

        await navigator.share({ files: [file], title: text });
    } catch {
        alert("Seu navegador não suporta compartilhamento.");
    }
}

generateQRCode();
