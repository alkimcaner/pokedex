let pokediv = document.querySelector(".pokemons");
let typeDropdown = document.querySelector("#poketype");
let searchBox = document.querySelector("#search");
let pokemonOffset = 1;
let showLimit = pokemonOffset+20;
let totalPokemon = 898;

async function loadMore() {
    showLimit += (showLimit < totalPokemon) ? 20:0;
    await fetchPokemons();
}

async function typeChange() {
    pokediv.innerHTML = "";
    pokemonOffset = 1;
    showLimit = 1;
    await loadMore();
}

async function fetchPokemons() {
    for(pokemonOffset;pokemonOffset<showLimit;pokemonOffset++) {

        //fetch pokemon
        let pokeData = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonOffset)
        .then(response => response.json())
        .then(data => {
            return {
                name: data.name,
                id: data.id,
                sprite: data.sprites.front_default,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                type: data.types[0].type.name
            }
        });

        //filter out the data
        if( (typeDropdown.value == pokeData.type || typeDropdown.value == "all") && (searchBox.value == "" || pokeData.name.includes(searchBox.value)) ) {
            createCard(pokeData);
        }
        else {
            showLimit++;
        }
    }
}

function createCard(pokemon) {
    let pokeCard = document.createElement("div");
    pokeCard.className = "pokeCard";
    pokeCard.setAttribute("name", pokemon.name);
    pokediv.appendChild(pokeCard);

    //change background color
    pokeCard.classList.add(pokemon.type);

    //pokemon info
    let nameElement = document.createElement("h3");
    nameElement.innerHTML = "#" + pokemon.id + " " + pokemon.name.toUpperCase();

    let spriteElement = document.createElement("img");
    spriteElement.setAttribute("src", pokemon.sprite);

    let statElement = createStats(pokemon);

    //append elements to pokeCard div
    pokeCard.append(spriteElement, nameElement, statElement)
}

function createStats(pokemon) {
    let statElement = document.createElement("div");
    statElement.className = "stats";

    let hpElement = document.createElement("p");
    hpElement.innerHTML = "HP: " + pokemon.hp;

    let attackElement = document.createElement("p");
    attackElement.innerHTML = "ATTACK: " + pokemon.attack;

    let defenseElement = document.createElement("p");
    defenseElement.innerHTML = "DEFENSE: " + pokemon.defense;

    let typeElement = document.createElement("p");
    typeElement.innerHTML = pokemon.type.toUpperCase();

    statElement.append(typeElement, hpElement, attackElement, defenseElement);

    return statElement;
}

fetchPokemons();