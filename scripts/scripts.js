let botonVerMas = document.getElementById("botonVerMas");
let verMas = document.getElementById("verMas");

botonVerMas.addEventListener("click", toggleText);

function toggleText() {
  verMas.classList.toggle("mostrar");

  if (verMas.classList.contains("mostrar")) {
    botonVerMas.innerHTML = "ver menos categorias";
  } else {
    botonVerMas.innerHTML = "Ver mas categorias";
  }
}

let botonVerMasUno = document.getElementById("botonVerMasUno");
let verMasUno = document.getElementById("verMasUno");

botonVerMasUno.addEventListener("click", toggleText);

function toggleText() {
  verMasUno.classList.toggle("mostrar");

  if (verMasUno.classList.contains("mostrar")) {
    botonVerMasUno.innerHTML = "ver menos";
  } else {
    botonVerMasUno.innerHTML = "Ver mas";
  }
}
