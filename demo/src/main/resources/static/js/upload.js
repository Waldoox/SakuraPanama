//LUGARES
let baseUrl = "http://localhost:8080";
let lugares = [];

function obtenerLugares(url, callback) {
  fetch(baseUrl + url)
    .then(res => res.json())
    .then(json => {
      lugares = json;
      callback(); // Llamamos a la función de callback después de obtener los lugares
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
    </div>
  </section>`;
}

document.addEventListener("DOMContentLoaded", function () {
  obtenerLugares('/all', function () {
    imprimirLugares('lugar');
  });

  obtenerLugares('/tiendas', function () {
    imprimirLugares('articulo');
  });

  obtenerLugares('/variedades', function () {
    imprimirLugares('evento');
  });
});

//-----------------------CARROUSEL----------------------------------------------------
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

