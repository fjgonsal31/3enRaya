// **************VARIABLES**************

let td = Array.from(document.getElementsByClassName("td"));
let items = [];
const a1 = document.getElementById("a1");
const a2 = document.getElementById("a2");
const a3 = document.getElementById("a3");
const b1 = document.getElementById("b1");
const b2 = document.getElementById("b2");
const b3 = document.getElementById("b3");
const c1 = document.getElementById("c1");
const c2 = document.getElementById("c2");
const c3 = document.getElementById("c3");
const combinaciones = [
  [a1, a2, a3],
  [b1, b2, b3],
  [c1, c2, c3],
  [a1, b1, c1],
  [a2, b2, c2],
  [a3, b3, c3],
  [a1, b2, c3],
  [a3, b2, c1],
];
let end = null;
let indexArray = null;
let botClic = null;
const btnAceptar = document.getElementById("aceptar");
const modal = document.getElementById("myModal");
const resultado = document.getElementById("resultado");
let count = 0;
let marcador = document.getElementById("marcador");
let botWin = 0;
let userWin = 0;
let nombreJug = prompt("¿Cómo te llamas?");

// **************FUNCIONES**************

function addItems() {
  td.forEach((element) => {
    items.push(element.id);
  });
}

function resetCasillas() {
  td.forEach((element) => {
    element.textContent = "";
    element.style.backgroundColor = "";
    element.style.pointerEvents = "auto";
  });
  end = false;
}

function updateTable() {
  for (let i = 0; i < combinaciones.length; i++) {
    let linea = combinaciones[i];
    let l0 = linea[0].textContent;
    let l1 = linea[1].textContent;
    let l2 = linea[2].textContent;

    if (l0 === l1 && l1 === l2 && l0 !== "") {
      end = true;

      if (l0 === "X") {
        eventModal("block", "¡Has ganado!", 750);
        linea.forEach((cell) => (cell.style.backgroundColor = "green"));
        userWin++;
      } else if (l0 === "O") {
        eventModal("block", "¡Has perdido!", 750);
        linea.forEach((cell) => (cell.style.backgroundColor = "red"));
        botWin++;
      }
      showMarcador(nombreJug, userWin, botWin);
      return;
    }
  }

  // Verificar empate si no hay fin y no hay celdas vacías
  if (items.length === 0 && !end) {
    eventModal("block", "¡Has empatado!", 750);
  }
}

function eventModal(display = "", text = "", time = 0) {
  td.forEach((element) => {
    element.style.pointerEvents = "none";
  });
  setTimeout(() => {
    if (display !== "") {
      modal.style.display = display;
    }
    if (text !== "") {
      resultado.textContent = text;
    }
  }, time);
}

// Iniciar el juego
function initGame() {
  resetCasillas();
  items = [];
  addItems();

  if (count % 2 === 0) {
    playTurn();
  } else {
    botPlay();
  }
}

// Turno del usuario
function playTurn() {
  td.forEach((element) => {
    if (element.textContent === "") {
      element.style.pointerEvents = "auto";
    }
  });
}

// Turno del bot
function botPlay() {
  if (items.length === 0) return; // No hacer nada si no hay celdas vacías

  indexArray = Math.floor(Math.random() * items.length);
  botClic = document.getElementById(items[indexArray]);
  botClic.style.color = "blue";
  botClic.style.pointerEvents = "none";
  botClic.textContent = "O";
  items = items.filter((item) => item !== botClic.id); // Eliminar el id del bot de items
  updateTable();

  if (!end && items.length > 0) {
    playTurn(); // Ahora es el turno del usuario
  }
}

function showMarcador(user, cont1, cont2) {
  marcador.textContent = `${user}: ${cont1} - ${cont2} :BOTin`;
}

// **************EJECUCION**************

if (nombreJug) {
  nombreJug = nombreJug.slice(0, 20);
} else {
  nombreJug = "User";
}

btnAceptar.addEventListener("click", () => {
  count++;
  eventModal("none", "");
  initGame();
});

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
    count++;
    eventModal("none", "");
    initGame();
  }
};

// clic en cada celda
td.forEach((element) => {
  element.addEventListener("click", () => {
    if (items.length > 0 && !end && element.textContent === "") {
      element.style.color = "black";
      element.style.pointerEvents = "none";
      items = items.filter((item) => item !== element.id); // Eliminar el id clicado de items
      element.textContent = "X";
      updateTable();
      if (!end && items.length > 0) {
        botPlay();
      }
    }
  });
});

showMarcador(nombreJug, userWin, botWin);
addItems();
initGame();
