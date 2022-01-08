let pokediv = document.querySelector(".pokemons");
let typeDropdown = document.querySelector("#poketype");
let pokemonOffset = 0;

function filterPokemons() {
    showPokemons();
    let cards = document.querySelectorAll(".pokeCard");
    cards.forEach(element => {
        console.log(element);
    });
}

function previousPage() {
    pokemonOffset -= (pokemonOffset>=50) ? 50:0;
    showPokemons();
}

function nextPage() {
    pokemonOffset += (pokemonOffset<=999) ? 50:0;
    showPokemons();
}

function createCard(pokemonName, spriteUrl, hp, attack, defense, type) {
    let pokeCard = document.createElement("div");
    pokeCard.className = "pokeCard";
    pokediv.appendChild(pokeCard);

    //change background color
    pokeCard.classList.add(type);

    //elements
    let nameElement = document.createElement("p");
    nameElement.innerHTML = pokemonName.toUpperCase();
    let spriteElement = document.createElement("img");
    spriteElement.setAttribute("src", spriteUrl);

    let stat = {
        hp: "HP: " + hp,
        attack: "ATTACK: " + attack,
        defense: "DEFENSE: " + defense,
        type: type
    }

    let statElement = document.createElement("div");
    statElement.className = "stats";

    let hpElement = document.createElement("p");
    hpElement.innerHTML = stat.hp;
    let attackElement = document.createElement("p");
    attackElement.innerHTML = stat.attack;
    let defenseElement = document.createElement("p");
    defenseElement.innerHTML = stat.defense;
    let typeElement = document.createElement("p");
    typeElement.innerHTML = stat.type.toUpperCase();

    //append elements to stat div
    statElement.append(typeElement, hpElement, attackElement, defenseElement);

    //append elements to pokeCard div
    pokeCard.append(spriteElement, nameElement, statElement)
}

function showPokemons() {
    pokediv.innerHTML = "";
    //fetch pokemon array
    fetch('https://pokeapi.co/api/v2/pokemon?limit=50' + '&offset=' + pokemonOffset)
    .then(response => response.json())
    .then(data => {
        for(let i=0;i<50;i++) {
            //fetch pokemon
            fetch(data.results[i].url)
            .then(response => response.json())
            .then(data => {
                if(typeDropdown.value == data.types[0].type.name) {
                    createCard(data.name, data.sprites.front_default, data.stats[0].base_stat, data.stats[1].base_stat, data.stats[2].base_stat, data.types[0].type.name);
                }
                else if(typeDropdown.value == "all") {
                    createCard(data.name, data.sprites.front_default, data.stats[0].base_stat, data.stats[1].base_stat, data.stats[2].base_stat, data.types[0].type.name);
                }
            });        
        }
    });
}

showPokemons();
