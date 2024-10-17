const currentJogador = document.querySelector(".currentPlayer");

let selected;
let Jogador = "X";

let positions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function iniciarJogo() {
  selected = Array(9).fill(null); 
  currentJogador.innerHTML = `JOGADOR DA VEZ: ${Jogador}`;

  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", fazerMovimento);
  });
}

iniciarJogo();

function fazerMovimento(e) {
  const index = e.target.getAttribute("data-i");
  if (selected[index] !== null) return; 

  e.target.innerHTML = Jogador;
  e.target.removeEventListener("click", fazerMovimento);
  selected[index] = Jogador;

  setTimeout(() => {
    verificarResultado();
  }, 100);

  Jogador = Jogador === "X" ? "O" : "X";
  currentJogador.innerHTML = `JOGADOR DA VEZ: ${Jogador}`;
}

function verificarResultado() {
  const JogadorUltimaJogada = Jogador === "X" ? "O" : "X";

  for (let pos of positions) {
    if (pos.every((item) => selected[item] === JogadorUltimaJogada)) {
      alert(`O JOGADOR '${JogadorUltimaJogada}' GANHOU!`);
      iniciarJogo();
      return;
    }
  }

  if (selected.every((item) => item !== null)) {
    alert("DEU EMPATE!");
    iniciarJogo();
  }
}
