//comentario de usuario 

document.getElementById('avatar-input').addEventListener('change', function(event) {
  mostrarImagenSeleccionada(event);
});

function mostrarImagenSeleccionada(event) {
  const input = event.target;
  const reader = new FileReader();
  reader.onload = function () {
      const img = document.getElementById('preview-img');
      img.src = reader.result;
      document.querySelector('.image-preview').style.backgroundImage = 'none';
  };
  reader.readAsDataURL(input.files[0]);
}

window.onload = function() {
  const input = document.getElementById('avatar-input');
  if (input.files.length > 0) {
      mostrarImagenSeleccionada({ target: input });
  }
};

function addReview() {
  // Obtener la calificación seleccionada
  var rating = document.querySelector('input[name="rating"]:checked').value;

  // Obtener el comentario
  var comentario = document.getElementById('commentInput').value;
  var imagenurl = document.getElementById('preview-img').src;
  

  // Validar que se haya seleccionado una calificación
  if (!rating) {
      alert("Por favor, selecciona una calificación.");
      return;
  }

  // Crear un objeto para enviar al servidor
  var reseña = {
      calificacion: parseInt(rating), // Convertir a entero
      comentario: comentario,
      // Aquí puedes agregar otros campos si es necesario, como la imagen
  };

  // Realizar la solicitud HTTP POST al servidor para añadir la reseña
  fetch('/añadirLugar', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(reseña)
  })
  .then(function(response) {
      if (!response.ok) {
          throw new Error('Error al añadir la reseña.');
      }
      return response.json();
  })
  .then(function(data) {
      // Manejar la respuesta del servidor
      alert(data); // Muestra un mensaje de éxito
  })
  .catch(function(error) {
      // Manejar errores de la solicitud
      console.error('Error:', error);
      alert('Ha ocurrido un error al añadir la reseña. Por favor, inténtalo de nuevo más tarde.');
  });
}






