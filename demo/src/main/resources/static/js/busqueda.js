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
    console.log('Se ha hecho clic en el botón "Aplicar Filtros"');
    const restaurantesCheckbox = document.getElementById('checkbox-restaurantes');
    const tiendasCheckbox = document.getElementById('checkbox-tiendas');
    const variedadesCheckbox = document.getElementById('checkbox-variedades');

    const tiposSeleccionados = [];
    if (restaurantesCheckbox.checked) tiposSeleccionados.push('Restaurante');
    if (tiendasCheckbox.checked) tiposSeleccionados.push('Tiendas');
    if (variedadesCheckbox.checked) tiposSeleccionados.push('Variedad');

    if (tiposSeleccionados.length > 0) {
        fetch('/filtrar' + tiposSeleccionados.join(','))
            .then(response => response.json())
            .then(data => {
                imprimirLugares('lugar', data);
            })
            .catch(error => console.error('Error al obtener lugares:', error));
    } else {
        // Si no se ha seleccionado ningún filtro, mostrar todos los lugares
        imprimirLugares('lugar', buscar);
    }
}

function imprimirLugar(contenedorId, lugares) {
    const contenedor = document.getElementById(contenedorId);
    // Primero, vaciamos el contenedor
    contenedor.innerHTML = '';

    // Luego, agregamos cada lugar al contenedor
    lugares.forEach(lugar => {
        const lugarElemento = document.createElement('div');
        lugarElemento.innerHTML = `
            <h3>${lugar.nombre}</h3>
            <p>Dirección: ${lugar.direccion}</p>
            <p>Descripción: ${lugar.descripcion}</p>
            <img src="${lugar.imagen}" alt="${lugar.nombre}">
        `;
        contenedor.appendChild(lugarElemento);
    });

    // Finalmente, mostramos el contenedor en la interfaz de usuario
    contenedor.style.display = 'block';
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

