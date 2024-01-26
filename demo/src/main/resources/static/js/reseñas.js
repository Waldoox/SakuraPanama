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

window.addEventListener("scroll", () => {
    let scroll = window.scrollY;

    bbq.style.bottom = scroll * 0.5 + "px";

})

// sube la imagen a la pagina web del comentario de la gente 
