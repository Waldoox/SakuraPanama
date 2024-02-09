//comentario de usuario 

const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
const currentUser = { username: 'UsuarioPrueba' };
  // Aquí obtener la información del usuario desde tu sistema de login
  

function updateRatingsAndDisplay() {
  const distribution = {};
  reviews.forEach(({ rating }) => distribution[rating] = (distribution[rating] || 0) + 1);

  document.querySelectorAll('.star').forEach((star, index) => star.textContent = `(${distribution[index + 1] || 0})`);

  const reviewsContainer = document.getElementById('reviews');
  reviewsContainer.innerHTML = reviews.map(({ id, username, rating, comment }) => {
    return `<div class="review" data-id="${id}"><strong>${username}</strong> - <strong>Puntuación: ${rating}</strong><br>${comment}
            <button onclick="deleteReview(${id})">Eliminar</button><hr></div>`;
  }).join('');
}

function handleStarClick(event) {
  const selectedRating = parseInt(event.target.getAttribute('data-rating'));
  setSelectedRating(selectedRating);
}

function setSelectedRating(rating) {
  document.querySelectorAll('.star').forEach(star => star.classList.remove('selected'));
  const selectedStar = document.querySelector(`.star[data-rating="${rating}"]`);
  if (selectedStar) {
    selectedStar.classList.add('selected');
  }
}

function deleteReview(id) {
  const index = reviews.findIndex(review => review.id === id);
  if (index !== -1) {
    reviews.splice(index, 1);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    updateRatingsAndDisplay();
  }
}

function addReview() {
  const commentInput = document.getElementById('commentInput');
  const commentText = commentInput.value.trim();
  const selectedRating = getSelectedRating();

  if (currentUser && commentText !== '' && selectedRating !== 0) {
    const newReview = { id: Date.now(), username: currentUser.username, rating: selectedRating, comment: commentText };
    reviews.push(newReview);

    localStorage.setItem('reviews', JSON.stringify(reviews));
    updateRatingsAndDisplay();

    commentInput.value = '';
    setSelectedRating(0);
  }
}

function getSelectedRating() {
  const selectedStar = document.querySelector('.star.selected');
  return selectedStar ? parseInt(selectedStar.getAttribute('data-rating')) : 0;
}

document.querySelectorAll('.star').forEach(star => star.addEventListener('click', handleStarClick));
updateRatingsAndDisplay();

//efecto estrella

const stars = document.querySelectorAll('.st');

stars.forEach(function(st,index){
  st.addEventListener('click', function(){
    for(let i=0; i<=index; i++){
      stars[i].classList.add('checked');
    }
    for(let i=index+1; i<stars.length; i++){
      stars[i].classList.remove('checked');
    }
  })
})


//efecto parallax

const bbq = document.querySelector("#bbq");
const pollito = document.querySelector("#pollito");
const bb = document.querySelector("#bb");

window.addEventListener("scroll", () => {
    let scroll = window.scrollY;

    bbq.style.bottom = scroll * -0.2 + "px";
    bbq.style.boton = scroll * 0.5 + "px";

})


//efecto carrusel




// funcion de subir imagen y que suba al carruzel 

document.addEventListener('DOMContentLoaded', function() {
  mostrarImagenesGuardadas();
});

function subirImagen() {
  const inputFile = document.getElementById('inputFile');
  const carrusel = document.getElementById('carrusel');

  const file = inputFile.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const imageUrl = event.target.result;
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    carrusel.appendChild(imageElement);

    // Guardar la imagen en el almacenamiento local
    guardarImagen(imageUrl);
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    alert('Por favor selecciona una imagen.');
  }
}

function guardarImagen(imageUrl) {
  let imagenesGuardadas = JSON.parse(localStorage.getItem('imagenes')) || [];
  imagenesGuardadas.push(imageUrl);
  localStorage.setItem('imagenes', JSON.stringify(imagenesGuardadas));
}

