//LUGARES
let baseUrl = "http://localhost:8080";
let lugares = [];

function obtenerLugares() {
  // Modifica la URL para incluir el parámetro de filtrado por tipolocal
  fetch(baseUrl + '/lugares?tipolocal=1').then(res => {
    res.json().then(json => {
      lugares = json;
      imprimirLugares();
    });
  });
}


function imprimirLugares() {
  let contenedor = document.getElementById("lugar");
  contenedor.innerHTML = "";

  let lugaresAleatorios = shuffleArray(lugares).slice(0, 7);

  lugaresAleatorios.forEach(lugar => {
    contenedor.innerHTML += mapearLugar(lugar);
  });

}

function mapearLugar(lugar) {
  return `<div class="secciones" id="lugar">
    <img src="${lugar.lugar_img}" >
  </div>`;
}

//CARROUSEL
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function iniciarCarrusel() {
  $('.carousel').carousel();
}
document.addEventListener("DOMContentLoaded", obtenerLugares);

//BOTONES
let currentIndex = 0;

function showSlide(index) {
  const carousel = document.getElementById('lugar');
  const totalItems = carousel.children.length;

  if (index >= totalItems) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = totalItems - 1;
  } else {
    currentIndex = index;
  }

  const translateValue = -currentIndex * 100 + '%';
  carousel.style.transform = 'translateX(' + translateValue + ')';
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}



//MERCADO
let articulos = [];

function obtenerArticulos() {
    fetch(baseUrl + '/imagenesArticulos').then(res => {
        res.json().then(json => {
            articulos = json;
            imprimirArticulos();
        });
    });
}

function imprimirArticulos() {
    let contenedor = document.getElementById("articulos");
    contenedor.innerHTML = "";

    articulos.forEach(articulo => {
        contenedor.innerHTML += mapearArticulo(articulo);
    });
}

function mapearArticulo(imagen) {
    return `<div class="secciones" id="mercado">
        <img src="${imagen}" alt="Imagen del artículo">
    </div>`;
}

// Función para cargar las imágenes al cargar la página
window.onload = function() {
    obtenerArticulos();
};