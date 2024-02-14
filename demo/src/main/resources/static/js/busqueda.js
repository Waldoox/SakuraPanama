let baseUrl = "http://localhost:8080";
let lugares = [];

document.addEventListener("DOMContentLoaded", function () {
  obtenerLugares('/all', function () {
      imprimirLugares('locales-container');
  });
});

function obtenerLugares(url, callback) {
  fetch(baseUrl + url)
      .then(res => res.json())
      .then(json => {
          lugares = json;
          callback(); 
      });
}

function imprimirLugares(contenedorId) {
  let contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = "";

  lugares.forEach(lugar => {
      contenedor.innerHTML += mapearLugar(lugar);
  });
}

function mapearLugar(lugar) {
  return `<section>
      <div>
          <img src="${lugar.lugar_img}" alt="Imagen del lugar">
          <h3>${lugar.nombre_lugar}</h3>
          <p>Dirección: ${lugar.direccion_lugar}</p>
      </div>
  </section>`;
}
