let baseUrl = "http://localhost:8080";

/*MAPEO DE IMAGENES*/ 
let buscar = [];

function obtenerLugares(url, callback) {
  fetch(baseUrl + url)
    .then(res => res.json())
    .then(json => {
      buscar = buscar.concat(json); // concatenate the new data to the existing buscar array
      callback(); 
    });
}

    function imprimirLugares(contenedorId, lugaresFiltrados) {
      let contenedor = document.getElementById(contenedorId);
      contenedor.innerHTML = "";

      lugaresFiltrados.forEach(lugar => {
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
    function filtrarLugares() {
        const restaurantesCheckbox = document.getElementById('checkbox-restaurantes');
        const tiendasCheckbox = document.getElementById('checkbox-tiendas');
        const variedadesCheckbox = document.getElementById('checkbox-variedades');
        
        const lugaresFiltrados = buscar.filter(lugar => {
          if (restaurantesCheckbox.checked && lugar.tipo === 'restaurante') {
            return true;
          }
          if (tiendasCheckbox.checked && lugar.tipo === 'variedad') {
            return true;
          }
          if (variedadesCheckbox.checked && lugar.tipo === 'evento') {
            return true;
          }
          return false;
        });
        
        if (restaurantesCheckbox.checked || tiendasCheckbox.checked || variedadesCheckbox.checked) {
          imprimirLugares('lugar', lugaresFiltrados);
        } else {
          // Si no se ha seleccionado ningún filtro, mostrar todos los lugares
          imprimirLugares('lugar', buscar);
        }
      }
  
      document.addEventListener("DOMContentLoaded", function () {
        obtenerLugares('/restaurantes', function () {
          imprimirLugares('lugar', buscar);
        });
  
        obtenerLugares('/tiendas', function () {
          imprimirLugares('articulo', buscar);
        });
  
        obtenerLugares('/variedades', function () {
          imprimirLugares('evento', buscar);
        });
      });