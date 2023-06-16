document.addEventListener("DOMContentLoaded", function () {
  var boton = document.getElementById("Volver");
  boton.addEventListener("click", function (){
    window.location.href = "admin.html";
  });
  var botonCrear = document.getElementById("crearMonster");
  botonCrear.addEventListener("click", function (){
    window.location.href = "registromonsters.html";
  });
  var botonCrear = document.getElementById("crearItem");
  botonCrear.addEventListener("click", function (){
    window.location.href = "registroitems.html";
  });

  document.getElementById("monstersButton").addEventListener("click", function () {
      document.getElementById("botones").style.display = "none";
      document.getElementById("Volver").style.display = "block";
      document.getElementById("crearMonster").style.display = "block";


      fetch("http://localhost:8000/api/monsters")
        .then((response) => response.json())
        .then((data) => {
          var monstersHTML = "<ul>";
          data.forEach((monster) => {
            monstersHTML +=
              "<li>" +
              monster.name +
              ' <button class="deleteButton" data-id="' +
              monster._id +
              '">x</button></li>';
          });
          monstersHTML += "</ul>";

          document.getElementById("monstersList").innerHTML = monstersHTML;
          document.getElementById("monstersList").style.display = "block";
          document.getElementById("itemsList").style.display = "none";


          // Agrega el evento de clic a los botones de eliminar
          var deleteButtons = document.getElementsByClassName("deleteButton");
          Array.from(deleteButtons).forEach((button) => {
            button.addEventListener("click", deleteMonster);
          });
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    });

  document.getElementById("itemsButton").addEventListener("click", function () {
    document.getElementById("botones").style.display = "none";
    document.getElementById("Volver").style.display = "block";
    document.getElementById("crearItem").style.display = "block";



    fetch("http://localhost:8000/api/items")
      .then((response) => response.json())
      .then((data) => {
        var itemsHTML = "<ul>";
          data.forEach((item) => {
            itemsHTML +=
              "<li>" +
              item.name +
              ' <button class="deleteButton" data-id="' +
              item._id +
              '">x</button></li>';
          });
          itemsHTML += "</ul>";

        document.getElementById("itemsList").innerHTML = itemsHTML;
        document.getElementById("itemsList").style.display = "block";
        document.getElementById("monstersList").style.display = "none";

        var deleteButtons = document.getElementsByClassName("deleteButton");
        Array.from(deleteButtons).forEach((button) => {
          button.addEventListener("click", deleteItem);
        });
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });

  function deleteMonster() {
    var monsterId = this.getAttribute("data-id");

    fetch("http://localhost:8000/api/monsters/" + monsterId, {
      method: "DELETE",
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        document.getElementById("monstersButton").click();
      })
      .catch((error) => {
        alert(error);
      });
  }


  function deleteItem() {
    var itemId = this.getAttribute("data-id");

    fetch("http://localhost:8000/api/items/" + itemId, {
      method: "DELETE",
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        document.getElementById("itemsButton").click();
      })
      .catch((error) => {
        alert(error);
      });
  }
});   