function mostrarImagenesGuardadas() {
  const carrusel = document.getElementById('carrusel');
  const imagenesGuardadas = JSON.parse(localStorage.getItem('imagenes')) || [];

  imagenesGuardadas.forEach(function(imageUrl) {
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    carrusel.appendChild(imageElement);
  });
}

function limpiarCarrusel() {
  localStorage.removeItem('imagenes');
  document.getElementById('carrusel').innerHTML = '';
}


//funcion de menu tambien se puede// Array para almacenar los platos de comida predefinidos
let platos = [
  { nombre: "Pizza", votos: 0 },
  { nombre: "Hamburguesa", votos: 0 },
  { nombre: "Sushi", votos: 0 }
];

// Array para almacenar los platos de comida personalizados por el usuario
let platosPersonalizados = [];

// Función para mostrar los platos en el menú
function mostrarMenu() {
  const menuDiv = document.getElementById('menu');
  menuDiv.innerHTML = ''; 
  

  platos.forEach(plato => {
    const platoDiv = crearPlatoDiv(plato);
    menuDiv.appendChild(platoDiv);
  });

  // Mostramos los platos personalizados
  platosPersonalizados.forEach(plato => {
    const platoDiv = crearPlatoDiv(plato);
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.onclick = () => {
      eliminarPlatoPersonalizado(plato);
    };
    platoDiv.appendChild(botonEliminar);
    menuDiv.appendChild(platoDiv); 
  });
}

// Función para crear un div para mostrar un plato
function crearPlatoDiv(plato) {
  const platoDiv = document.createElement('div');
  platoDiv.innerHTML = `${plato.nombre} - Votos: ${plato.votos}`;
  const botonVotar = document.createElement('button');
  botonVotar.textContent = 'Votar';
  botonVotar.onclick = () => {
    votarPorPlato(plato);
  };
  platoDiv.appendChild(botonVotar);
  return platoDiv;
}

// Función para votar por un plato
function votarPorPlato(plato) {
  plato.votos++;
  mostrarMenu(); // Actualizamos el menú después de votar
  guardarPlatos(); // Guardamos los platos actualizados
}

// Función para agregar un nuevo plato
function agregarPlato() {
  const nuevoPlatoInput = document.getElementById('nuevoPlato');
  const nuevoPlatoNombre = nuevoPlatoInput.value;
  if (nuevoPlatoNombre.trim() !== '') {
    const nuevoPlato = { nombre: nuevoPlatoNombre, votos: 0 };
    platosPersonalizados.push(nuevoPlato);
    mostrarMenu();
    guardarPlatos(); 
    nuevoPlatoInput.value = ''; 
  }
}

// Función para eliminar un plato personalizado
function eliminarPlatoPersonalizado(plato) {
  const index = platosPersonalizados.indexOf(plato);
  if (index !== -1) {
    platosPersonalizados.splice(index, 1);
    mostrarMenu(); 
    guardarPlatos(); 
  }
}

// Función para guardar los platos en el almacenamiento local
function guardarPlatos() {
  localStorage.setItem('platos', JSON.stringify(platos));
  localStorage.setItem('platosPersonalizados', JSON.stringify(platosPersonalizados));
}

// Función para cargar los platos desde el almacenamiento local
function cargarPlatos() {
  const platosString = localStorage.getItem('platos');
  const platosPersonalizadosString = localStorage.getItem('platosPersonalizados');
  if (platosString) {
    platos = JSON.parse(platosString);
  }
  if (platosPersonalizadosString) {
    platosPersonalizados = JSON.parse(platosPersonalizadosString);
  }
  mostrarMenu(); // Mostramos los platos al cargar la página
}

// Asignamos la función agregarPlato al evento click del botón
document.getElementById('agregarPlatoBtn').addEventListener('click', agregarPlato);

// Cargamos los platos al cargar la página
cargarPlatos();