let baseUrl = "http://localhost:8080";
let buscar = [];

function obtenerLugares(url, callback) {
  fetch(baseUrl + url)
    .then(res => res.json())
    .then(json => {
      buscar = json;
      callback(); 
    })
    .catch(error => {
      console.error('Error al obtener lugares:', error);
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
      <h3>${lugar.nombre}</h3>
      <p>Dirección: ${lugar.direccion}</p>
    </div>
  </section>`;
}

// Llamada inicial para obtener lugares
obtenerLugares('/lugares', () => {
  imprimirLugares('locales-container');
});
