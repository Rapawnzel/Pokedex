function main(){
    let poke = document.getElementById("poke").value;
    let twenty = getPokemons(poke);
    /*twenty.forEach(pokemon => {
        getPokemon(twenty[i]);
        i++;
    });*/
    
}

function getPokemons(pokeRequest){ 
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://pokeapi.co/api/v2/pokemon', true);

    request.onload = function() {
        // Begin accessing JSON data 
        let parsedData = JSON.parse(this.response);
        let pokemons = [];
        let i=0;
        if (request.status >= 200 && request.status < 400) {
            parsedData[`results`].forEach(pokemon => {
                pokemons[i] = pokemon['name'];
                i++;
                if (pokeRequest == pokemon['name']){
                    getPokemon(pokemon['name']);
                    document.getElementById("pokeName").innerText = pokemon['name'];
                }
                else{
                    //document.getElementById("pokeName").innerText = "ERROR";
                }
              });
        }
        else {
            console.log('error');
        }
        /*
        let j = 0;
        pokemons.forEach(pokemonData => {
            //document.write (`pokemon: <BR>${pokemons[j]} <br>`);
            getPokemon(pokemons[j]);
            j++;
        });*/
        
        return true;
    }
    request.send();
    return true;
}

function getPokemon(pokemonObject){ 
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest();
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', `https://pokeapi.co/api/v2/pokemon/${pokemonObject}`, true);

    request.onload = function() {
        // Begin accessing JSON data 
        
        let parsedPokemonData = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            //img:
            let img = parsedPokemonData[`sprites`][`front_default`];
            document.getElementById("img").innerHTML = `<figure><img src='${img}' class= "align-middle"></figure>`;
            //height:
            document.getElementById("height").innerHTML = `${parsedPokemonData[`height`]/10} m`;
            //weight:
            document.getElementById("weight").innerHTML = `${parsedPokemonData[`weight`]/10} kg`;
            //base experience:
            document.getElementById("baseExp").innerHTML = `${parsedPokemonData[`base_experience`]} `;
            //types:
            let type = "";
            for (let types in parsedPokemonData[`types`]){
               type = parsedPokemonData[`types`][types][`type`]['name'];
                document.getElementById("pokeType").innerHTML += ` ${type}`;
            }

            let ability = "";
            for (let abilities in parsedPokemonData[`abilities`]){
                 ability = parsedPokemonData[`abilities`][abilities][`ability`]['name'];
                 document.getElementById("abilities").innerHTML += ` ${ability}`;
             }
        }
        else {
            console.log('error');
        }
    }
    request.send();
    return true;
}






/*


function prtScn(result){
    document.getElementById("result").placeholder = result;
    return true;
}

function eraseData(){
    localStorage[`win`] = 0;
    localStorage[`lose`] = 0;
    document.getElementById("victories").innerText = localStorage.getItem("win");
    document.getElementById("defeats").innerText = localStorage.getItem("lose");
    document.getElementById("result").placeholder = "";
    document.getElementById("showImage1").innerHTML = ``;
    document.getElementById("showImage2").innerHTML = ``;
    return true;
}

function showEraseButton(){
    document.getElementById("victories").innerText = localStorage.getItem("win");
    document.getElementById("erase").innerHTML = `<button onclick="eraseData()" id="button" class="btn btn-lg btn-outline-dark text-uppercase font-weight-light rounded-0">Erase Data</button>`;
    return true;
}

function player1Wins(){
    prtScn(`You got lucky!`);
    localStorage[`win`] = parseInt(localStorage.getItem("win"))+1;
    document.getElementById("victories").innerText = localStorage.getItem("win");
    document.getElementById("defeats").innerText = localStorage.getItem("lose");
    showEraseButton();
    return true;
}

function player2Wins(){
    prtScn(`You are a loser`); 
    localStorage[`lose`] = parseInt(localStorage.getItem("lose"))+1;
    document.getElementById("defeats").innerText = localStorage.getItem("lose");
    document.getElementById("victories").innerText = localStorage.getItem("win");
    showEraseButton();
    return true;
}

function tie(){
    prtScn(`Oh, it's a tie`); 
    return true;
}

function showImages(image1, image2){
    document.getElementById("showImage1").innerHTML = `<img src="${image1}.png" class="img-responsive">`;
    document.getElementById("showImage2").innerHTML = `<img src="${image2}.png" class="img-responsive">`;
    return true;
}

function play(player1){
    let arr = ["Rock", "Paper", "Scissors"];
    let player2 = arr[Math.floor(Math.random() * arr.length)];
    
    showImages(player1, player2);

    if (player1 == `Rock`){
        if (player2 == `Paper`){
            player2Wins();
        }
        else if (player2 == `Scissors`){
            player1Wins();
        }
        else{
            tie();
        }
    }
    else if (player1 == `Paper`){
        if (player2 == `Rock`){
            player1Wins();
        }
        else if (player2 == `Scissors`){
            player2Wins();
        }
        else{
            tie();
        }
    }
    else if (player1 == `Scissors`){
        if (player2 == `Paper`){
            player1Wins();
        }
        else if (player2 == `Rock`){
            player2Wins();
        }
        else{
            tie();
        }
    }
    return true;
}

function setPlayer1Rock(){
    let player1Rock = `Rock`;
    play (player1Rock);
    return true;
}

function setPlayer1Paper(){
    let player1Paper = `Paper`;
    play (player1Paper);
    return true;
}

function setPlayer1Scissors(){
    let player1Scissors = `Scissors`;
    play (player1Scissors);
    return true;
}

function main(){
    localStorage.setItem("win", 0);
    localStorage.setItem("lose", 0);
    document.getElementById("victories").innerText = localStorage.getItem("win");
    document.getElementById("defeats").innerText = localStorage.getItem("lose");
}




Crearemos una aplicación web que nos va a permitir jugar a Piedra, Papel o Tijeras contra la máquina!!

La web constará de:
3 botones con las opciones "Piedra", "Papel" y "Tijeras". 
Cuando el usuario haga click en alguno de estos botones, 
se guardará la jugada del jugador en una variable, 
y se generará aleatoriamente la jugada de la máquina, que se guardará en otra variable. 

Con la función de árbitro que hicisteis ayer, 
compararéis la jugada del jugador con la jugada de la máquina. 
El resultado de la partida se imprimirá en la pantalla. 

También haremos un contador de victorias. En las cookies se le pondrá al usuario 
un contador de victorias, que comenzará en cero. 
Cada vez que el usuario gane una partida, se incrementará en 1 el valor de esta cookie. 
También tendrá un contador de derrotas guardado en las cookies. Cada vez que el usuario pierda, 
se incrementará en uno el valor de esta cookie.

Encima de los 3 botones pondremos los contadores de victorias y de derrotas. 

*IMPORTANTE* Crear un repo de git solamente para este proyecto,
a parte de los otros repos de git que tenéis.


*/