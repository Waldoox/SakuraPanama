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

  // Mostrar solo las primeras 5 imágenes
  lugares.slice(0, 5).forEach(lugar => {
    contenedor.innerHTML += mapearLugar(lugar);
  });
}

function mapearLugar(lugar) {
  return `<section>
    <div>
      <img src="${lugar.lugar_img}" alt="Imagen del lugar">
    </div>
  </section>`;
}

document.addEventListener("DOMContentLoaded", obtenerLugares);
