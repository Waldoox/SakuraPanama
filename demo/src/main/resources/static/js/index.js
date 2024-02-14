//LUGARES
let baseUrl = "http://localhost:8080";
let lugares = [];
let totalCantidad = 0;

function obtenerLugares(url, callback) {
  fetch(baseUrl + url)
    .then(res => res.json())
    .then(json => {
      lugares = json;
      totalCantidad += lugares.length;
      localStorage.setItem('totalCantidad', totalCantidad);

      // guardar la cantidad de cada tipo
      localStorage.setItem(url, lugares.length);
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
    </div>
  </section>`;
}

document.addEventListener("DOMContentLoaded", function () {
  obtenerLugares('/restaurantes', function () {
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
// Carrusel para la sección de restaurantes
let restaurantesIndex = 0;

function showRestauranteSlide(index) {
  const restauranteCarousel = document.getElementById('restaurante-carousel');
  const totalRestauranteItems = restauranteCarousel.children.length;

  if (index >= totalRestauranteItems) {
    restaurantesIndex = 0;
  } else if (index < 0) {
    restaurantesIndex = totalRestauranteItems - 1;
  } else {
    restaurantesIndex = index;
  }

  const translateValue = -restaurantesIndex * 100 + '%';
  restauranteCarousel.style.transform = 'translateX(' + translateValue + ')';
}

function nextRestauranteSlide() {
  showRestauranteSlide(restaurantesIndex + 1);
}

function prevRestauranteSlide() {
  showRestauranteSlide(restaurantesIndex - 1);
}

// Carrusel para la sección de tiendas
let tiendasIndex = 0;

function showTiendaSlide(index) {
  const tiendaCarousel = document.getElementById('tienda-carousel');
  const totalTiendaItems = tiendaCarousel.children.length;

  if (index >= totalTiendaItems) {
    tiendasIndex = 0;
  } else if (index < 0) {
    tiendasIndex = totalTiendaItems - 1;
  } else {
    tiendasIndex = index;
  }

  const translateValue = -tiendasIndex * 100 + '%';
  tiendaCarousel.style.transform = 'translateX(' + translateValue + ')';
}

function nextTiendaSlide() {
  showTiendaSlide(tiendasIndex + 1);
}

function prevTiendaSlide() {
  showTiendaSlide(tiendasIndex - 1);
}

// Carrusel para la sección de eventos/variedades
let eventosIndex = 0;

function showEventoSlide(index) {
  const eventoCarousel = document.getElementById('evento-carousel');
  const totalEventoItems = eventoCarousel.children.length;

  if (index >= totalEventoItems) {
    eventosIndex = 0;
  } else if (index < 0) {
    eventosIndex = totalEventoItems - 1;
  } else {
    eventosIndex = index;
  }

  const translateValue = -eventosIndex * 100 + '%';
  eventoCarousel.style.transform = 'translateX(' + translateValue + ')';
}

function nextEventoSlide() {
  showEventoSlide(eventosIndex + 1);
}

function prevEventoSlide() {
  showEventoSlide(eventosIndex - 1);
}
// Después de la carga del documento
$(document).ready(function(){
  iniciarCarrusel();
});
function iniciarCarrusel() {
  console.log('Inicializando el carrusel');
  $('.carousel').slick();
}
function redireccionPerfil() {
  const perfilLink = document.getElementById("perfil-link");
  const token = localStorage.getItem("jwtToken");

  if (token) {
      // Decodificar el token para obtener el rol del usuario
      const decodedToken = decodeToken(token);
      const rol = decodedToken.rol;

      // Redireccionar según el rol del usuario
      if (rol === "ADMIN") {
          perfilLink.href = "/perfilAdmin";
      } else if (rol === "USER") {
          perfilLink.href = "/perfil";
      }
      
  } else {
      window.location.href = "/inicio";
  }
}

function decodeToken(token) {
  const tokenParts = token.split(".");
  const payload = JSON.parse(atob(tokenParts[1]));
  return payload;
}

function logout() {
  const logoutLink = document.getElementById("logout-link");
  
  logoutLink.addEventListener("click", function() {
      localStorage.removeItem("jwtToken");
      window.location.href = "/index";
  });
}