async function fetchData() {
    try {

        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        console.log(data);

        const pokemonSprite = data.sprites.front_default;
        const pokemonNameFormatted = data.name.charAt(0).toUpperCase() + data.name.slice(1);

        const container = document.getElementById("pokemonContainer");
        container.innerHTML = "";
        const card = document.createElement("div");
        card.className = "Pokemon-Card";

        card.innerHTML = `
            <img src="${pokemonSprite}" alt="${pokemonNameFormatted}">
            <p>${pokemonNameFormatted}</p>
        `;

        container.appendChild(card);


    } catch (error) {
        console.error(error);
        alert("Pokemon was not found!")
    }
}

async function loadAllPokemon() {
    try {
        const container = document.getElementById("pokemonContainer");
        container.innerHTML = "Loading...";

        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
        const data = await response.json();

        container.innerHTML = "";

        for (const pokemon of data.results) {
            const pokemonDeatils = await fetch(pokemon.url);
            const detailsData = await pokemonDeatils.json();


            const pokemonSprite = detailsData.sprites.front_default;

            const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

            const hpStat = detailsData.stats.find(stat => stat.stat.name === "hp");
            const attackStat = detailsData.stats.find(stat => stat.stat.name === "attack");
            const defenseStat = detailsData.stats.find(stat => stat.stat.name === "defense");

            const pokemonHPName = hpStat ? hpStat.stat.name.toUpperCase() : "Unknown";
            const pokemonHPValue = hpStat ? hpStat.base_stat : "Unknown";
            const pokemonAttackStatName = attackStat ? capitalizeFirstLetter(attackStat.stat.name) : "Unknown";
            const pokemonAttackValue = attackStat ? attackStat.base_stat : "Unknown";
            const pokemonDefenseName = defenseStat ? capitalizeFirstLetter(defenseStat.stat.name) : "Unknown";
            const pokemonDefenseStatValue = defenseStat ? defenseStat.base_stat : "Unknown";


            const pokemonNameFormatted = pokemon.name.trim().replace(/^"|"$/g, '').charAt(0).toUpperCase() + pokemon.name.slice(1);
            console.log(pokemon.name)

            const card = document.createElement("div");
            card.className = "Pokemon-Card";

            card.innerHTML = `
        <img src ="${pokemonSprite}">
        <h1>${pokemonNameFormatted}</h1>
         <p>${pokemonHPName}: ${pokemonHPValue}</p>
         <p>${pokemonAttackStatName}: ${pokemonAttackValue}</p>
           <p>${pokemonDefenseName}: ${pokemonDefenseStatValue}</p>
        `;

            container.appendChild(card)

        }
    } catch (error) {
        console.error(error);
        alert("Could not load Pokemon!");
    }
}

document.addEventListener("DOMContentLoaded", loadAllPokemon);

async function fetchByType(type) {

    const container = document.getElementById("pokemonContainer");
    container.innerHTML = "Loading...";

    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
        const data = await response.json();

        const filteredPokemons = [];
        for (const pokemon of data.results) {
            const detailsResponse = await fetch(pokemon.url);
            const details = await detailsResponse.json();
            if (details.types.some(t => t.type.name === type)) {
                filteredPokemons.push(details);
            }
        }

        container.innerHTML = "";

        if (filteredPokemons.length > 0) {
            filteredPokemons.forEach(pokemon => {
                const pokemonElement = document.createElement("div");
                pokemonElement.textContent = pokemon.name;
                container.appendChild(pokemonElement);
            });
        } else {
            container.textContent("No pokemons were found in this type of element")
        }

    } catch (error) {
        container.textContent = "An error occurred while fetching Pokémon data.";
        console.error(error);
    }
}