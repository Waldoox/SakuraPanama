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
    <a href="/detalle_local?id=${lugar.id_lugar}"><img src="${lugar.lugar_img}" alt="Imagen del lugar"></a>
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

//sistema de busqueda
function search(){
  const { value } = document.getElementById("searchInput")
  console.log('searching', value)

  location.replace(baseUrl + '/busqueda?query=' + encodeURIComponent(value))

    
  }