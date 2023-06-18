document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.querySelector("form");
  const botonEnviar = document.getElementById("cMonster");
  const pCrear = document.getElementById("message");

  var boton = document.getElementById("Volver");
  boton.addEventListener("click", function (){
    window.location.href = "admin.html";
  });


  formulario.addEventListener("submit", function (event) {
    event.preventDefault(); 
    
    const nombre = document.getElementById("nombre").value;
    const nivel = document.getElementById("nivel").value;
    const vida = document.getElementById("vida").value;
    const ataque = document.getElementById("ataque").value;
    const defensa = document.getElementById("defensa").value;

   
    const datos = {
      name: nombre,
      level: nivel,
      defense: defensa,
      health: vida,
      attack: ataque,
    };

    fetch("http://localhost:8000/api/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); 
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      pCrear.innerText="Monstruo creado con éxito :)";
      formulario.reset();
      
  });
});
