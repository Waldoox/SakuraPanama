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


// menu recomendado

var cantidadRespuestas = {};

function sumarRespuesta() {
    // Obtener la opción seleccionada
    var opcionSeleccionada = document.querySelector('input[name="opcion"]:checked');

    if (opcionSeleccionada) {
        // Verificar si ya existe la opción en el objeto cantidadRespuestas
        if (cantidadRespuestas[opcionSeleccionada.value] === undefined) {
            cantidadRespuestas[opcionSeleccionada.value] = 1;
        } else {
            // Si ya existe, incrementar la cantidad
            cantidadRespuestas[opcionSeleccionada.value]++;
        }

        // Mostrar la cantidad actualizada
        mostrarResultados();
    }
}

function agregarOpcion() {
    // Obtener el valor del nuevo radio button desde el input
    var nuevaOpcion = document.getElementById("nuevaOpcion").value.trim();

    // Verificar que el valor no esté vacío
    if (nuevaOpcion !== "") {
        // Verificar si ya existe la opción en el objeto cantidadRespuestas
        if (cantidadRespuestas[nuevaOpcion] === undefined) {
            cantidadRespuestas[nuevaOpcion] = 1;
        } else {
            // Si ya existe, incrementar la cantidad
            cantidadRespuestas[nuevaOpcion]++;
        }

        // Crear un nuevo radio button
        var nuevoRadio = document.createElement("input");
        nuevoRadio.type = "radio";
        nuevoRadio.name = "opcion";
        nuevoRadio.value = nuevaOpcion;
        nuevoRadio.onclick = sumarRespuesta;

        // Crear una etiqueta para el nuevo radio button
        var nuevaLabel = document.createElement("label");
        nuevaLabel.appendChild(nuevoRadio);
        nuevaLabel.appendChild(document.createTextNode(" " + nuevaOpcion));

        // Agregar el nuevo radio button al formulario
        document.getElementById("encuestaForm").appendChild(nuevaLabel);

        // Limpiar el campo de texto
        document.getElementById("nuevaOpcion").value = "";

        // Mostrar la cantidad actualizada
        mostrarResultados();
    } else {
        alert("Por favor, introduce un nombre para la nueva opción.");
    }
}

function mostrarResultados() {
    // Crear un nuevo elemento para mostrar la cantidad de respuestas
    var resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "<strong>Platos Preferidos de los Clientes: </strong><br>";

    // Iterar sobre las opciones y mostrar la cantidad
    for (var opcion in cantidadRespuestas) {
        resultadosDiv.innerHTML += opcion + ": " + cantidadRespuestas[opcion] + "<br>";
    }
}

/*
// sube la imagen a la pagina web del comentario de la gente 

const $fileInput = document.getElementById('image');
const $dropZone = document.getElementById('result-image');
const $img = document.getElementById('img-result');

// Función para cargar y mostrar la imagen seleccionada
const showImagePreview = (file) => {
    const fileReader = new FileReader();
    fileReader.onload = function() {
        $img.setAttribute('src', this.result);
    };
    fileReader.readAsDataURL(file);
};

// Evento para manejar la selección de archivos
$fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    showImagePreview(file);
});

// Eventos para manejar el arrastre y suelta de archivos
$dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    $dropZone.classList.add('form-file__result--active');
});

$dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    $dropZone.classList.remove('form-file__result--active');
});

$dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    $fileInput.files = e.dataTransfer.files;
    const file = $fileInput.files[0];
    showImagePreview(file);
});

// Evento para subir la imagen al servidor
const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('/images/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log('File uploaded successfully');
            return response.json();
        }
        throw new Error('File upload failed');
    })
    .then(data => {
        console.log(data);
        // Aquí puedes realizar alguna acción adicional si lo deseas
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

*/

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


//funcion de menu tambien se puede
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
  guardarPlatosPersonalizados(); // Guardamos los platos personalizados actualizados
}

// Función para agregar un nuevo plato
function agregarPlato() {
  const nuevoPlatoInput = document.getElementById('nuevoPlato');
  const nuevoPlatoNombre = nuevoPlatoInput.value;
  if (nuevoPlatoNombre.trim() !== '') {
    const nuevoPlato = { nombre: nuevoPlatoNombre, votos: 0 };
    platosPersonalizados.push(nuevoPlato);
    mostrarMenu(); // Actualizamos el menú después de agregar un nuevo plato personalizado
    guardarPlatosPersonalizados(); // Guardamos los platos personalizados actualizados
    nuevoPlatoInput.value = ''; // Limpiamos el input
  }
}

// Función para eliminar un plato personalizado
function eliminarPlatoPersonalizado(plato) {
  const index = platosPersonalizados.indexOf(plato);
  if (index !== -1) {
    platosPersonalizados.splice(index, 1);
    mostrarMenu(); // Actualizamos el menú después de eliminar el plato personalizado
    guardarPlatosPersonalizados(); // Guardamos los platos personalizados actualizados
  }
}

// Función para guardar los platos personalizados en el almacenamiento local
function guardarPlatosPersonalizados() {
  localStorage.setItem('platosPersonalizados', JSON.stringify(platosPersonalizados));
}

// Función para cargar los platos personalizados desde el almacenamiento local
function cargarPlatosPersonalizados() {
  const platosPersonalizadosString = localStorage.getItem('platosPersonalizados');
  if (platosPersonalizadosString) {
    platosPersonalizados = JSON.parse(platosPersonalizadosString);
    mostrarMenu(); // Mostramos los platos personalizados al cargar la página
  }
}

// Asignamos la función agregarPlato al evento click del botón
document.getElementById('agregarPlatoBtn').addEventListener('click', agregarPlato);

// Cargamos los platos personalizados al cargar la página
cargarPlatosPersonalizados();