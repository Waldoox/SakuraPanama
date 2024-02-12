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
    var checkboxesLocal = document.querySelectorAll('input[name="local"]:checked');
    var checkboxesProvincia = document.querySelectorAll('input[name="provincia"]:checked');
    
    var valoresLocal = [];
    checkboxesLocal.forEach(function(checkbox) {
        valoresLocal.push(checkbox.value);
    });

    var valoresProvincia = [];
    checkboxesProvincia.forEach(function(checkbox) {
        valoresProvincia.push(checkbox.value);
    });
    
    // Enviar los valores al servidor
    fetch('/filtrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            local: valoresLocal,
            provincia: valoresProvincia
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Manejar la respuesta del servidor, por ejemplo, mostrar los resultados en la página
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}