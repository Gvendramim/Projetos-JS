let startTime, endTime;
let imageSize = 0;
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbSpeed = document.getElementById("mbs"),
    info = document.getElementById("info"),
    progressBar = document.querySelector(".progress"),
    restartBtn = document.getElementById("restartBtn");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 5;
let testCompleted = 0;
let loadingInterval;
let countdown = 5;

function startLoadingAnimation() {
    countdown = 5;
    loadingInterval = setInterval(() => {
        info.innerHTML = `Testando... (${countdown}s)`;
        countdown--;

        if (countdown < 0) {
            clearInterval(loadingInterval);
        }
    }, 1000);
}

function stopLoadingAnimation() {
    clearInterval(loadingInterval);
    info.innerHTML = "Teste concluído!";
    restartBtn.style.display = "inline-block"; 
}

async function startTest() {
    info.innerHTML = "Iniciando teste...";
    restartBtn.style.display = "none";
    testCompleted = 0;
    totalBitSpeed = 0;
    totalKbSpeed = 0;
    totalMbSpeed = 0;
    progressBar.style.width = "0%";
    runTest();
}

async function runTest() {
    startLoadingAnimation();
    try {
        let response = await fetch(imageApi, { method: "HEAD" });
        imageSize = Number(response.headers.get("content-length"));

        if (!imageSize) {
            throw new Error("Erro ao obter o tamanho da imagem.");
        }

        startTime = new Date().getTime();
        image.src = `${imageApi}&t=${new Date().getTime()}`;
    } catch (error) {
        info.innerHTML = "Erro ao carregar imagem.";
        console.error(error);
    }
}

image.onload = function () {
    endTime = new Date().getTime();
    calculateSpeed();
};

function calculateSpeed() {
    let timeDuration = (endTime - startTime) / 1000;
    let loadedBits = imageSize * 8;
    let speedInBts = loadedBits / timeDuration;
    let speedInKbs = speedInBts / 1024;
    let speedInMbs = speedInKbs / 1024;

    totalBitSpeed += speedInBts;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    testCompleted++;
    updateProgress();

    if (testCompleted === numTests) {
        stopLoadingAnimation();
        
        let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
        let averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
        let averageSpeedInMbps = (totalMbSpeed / numTests).toFixed(2);

        bitSpeed.innerHTML = `${averageSpeedInBps} bps`;
        kbSpeed.innerHTML = `${averageSpeedInKbps} kbps`;
        mbSpeed.innerHTML = `${averageSpeedInMbps} Mbps`;
    } else {
        runTest();
    }
}

function updateProgress() {
    let progressPercent = (testCompleted / numTests) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

restartBtn.addEventListener("click", startTest);

window.onload = startTest;
