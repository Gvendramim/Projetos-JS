let startTime, endTime;
let imageSize = 0;
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbSpeed = document.getElementById("mbs"),
    info = document.getElementById("info");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 3;
let testCompleted = 0;
let loadingInterval;

let imageApi = "https://source.unsplash.com/500x500?nature"; 

function startLoadingAnimation() {
    let dots = "";
    loadingInterval = setInterval(() => {
        dots = dots.length < 3 ? dots + "." : "";
        info.innerHTML = `Testando${dots}`;
    }, 500);
}

function stopLoadingAnimation() {
    clearInterval(loadingInterval);
    info.innerHTML = "Teste concluído!";
}

async function startTest() {
    info.innerHTML = "Testando...";
    startLoadingAnimation();
    testCompleted = 0;
    totalBitSpeed = 0;
    totalKbSpeed = 0;
    totalMbSpeed = 0;
    runTest();
}

async function runTest() {
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
        clearInterval(loadingInterval);
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

    if (testCompleted === numTests) {
        stopLoadingAnimation();
        
        let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
        let averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
        let averageSpeedInMbps = (totalMbSpeed / numTests).toFixed(2);

        bitSpeed.innerHTML = `${averageSpeedInBps}`;
        kbSpeed.innerHTML = `${averageSpeedInKbps}`;
        mbSpeed.innerHTML = `${averageSpeedInMbps}`;
    } else {
        runTest();
    }
}

window.onload = startTest;
