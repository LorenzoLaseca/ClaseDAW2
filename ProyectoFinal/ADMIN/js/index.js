document.addEventListener("DOMContentLoaded",function(){


  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada
  
    // Obtener los valores de los campos del formulario
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
  
    // Realizar la autenticación
    authenticateUser(email, pass);
  });
  
  function authenticateUser(email, pass) {
    // Realizar una solicitud a tu API para autenticar al usuario.
    // Puedes usar fetch() para enviar una solicitud POST con los datos de inicio de sesión al endpoint correspondiente.
  
    fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, pass })
    })
      .then(response => response.json())
      .then(data => {
        // Manejar la respuesta de la API después de realizar la autenticación.
        if (data.error) {
          // Manejar el error de autenticación
          alert(data.error);
        } else {
          // Autenticación exitosa
          console.log(data); // Puedes mostrar la respuesta en la consola o realizar otras acciones
          alert('Inicio de sesión exitoso');
          // Redirigir al usuario a otra página
          window.location.href = 'admin.html';
        }
      })
      .catch(error => {
        // Manejar errores de la solicitud de autenticación.
        console.error('Error:', error);
        alert('Error en el inicio de sesión');
      });
  }
  })