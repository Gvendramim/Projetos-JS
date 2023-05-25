const currentJogador = document.querySelector(".currentPlayer");

let selected;
let Jogador = "X";

let positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function Jogo() {
  selected = [];

  currentJogador.innerHTML = `JOGADOR DA VEZ: ${Jogador}`;

  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", newMove);
  });
}

Jogo();

function newMove(e) {
  const index = e.target.getAttribute("data-i");
  e.target.innerHTML = Jogador;
  e.target.removeEventListener("click", newMove);
  selected[index] = Jogador;

  setTimeout(() => {
    check();
  }, [100]);

  Jogador = Jogador === "X" ? "O" : "X";
  currentJogador.innerHTML = `JOGADOR DA VEZ: ${Jogador}`;
}

function check() {
  let JogadorLastMove = Jogador === "X" ? "O" : "X";

  const items = selected
    .map((item, i) => [item, i])
    .filter((item) => item[0] === JogadorLastMove)
    .map((item) => item[1]);

  for (pos of positions) {
    if (pos.every((item) => items.includes(item))) {
      alert("O JOGADOR '" + JogadorLastMove + "' GANHOU!");
      Jogo();
      return;
    }
  }

  if (selected.filter((item) => item).length === 9) {
    alert("DEU EMPATE!");
    Jogo();
    return;
  }
}