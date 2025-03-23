const preview = document.getElementById("preview");
const styles = document.getElementById("styles");
const copyButton = document.getElementById("copy-styles");
const ranges = document.querySelectorAll(".settings input");


ranges.forEach((slider) => slider.addEventListener("input", generateStyles));
function generateStyles() {
    const getValue = (id) => document.getElementById(id).value;
    const xShadow = getValue("x-shadow"),
        yShadow = getValue("y-shadow"),
        blurRadius = getValue("blur-r"),
        spreadRadius = getValue("spread-r"),
        shadowColor = getValue("shadow-color"),
        shadowOpacity = getValue("shadow-opacity"),
        borderRadius = getValue("border-r"),
        shadowInset = document.getElementById("inset-shadow").checked;

    const boxShadow = `${shadowInset ? "inset " : ""}${xShadow}px ${yShadow}px ${blurRadius}px ${spreadRadius}px ${hexToRgba(shadowColor, shadowOpacity)}`;

    Object.assign(preview.style, {
        boxShadow,
        borderRadius: `${borderRadius}px`,
    });

    styles.textContent = `box-shadow: ${boxShadow};\nborder-radius: ${borderRadius}px;`;
}

function hexToRgba(hex, opacity) {
    const [r, g, b] = hex.match(/\w\w/g).map((c) => parseInt(c, 16));
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function copyStyles() {
    navigator.clipboard.writeText(styles.textContent).then(() => {
        copyButton.innerText = "Copiado!";
        setTimeout(() => (copyButton.innerText = "Copiar estilos"), 1000);
    });
}

copyButton.addEventListener("click", copyStyles);

generateStyles();
