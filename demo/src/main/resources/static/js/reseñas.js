const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

function updateRatingsAndDisplay() {
  const distribution = {};
  reviews.forEach(({ rating }) => distribution[rating] = (distribution[rating] || 0) + 1);

  document.querySelectorAll('.star').forEach((star, index) => star.textContent = `⭐ (${distribution[index + 1] || 0})`);

  const reviewsContainer = document.getElementById('reviews');
  reviewsContainer.innerHTML = reviews.map(({ id, rating, comment }) => {
    return `<div class="review" data-id="${id}"><strong>Rating: ${rating}</strong><br>${comment}
            <button onclick="deleteReview(${id})">Eliminar</button><hr></div>`;
  }).join('');
}

function handleStarClick(event) {
  const selectedRating = parseInt(event.target.getAttribute('data-rating'));
  setSelectedRating(selectedRating);  // Establecer la calificación seleccionada visualmente
}

function setSelectedRating(rating) {
  // Remover la clase 'selected' de todas las estrellas
  document.querySelectorAll('.star').forEach(star => star.classList.remove('selected'));

  // Agregar la clase 'selected' a la estrella correspondiente
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

  if (commentText !== '' && selectedRating !== 0) {
    const newReview = { id: Date.now(), rating: selectedRating, comment: commentText };
    reviews.push(newReview);

    // Guardar las calificaciones actualizadas en el localStorage
    localStorage.setItem('reviews', JSON.stringify(reviews));

    // Actualizar la visualización después de agregar una nueva opinión
    updateRatingsAndDisplay();

    // Limpiar el campo de entrada y deseleccionar la calificación
    commentInput.value = '';
    setSelectedRating(0);
  }
}

function getSelectedRating() {
  const selectedStar = document.querySelector('.star.selected');
  return selectedStar ? parseInt(selectedStar.getAttribute('data-rating')) : 0;
}

document.querySelectorAll('.star').forEach(star => star.addEventListener('click', handleStarClick));

// Actualizar la visualización al cargar la página
updateRatingsAndDisplay();

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
    resultadosDiv.innerHTML = "<strong>Cantidad de Respuestas:</strong><br>";

    // Iterar sobre las opciones y mostrar la cantidad
    for (var opcion in cantidadRespuestas) {
        resultadosDiv.innerHTML += opcion + ": " + cantidadRespuestas[opcion] + "<br>";
    }
}


// sube la imagen a la pagina web del comentario de la gente 
