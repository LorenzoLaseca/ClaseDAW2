document.addEventListener("DOMContentLoaded", function () {
  // Obtener referencia al formulario y al botón de envío
  const formulario = document.querySelector("form");
  const botonEnviar = document.getElementById("cMonster");
  const pCrear = document.getElementById("message");

  var boton = document.getElementById("Volver");
  boton.addEventListener("click", function (){
    window.location.href = "admin.html";
  });

  // Manejar el evento de envío del formulario
  formulario.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById("nombre").value;
    const nivel = document.getElementById("nivel").value;
    const vida = document.getElementById("vida").value;
    const ataque = document.getElementById("ataque").value;
    const defensa = document.getElementById("defensa").value;

    // Crear el objeto de datos a enviar
    const datos = {
      name: nombre,
      level: nivel,
      defense: defensa,
      health: vida,
      attack: ataque,
    };

    // Configurar la solicitud HTTP utilizando fetch()
    fetch("http://localhost:8000/api/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((response) => response.json())
      .then((data) => {
        // Manejar la respuesta de la API
        console.log(data); // Puedes mostrar la respuesta en la consola o realizar otras acciones
      })
      .catch((error) => {
        // Manejar errores de la solicitud
        console.error("Error:", error);
      });
      pCrear.innerText="Monstruo creado con éxito :)";
      formulario.reset();
      
  });
});
