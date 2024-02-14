let baseUrl = "http://localhost:8080";
let lugares = [];

function obtenerLugares(url, callback) {
  fetch(baseUrl + url)
    .then(res => {
      if (!res.ok) {
        throw new Error('Respuesta de red incorrecta');
      }
      return res.json();
    })
    .then(json => {
      lugares = json;
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
      <h3>${lugar.nombre_lugar}</h3>
      <p>Dirección: ${lugar.direccion_lugar}</p>
    </div>
  </section>`;
}

// Llamada inicial para obtener lugares
obtenerLugares('/all', () => {
  imprimirLugares('locales-container');
});
