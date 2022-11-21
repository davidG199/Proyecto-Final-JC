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

