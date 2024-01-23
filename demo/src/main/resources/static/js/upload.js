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
  let contenedor = document.getElementById("cuerpoTabla");
  contenedor.innerHTML = "";

  lugares.forEach(lugar => {
    contenedor.innerHTML += mapearLugar(lugar);
  });
}

function mapearLugar(lugar) {
  return `<tr>
    <td><img src="${lugar.lugar_img}" alt="Imagen del lugar"></td>
  </tr>`;
}

// Llama a la función para obtener lugares al cargar la página, por ejemplo:
document.addEventListener("DOMContentLoaded", obtenerLugares);
