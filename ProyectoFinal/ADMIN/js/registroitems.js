document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.querySelector("form");
  const botonEnviar = document.getElementById("cItems");
  const pCrear = document.getElementById("message");

  var boton = document.getElementById("Volver");
  boton.addEventListener("click", function () {
    window.location.href = "admin.html";
  });

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;

    if (
      nombre !== "Recupera 100% vida" &&
      nombre !== "Recupera 50% vida" &&
      nombre !== "Recupera 25% vida" &&
      nombre !== "Duplica suerte siguiente ataque" &&
      nombre !== "Duplica daño siguiente ataque"
    ) {
      alert("Nombre de item incorrecto");
    } else {
      const datos = {
        name: nombre,
      };
      fetch("http://localhost:8000/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Item creado con éxito");
        });
      formulario.reset();
    }
  });
});
