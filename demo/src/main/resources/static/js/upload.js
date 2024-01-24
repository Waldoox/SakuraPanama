let baseUrl = "http://localhost:8080";
let lugares = [];

function obtenerLugares() {
  fetch(baseUrl + '/lugares').then(res => {
    res.json().then(json => {
      lugares = json;
      imprimirLugares();
    });
  });
}

function imprimirLugares() {
  let contenedor = document.getElementById("lugar");
  contenedor.innerHTML = "";

  // Mezclar aleatoriamente el array de lugares
  let lugaresAleatorios = shuffleArray(lugares).slice(0, 8);

  lugaresAleatorios.forEach(lugar => {
    contenedor.innerHTML += mapearLugar(lugar);
  });

  // Inicializar el carrusel
  iniciarCarrusel();
}

function mapearLugar(lugar) {
  return `<div class="carousel-item">
    <img src="${lugar.lugar_img}" alt="Imagen del lugar" class="d-block w-100">
  </div>`;
}

// Función para mezclar aleatoriamente un array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function iniciarCarrusel() {
  // Inicializar el carrusel utilizando Bootstrap (requiere la librería Bootstrap)
  // Asegúrate de incluir Bootstrap en tu proyecto si no lo has hecho.
  $('.carousel').carousel();
}

document.addEventListener("DOMContentLoaded", obtenerLugares);
