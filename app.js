let pokediv = document.querySelector(".pokemons");
let typeDropdown = document.querySelector("#poketype");
let searchBox = document.querySelector("#search");
let pokemonOffset = 0;
let showLimit = pokemonOffset+20;

function loadMore() {
    showLimit += 20;
    searchBox.value = "";
    showPokemons();

}

function typeChange() {
    pokediv.innerHTML = "";
    pokemonOffset = 0;
    showLimit = pokemonOffset+20;

    showPokemons();
    searchPokemon();
}

function searchPokemon() {
    let pokemons = document.querySelectorAll(".pokeCard");

    pokemons.forEach(element => {
        if(!element.getAttribute("name").includes(searchBox.value)) {
            element.classList.add("hide");
        }
        else {
            element.classList.remove("hide");
        }
    });
}

function createCard(pokemonName, spriteUrl, hp, attack, defense, type) {
    let pokeCard = document.createElement("div");
    pokeCard.className = "pokeCard";
    pokeCard.setAttribute("name", pokemonName);
    pokediv.appendChild(pokeCard);

    //change background color
    pokeCard.classList.add(type);

    //pokemon info
    let nameElement = document.createElement("h3");
    nameElement.innerHTML = pokemonName.toUpperCase();
    let spriteElement = document.createElement("img");
    spriteElement.setAttribute("src", spriteUrl);

    //pokemon stats
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

async function getTotalPokemonNumber() {
    return await fetch('https://pokeapi.co/api/v2/pokemon')
    .then(response => response.json())
    .then(data => data.count);
}

async function showPokemons() {
    let totalPokemon = await getTotalPokemonNumber();
    console.log(pokemonOffset + "-" + showLimit);
    fetch('https://pokeapi.co/api/v2/pokemon?limit=' + totalPokemon)
    .then(response => response.json())
    .then(data => {
        for(pokemonOffset;pokemonOffset<showLimit;pokemonOffset++) {
            //fetch pokemon
            fetch(data.results[pokemonOffset].url)
            .then(response => response.json())
            .then(data => {
                if(typeDropdown.value == data.types[0].type.name || typeDropdown.value == "all") {
                    createCard(data.name, data.sprites.front_default, data.stats[0].base_stat, data.stats[1].base_stat, data.stats[2].base_stat, data.types[0].type.name);
                }
            });        
        }
    });
}

showPokemons();