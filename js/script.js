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
let fin = null;
let indexArray = null;
let botClic = null;
const btnAceptar = document.getElementById("aceptar");
const modal = document.getElementById("myModal");
const resultado = document.getElementById("resultado");

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
  fin = false;
}

function updateCasillas() {
  // recorro cada linea de combinacion
  for (let i = 0; i < combinaciones.length; i++) {
    let linea = [];
    // recorro cada td por linea de combinacion y añado a linea
    for (let j = 0; j < combinaciones[i].length; j++) {
      linea.push(combinaciones[i][j]);
    }

    let l0 = linea[0].textContent;
    let l1 = linea[1].textContent;
    let l2 = linea[2].textContent;
    //si hay 3 coincidencias
    if (l0 === l1 && l1 === l2 && l0 !== "") {
      fin = true;

      if (linea[0].textContent === "X") {
        eventModal("block", "¡Has ganado!");
        linea[0].style.backgroundColor = "green";
        linea[1].style.backgroundColor = "green";
        linea[2].style.backgroundColor = "green";
      } else if (linea[0].textContent === "O") {
        eventModal("block", "¡Has perdido!", 750);
        linea[0].style.backgroundColor = "red";
        linea[1].style.backgroundColor = "red";
        linea[2].style.backgroundColor = "red";
      }
    }
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
    console.log("time");
  }, time);
}

// **************EJECUCION**************
//recorro los td
td.forEach((element) => {
  // clic en alguna casilla
  element.addEventListener("click", () => {
    console.log("pre: " + items.length);

    // USER: si quedan huecos y no hay fin
    if (items.length > 0 && !fin) {
      element.style.color = "black";
      element.style.pointerEvents = "none";
      items = items.filter((item) => item !== element.id); // Eliminar el id clicado de items
      element.textContent = "X";
      updateCasillas();
    }

    // BOT: si quedan huecos y no hay fin
    if (items.length > 0 && !fin) {
      indexArray = Math.floor(Math.random() * items.length);
      botClic = document.getElementById(items[indexArray]);
      botClic.style.color = "blue";
      botClic.style.pointerEvents = "none";
      items = items.filter((item) => item !== botClic.id); // Eliminar el id del bot de items
      botClic.textContent = "O";
      updateCasillas();
    }
    console.log(fin);
    // si no quedan huecos y hay fin
    if (items.length === 0 && !fin) {
      eventModal("block", "¡Has empatado!");
    }

    console.log("post: " + items.length);
    console.log("------------");
  });
});

// modal, clic en "Aceptar"
btnAceptar.addEventListener("click", function () {
  eventModal("none", "");
  resetCasillas();
  items = [];
  addItems();
});

addItems();

// revisar ganar en el último clic
