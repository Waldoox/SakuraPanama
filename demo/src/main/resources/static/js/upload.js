//LUGARES
let baseUrl = "http://localhost:8080";
let lugares = [];
let articulos = [];
let eventos = [];


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
    <img src="${lugar.lugar_img.id_tipolocal=1}" >
  </div>`;
}


//ARTICULOS
function obtenerLugares() {
  // Modifica la URL para incluir el parámetro de filtrado por tipolocal
  fetch(baseUrl + '/lugares?tipolocal=2').then(res => {
    res.json().then(json => {
      articulos = json;
      imprimirLugares();
    });
  });
}
function imprimirLugares() {
  let contenedor = document.getElementById("lugar");
  contenedor.innerHTML = "";

  let lugaresAleatorios = shuffleArray(articulos).slice(0, 7);

  lugaresAleatorios.forEach(lugar => {
    contenedor.innerHTML += mapearLugar(lugar);
  });

}
function mapearLugar(lugar) {
  return `<div class="secciones" id="ariculo">
    <img src="${lugar.lugar_img}" >
  </div>`;
}


//EVENTOS
function obtenerLugares() {
  // Modifica la URL para incluir el parámetro de filtrado por tipolocal
  fetch(baseUrl + '/lugares?tipolocal=3').then(res => {
    res.json().then(json => {
      eventos = json;
      imprimirLugares();
    });
  });
}
function imprimirLugares() {
  let contenedor = document.getElementById("lugar");
  contenedor.innerHTML = "";

  let lugaresAleatorios = shuffleArray(eventos).slice(0, 7);

  lugaresAleatorios.forEach(lugar => {
    contenedor.innerHTML += mapearLugar(lugar);
  });

}
function mapearLugar(lugar) {
  return `<div class="secciones" id="evento">
    <img src="${lugar.lugar_img}" >
  </div>`;
}




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

