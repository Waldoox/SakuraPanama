//LUGARES
let baseUrl = "http://localhost:8080";
let lugares = [];

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

document.addEventListener("DOMContentLoaded", function () {
  obtenerLugares('/restaurantes', function () {
    imprimirLugares('lugar');
    showSlide(currentIndex);
  });

  obtenerLugares('/tiendas', function () {
    imprimirLugares('articulo');
  });

  obtenerLugares('/variedades', function () {
    imprimirLugares('evento');
  });
});

//-----------------------CARROUSEL----------------------------------------------------

let currentIndex = 0;
let shouldUpdateCarousel = false;
let shouldUpdateCaro = false;
let shouldUpdateCarou = false;

    function showSlide(index) {
      const carousel = document.getElementById('lugar');
      const caro = document.getElementById('articulo');
      const carou = document.getElementById('evento');
      const totalItems = carousel.children.length;

      if (index >= totalItems) {
          currentIndex = 0;
      } else if (index < 0) {
          currentIndex = totalItems - 1;
      } else {
          currentIndex = index;
      }

      const translateValue = -currentIndex * 100 + '%';
      if(shouldUpdateCarousel){
        carousel.style.transform = 'translateX(' + translateValue + ')';
      }
      

      if (shouldUpdateCaro) {
        caro.style.transform = 'translateX(' + translateValue + ')';
    }

    if (shouldUpdateCarou) {
        carou.style.transform = 'translateX(' + translateValue + ')';
    }
  }

  function nextSlide() {
      showSlide(currentIndex + 1);
  }

  function prevSlide() {
      showSlide(currentIndex - 1);
  }

  function updateCarousel() {
    shouldUpdateCarousel = true;
    shouldUpdateCaro = false;
    shouldUpdateCarou = false; 
}


  function updateCaro() {
    shouldUpdateCaro = true;
    shouldUpdateCarou = false; 
    shouldUpdateCarousel = false;
}

function updateCarou() {
    shouldUpdateCaro = false; 
    shouldUpdateCarou = true;
    shouldUpdateCarousel = false;
}

  




