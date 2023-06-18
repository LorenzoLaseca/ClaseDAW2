document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const pass = document.getElementById("pass").value;

      authenticateUser(email, pass);
    });

  function authenticateUser(email, pass) {
    fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, pass }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          console.log(data);
          alert("Inicio de sesión exitoso");
          window.location.href = "admin.html";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error en el inicio de sesión");
      });
  }
});
