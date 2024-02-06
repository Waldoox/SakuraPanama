let baseUrl = "http://localhost:8080";

/*MAPEO DE IMAGENES*/ 
let buscar = [];
function obtenerLugares(url, callback) {
    fetch(baseUrl + url)
        .then(res => res.json())
        .then(json => {
            buscar = json;
            callback();
        })
}
function imprimirLugares(contenedorId) {
    let contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = "";

    buscar.forEach(lugar => {  // Cambiado de "lugares" a "buscar"
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
document.addEventListener("DOMContentLoaded", function () {
    obtenerLugares('/all', function () {
        imprimirLugares('locales');
    });
});

/*FILTRO*/ 
function filtrarLugares() {
    // Obtener los valores seleccionados de los checkboxes
    let tipoEstablecimientoFiltros = obtenerValoresCheckboxes('local');
    let provinciaFiltros = obtenerValoresCheckboxes('provincia');

    // Realizar solicitud a la API con los filtros seleccionados
    fetch('/api/locales?tipoEstablecimiento=' + tipoEstablecimientoFiltros.join(',') + '&provincia=' + provinciaFiltros.join(','))
        .then(response => response.json())
        .then(data => {
            mostrarResultados(data);
        })
        .catch(error => {
            console.error('Error al filtrar lugares:', error);
        });
}

function obtenerValoresCheckboxes(nombre) {
    let checkboxes = document.querySelectorAll('input[name="' + nombre + '"]:checked');
    let valores = [];
    checkboxes.forEach(checkbox => {
        valores.push(checkbox.value);
    });
    return valores;
}

function mostrarResultados(data) {
    let contenedor = document.getElementById('locales');
    contenedor.innerHTML = "";

    data.forEach(lugar => {
        contenedor.innerHTML += `<div>${lugar.nombre}, ${lugar.direccion}</div>`;
    });
}
