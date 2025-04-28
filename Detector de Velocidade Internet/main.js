document.addEventListener("DOMContentLoaded", () => {
    const info = document.getElementById("info"),
        mbSpeed = document.getElementById("mbs"),
        kbSpeed = document.getElementById("kbs"),
        bitSpeed = document.getElementById("bits"),
        restartBtn = document.getElementById("restartBtn");

    function showConnection() {
        const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (!conn) {
            info.textContent = "API de rede não suportada.";
            return;
        }

        info.textContent = "Medindo…";
        mbSpeed.textContent = "Velocidade em Mbps: –";
        kbSpeed.textContent = "Velocidade em Kbps: –";
        bitSpeed.textContent = "Velocidade em bps: –";

        setTimeout(() => {
            const downlinkMbps = conn.downlink;
            const downlinkKbps = downlinkMbps * 1024;
            const downlinkBps = downlinkKbps * 1024;

            info.textContent = "Teste concluído:";
            mbSpeed.textContent = `Velocidade em Mbps: ${downlinkMbps.toFixed(2)}`;
            kbSpeed.textContent = `Velocidade em Kbps: ${downlinkKbps.toFixed(2)}`;
            bitSpeed.textContent = `Velocidade em bps: ${downlinkBps.toFixed(2)}`;

            restartBtn.style.display = "inline-block";
        }, 300);
    }

    restartBtn.addEventListener("click", () => {
        showConnection();
    });

    showConnection();
});
