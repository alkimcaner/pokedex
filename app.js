let pokediv = document.querySelector(".pokemons");
let numberInput = document.querySelector("#number-input");
let filterButton = document.querySelector("#filter-button");

let numberofPokemons = 10;

function filterPokemons() {
    numberofPokemons = numberInput.value;
    pokediv.innerHTML = "";
    showPokemons();
}

function showPokemons() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=' + numberofPokemons)
    .then(response => response.json())
    .then(data => {
        for(let i=0;i<numberofPokemons;i++) {
            fetch(data.results[i].url)
            .then(response => response.json())
            .then(data => {
                //creating pokemon
                let pokeCard = document.createElement("div");
                pokeCard.className = "pokeCard";
                pokediv.appendChild(pokeCard);
    
                let spriteUrl = data.sprites.front_default;
                
                //elements
                let nameElement = document.createElement("p");
                nameElement.innerHTML = data.name.toUpperCase();
                let spriteElement = document.createElement("img");
                spriteElement.setAttribute("src", spriteUrl);
                
                let stat = {
                    hp: "HP: " + data.stats[0].base_stat,
                    attack: "ATTACK: " + data.stats[1].base_stat,
                    defense: "DEFENSE: " + data.stats[2].base_stat
                }
                let statElement = document.createElement("div");
                statElement.className = "stats";

                let hpElement = document.createElement("p");
                hpElement.innerHTML = stat.hp;
                let attackElement = document.createElement("p");
                attackElement.innerHTML = stat.attack;
                let defenseElement = document.createElement("p");
                defenseElement.innerHTML = stat.defense;
    
                statElement.append(hpElement, attackElement, defenseElement);
    
                //append elements to pokeCard div
                pokeCard.append(spriteElement, nameElement, statElement)
            });        
        }
    });

}

showPokemons();
