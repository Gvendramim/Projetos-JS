const ligar = document.getElementById('Ligar')
const desligar = document.getElementById('Desligar')
const lamp = document.getElementById ('lamp')

function lampOn (){

    if(!snLamp() ){
        lamp.src = './img/ligada.jpg'
    } 
}

function lampOff (){

    if(!snLamp() ){
        lamp.src = './img/desligada.jpg'
    }    
}


function lampQuebrada (){
    lamp.src = './img/quebrada.jpg'
}


function snLamp(){
    return lamp.src.indexOf ('quebrada') > -1
}


ligar.addEventListener('click' , lampOn)
desligar.addEventListener('click', lampOff)
lamp.addEventListener ('mouseover' , lampOn)
lamp.addEventListener ('mouseleave' , lampOff)
lamp.addEventListener('dblclick' , lampQuebrada)