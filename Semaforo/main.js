const img = document.getElementById('img')
const buttons = document.getElementById('buttons')
let colorIndex = 0
let Interval = null


function changeColor() {
    const colors = ['red', 'green', 'yellow']
    const color = colors[ colorIndex ]
    turnOn[color]()
    nextIndex()
}


const turnOn = {
    'red': () => img.src = './img/vermelho.png',
    'yellow': () => img.src = './img/amarelo.png',
    'green': () => img.src = './img/verde.png',
    'automatic': () => Interval = setInterval(changeColor, 1500)
}


const nextIndex = () =>{
    if( colorIndex < 2){
        colorIndex ++
    }else{
        colorIndex = 0
    }
}


const stopAuto = () =>{
    clearInterval(Interval)
}


const traffic = (event) =>{
    stopAuto()
    turnOn[event.target.id]()
}



buttons.addEventListener('click', traffic)



//fim