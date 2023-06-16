document.addEventListener("DOMContentLoaded", function () {
    // Obtener referencia al formulario y al botón de envío
    const formulario = document.querySelector("form");
    const botonEnviar = document.getElementById("cItems");
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
  
      // Crear el objeto de datos a enviar
      
      if(nombre !== "Recupera 100% vida" && nombre !== "Recupera 50% vida" && nombre !== "Recupera 25% vida" 
        && nombre !== "Duplica suerte siguiente ataque" && nombre !== "Duplica daño siguiente ataque"){
        alert('Nombre de item incorrecto');

      }else{
        const datos = {
            name: nombre
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
          // Manejar la respuesta de la API
          alert("Item creado con éxito"); // Puedes mostrar la respuesta en la consola o realizar otras acciones
        });
        formulario.reset();
    }
    
        
    });
  });
  