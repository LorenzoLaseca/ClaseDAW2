document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

      // Obtiene los valores de usuario y contraseña ingresados
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;

      // Aquí puedes realizar la validación del usuario y la contraseña según tus requerimientos
      // Por simplicidad, este ejemplo solo verifica que ambos campos no estén vacíos

      if (username.trim() !== '' && password.trim() !== '') {
        // Se muestra un mensaje de éxito si los campos no están vacíos
        document.getElementById('message').textContent = 'Login successful';
      } else {
        // Se muestra un mensaje de error si algún campo está vacío
        document.getElementById('message').textContent = 'Please enter username and password';
      }
    });
});
