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

    if (restaurantesCheckbox.checked) {
        // Hacer la solicitud AJAX para obtener restaurantes
        fetch('/filtrar') // Esta ruta debe coincidir con la ruta definida en tu controlador de Spring Boot
            .then(response => response.json())
            .then(data => {
                let lugaresFiltrados = data;
                if (restaurantesCheckbox.checked) {
                    // Filtrar por tiendas si está marcado el checkbox
                    lugaresFiltrados = lugaresFiltrados.filter(lugar => lugar.tipo === 'restaurante');
                }
                if (tiendasCheckbox.checked) {
                    // Filtrar por tiendas si está marcado el checkbox
                    lugaresFiltrados = lugaresFiltrados.filter(lugar => lugar.tipo === 'tienda');
                }
                if (variedadesCheckbox.checked) {
                    // Filtrar por variedades si está marcado el checkbox
                    lugaresFiltrados = lugaresFiltrados.filter(lugar => lugar.tipo === 'variedad');
                }

                imprimirLugares('lugar', lugaresFiltrados);
            })
            .catch(error => console.error('Error al obtener restaurantes:', error));
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