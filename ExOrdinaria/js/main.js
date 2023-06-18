document.addEventListener("DOMContentLoaded", function () {
const botonStart = document.getElementById('start');
botonStart.addEventListener('click', startGame);
});


function startGame() {
    //Coger los elementos del html mediante su id
    let cartaPlayer = document.getElementById('cartaPlayer');
    let puntosPlayer = document.getElementById('puntosPlayer');
    let cartaCompu = document.getElementById('cartaCompu');
    let puntosCompu = document.getElementById('puntosCompu');
    let partidaEnd = document.getElementById('partidaEnd');
    let nextRound =  document.getElementById('botonNRound');
    let ronda =  document.getElementById('ronda');


    
    //Habilitar boton siguiente ronda
    habilitarNextRound();

    //Borrar los mensajes 
    borrarMensajes();

    //Guardar cartas
    let cartas = createDeck();

    //Llamar a shuffle para barajear cartas
    shuffle(cartas)

    //crearArrays cartas
    let cartasPlayer = [];
    let cartasComputer = [];

    //Llamar a deal cartas para repartirlas
    dealCards (cartasPlayer, cartasComputer, cartas);

    //Crear contadores
    let contador = 0;
    let contadorPP = 0;
    let contadorPC= 0;
    let contadorRonda = 1;

    
    nextRound.addEventListener('click', function(){
        if(contadorRonda<=24){
            ronda.innerText = 'Round: ' + contadorRonda;
            //imprimo las cartas de los jugadores en la posicion 0
            cartaPlayer.innerText = cartasPlayer[contador];
            cartaCompu.innerText = cartasComputer[contador];

            //Obtengo el valor de las cartas de cada jugador
            let cPlayer = cartasPlayer[contador];
            let cComputer = cartasComputer[contador];

            //Quitar el palo de las cartas y me quedo con los numeros
            let resultadoCPlayer= cPlayer.substring(cPlayer.indexOf(" "));
            let resultadoCComputer= cComputer.substring(cComputer.indexOf(" "));
            

            //Sumar los puntos que gana el jugador o la computadora cada ronda e imprimirlos
            if(parseInt(resultadoCPlayer)>parseInt(resultadoCComputer)){
                contadorPP++;
                puntosPlayer.innerText = contadorPP;
                partidaEnd.innerText = 'Player wins the round';

            }else{
                contadorPC++;
                puntosCompu.innerText = contadorPC;
                partidaEnd.innerText = 'Computer wins the round';

            }
            contador++;
            contadorRonda++;

        }else{

            document.getElementById('botonNRound').disabled = true;
            if(contadorPP>contadorPC){
                partidaEnd.innerText = 'Player wins the game!!';

            }else if(contadorPC>contadorPP){
                partidaEnd.innerText = 'Computer wins the game!!';

            }else{
                partidaEnd.innerText = 'Its a tie game!!';
            }
        }
    });
    
    
}

//crear la baraja

function createDeck() {
    let palos = ['Oro', 'Basto', 'Espada', 'Copa'];
    let numeros = ['1','2','3','4','5','6','7','8','9','10','11','12'];
    let cartas = [];

   for (let i = 0; i < palos.length; i++) {
    for (let j = 0; j < numeros.length; j++) {
        let carta = palos[i] + " " + numeros[j];
        cartas.push(carta);
        
    }
    
   }
   return cartas;

  }

function shuffle(cartas) {
    for (let i = 0; i < cartas.length; i++) {
        //Guarda la carta que esta recorriendo el bucle
        let cartaTemp = cartas[i];
        //Coge una carta random entre 0 y 48
        let cartaRandom = Math.floor(Math.random() * cartas.length);
        //Coge la posicion de la carta que esta recorriendo y coloca la random
        cartas[i] = cartas[cartaRandom];
        //Guardar la carta temporal en una posicion random
        cartaRandom[cartaTemp] = cartaTemp;
    }
    

  }
  function dealCards (cartasPlayer, cartasComputer, cartas) {
    for (let i = 0; i < cartas.length; i++) {
        //Si la posicion es par, que la reparta al computer
        if(i % 2 == 0){
            cartasComputer.push(cartas[i]); 
        }else{
        //Si no es par, la reparte al jugador
        cartasPlayer.push(cartas[i]);
        }
    }
  }

  function borrarMensajes() {
    document.getElementById('cartaPlayer').innerText = '';
    document.getElementById('puntosPlayer').innerText = '0';
    document.getElementById('cartaCompu').innerText = '';
    document.getElementById('puntosCompu').innerText = '0';  
    document.getElementById('partidaEnd').innerText = '';


  }

  function habilitarNextRound() {
    document.getElementById('botonNRound').disabled = false;
  }


