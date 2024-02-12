document.getElementById('preview-img').style.display = 'none'; // Ocultar la imagen inicialmente

  document.getElementById('avatar-input').addEventListener('change', function() {
    var input = this;
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        document.getElementById('preview-img').src = e.target.result;
        document.getElementById('preview-img').style.display = 'block'; // Vista Previa
      }

      reader.readAsDataURL(input.files[0]); // Convertir imagen a Base64
    }
  });

  function agregarLugar() {

    let nombre = document.getElementById('nombre').value;
    let tipo = document.getElementById('tipo').value;
    let direccion = document.getElementById('direccion').value;
    let provincia = document.getElementById('provincia').value;
    let descripcion = document.getElementById('descripcion').value;
    let imagenBase64 = document.getElementById('preview-img').src;
    
    let lugar = {
      nombre_lugar: nombre,
      direccion_lugar: direccion,
      descripcion: descripcion,
      lugar_img: imagenBase64,
      id_provincia: provincia,
      id_tipolocal: tipo
    };
  
    // Realizar la solicitud POST
    fetch('/añadirLugar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lugar)
    })
    .then(response => {
      if (response.ok) {
        
        alert('El lugar se ha agregado correctamente.');
      } else {
        
        alert('Ha ocurrido un error al agregar el lugar. Por favor, inténtelo de nuevo más tarde.');
      }
    })
    .catch(error => {
      console.error('Error al agregar el lugar:', error);
      alert('Ha ocurrido un error al agregar el lugar. Por favor, inténtelo de nuevo más tarde.');
    });
  }