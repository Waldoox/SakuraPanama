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
    fetch('/api/resenas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newReview)
    })
      .then(response => response.json())
      .then(data => {
        // Manejar la respuesta del servidor si es necesario
        // Por ejemplo, actualizar la interfaz de usuario con la nueva reseña
        updateRatingsAndDisplay();
      })
      .catch(error => {
        console.error('Error:', error);
      });
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

stars.forEach(function (st, index) {
  st.addEventListener('click', function () {
    for (let i = 0; i <= index; i++) {
      stars[i].classList.add('checked');
    }
    for (let i = index + 1; i < stars.length; i++) {
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

document.addEventListener('DOMContentLoaded', function () {
  mostrarImagenesGuardadas();
});

async function subirImagen(file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const base64Image = await getBase64(file); // Convertir la imagen a Base64
    formData.append('base64Image', base64Image);

    const response = await fetch('/subir-imagen', {
      method: 'POST',
      body: formData
    });
    const data = await response.text();
    alert(data); // Muestra un mensaje de éxito
    mostrarImagenesGuardadas(); // Actualiza las imágenes mostradas después de subir una nueva
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    alert('Error al subir la imagen. Por favor, inténtalo de nuevo.');
  }
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]); // Devuelve el contenido base64 sin la metadata
    reader.onerror = error => reject(error);
  });
}

function mostrarImagenesGuardadas() {
  const carrusel = document.getElementById('carrusel');
  carrusel.innerHTML = ''; // Limpiar el carrusel antes de agregar las imágenes

  fetch('/imagenes')
    .then(response => response.json())
    .then(data => {
      data.forEach(imagen => {
        const imageElement = document.createElement('img');
        imageElement.src = imagen.imagenurl;
        carrusel.appendChild(imageElement);
      });
    })
    .catch(error => console.error('Error al obtener las imágenes:', error));
}

function limpiarCarrusel() {
  fetch('/eliminar-imagen')
    .then(response => response.text())
    .then(data => {
      alert(data); // Muestra un mensaje de éxito
      document.getElementById('carrusel').innerHTML = ''; // Limpiar el carrusel después de eliminar las imágenes
    })
    .catch(error => console.error('Error al limpiar el carrusel:', error));
}


//funcion de menu tambien se puede// Array para almacenar los platos de comida predefinidos
// Array para almacenar los platos de comida predefinidos
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
  menuDiv.innerHTML = ''; // Limpiamos el contenido anterior

  // Mostramos los platos predefinidos
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
    menuDiv.appendChild(platoDiv); // Agregar debajo de los platos predefinidos
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
    mostrarMenu(); // Actualizamos el menú después de agregar un nuevo plato personalizado
    guardarPlatos(); // Guardamos los platos actualizados
    nuevoPlatoInput.value = ''; // Limpiamos el input
  }
}

// Función para eliminar un plato personalizado
function eliminarPlatoPersonalizado(plato) {
  const index = platosPersonalizados.indexOf(plato);
  if (index !== -1) {
    platosPersonalizados.splice(index, 1);
    mostrarMenu(); // Actualizamos el menú después de eliminar el plato personalizado
    guardarPlatos(); // Guardamos los platos actualizados
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


//pruba

document.addEventListener('DOMContentLoaded', function () {
  mostrarImagenesGuardadas();
});

async function subirImagen(file, idLugar) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`/api/resenas/subir-imagen/${idLugar}`, {
      method: 'POST',
      body: formData
    });
    const data = await response.text();
    alert(data); // Muestra un mensaje de éxito
    mostrarImagenesGuardadas(); // Actualiza las imágenes mostradas después de subir una nueva
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    alert('Error al subir la imagen. Por favor, inténtalo de nuevo.');
  }
}

function addReview(idLugar) {
  const commentInput = document.getElementById('commentInput');
  const commentText = commentInput.value.trim();
  const selectedRating = getSelectedRating();

  if (commentText === '' || selectedRating === 0) {
    alert('Por favor, completa el comentario y la puntuación.');
    return;
  }

  const fileInput = document.getElementById('inputFile');
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append('file', file);

  const review = {
    comment: commentText,
    rating: selectedRating
  };

  // Subir la imagen y luego agregar la reseña
  subirImagen(file, idLugar).then(() => {
    fetch(`/api/resenas/${idLugar}/agregar-resena`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    })
    .then(response => {
      if (response.ok) {
        alert('La reseña se ha agregado correctamente.');
      } else {
        alert('Ha ocurrido un error al agregar la reseña. Por favor, inténtalo de nuevo más tarde.');
      }
    })
    .catch(error => {
      console.error('Error al agregar la reseña:', error);
      alert('Ha ocurrido un error al agregar la reseña. Por favor, inténtalo de nuevo más tarde.');
    });
  });
}
