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


        const container = document.getElementById("pokemonContainer");
        container.innerHTML = "";


        const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

        const hpStat = data.stats.find(stat => stat.stat.name === "hp");
        const attackStat = data.stats.find(stat => stat.stat.name === "attack");
        const defenseStat = data.stats.find(stat => stat.stat.name === "defense");

        const pokemonHPName = hpStat ? hpStat.stat.name.toUpperCase() : "Unknown";
        const pokemonHPValue = hpStat ? hpStat.base_stat : "Unknown";
        const pokemonAttackStatName = attackStat ? capitalizeFirstLetter(attackStat.stat.name) : "Unknown";
        const pokemonAttackValue = attackStat ? attackStat.base_stat : "Unknown";
        const pokemonDefenseName = defenseStat ? capitalizeFirstLetter(defenseStat.stat.name) : "Unknown";
        const pokemonDefenseStatValue = defenseStat ? defenseStat.base_stat : "Unknown";

        const pokemonNameFormatted = data.name.trim().replace(/^"|"$/g, '').charAt(0).toUpperCase() + data.name.slice(1);

        const card = document.createElement("div");
        card.className = "Pokemon-Card";

        card.innerHTML = `
                    <img src="${pokemonSprite}" alt="${pokemonNameFormatted}">
                    <h1>${pokemonNameFormatted}</h1>
                    <p>${pokemonHPName}: ${pokemonHPValue}</p>
                    <p>${pokemonAttackStatName}: ${pokemonAttackValue}</p>
                    <p>${pokemonDefenseName}: ${pokemonDefenseStatValue}</p>
                `;

        container.appendChild(card);
        ;

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

            const elementColors = {
                normal: "rgb(152, 117, 74)",
                fire: "rgb(212, 94, 51)",
                water: "rgb(0, 191, 255)",
                electric: "rgb(255, 215, 0)",
                grass: "rgb(43, 152, 43)",
                ice: "rgb(135, 206, 250)",
                fighting: "rgb(139, 19, 19)",
                poison: "rgb(136, 6, 136)",
                ground: "rgb(210, 180, 140)",
                flying: "rgb(113, 93, 210)",
                psychic: "rgb(255, 105, 180)",
                bug: "rgb(173, 255, 47)",
                rock: "rgb(160, 82, 45)",
                ghost: "rgb(75, 0, 130)",
                dragon: "rgb(72, 61, 139)",
                dark: "rgb(29, 47, 47)",
                steel: "rgb(192, 192, 192)",
                fairy: "rgb(255, 182, 193)"
            }

            const hpStat = detailsData.stats.find(stat => stat.stat.name === "hp");
            const attackStat = detailsData.stats.find(stat => stat.stat.name === "attack");
            const defenseStat = detailsData.stats.find(stat => stat.stat.name === "defense");
            const typeName = detailsData.types.map(typeInfo => typeInfo.type.name).join(",");

            const pokemonHPName = hpStat ? hpStat.stat.name.toUpperCase() : "Unknown";
            const pokemonHPValue = hpStat ? hpStat.base_stat : "Unknown";
            const pokemonAttackStatName = attackStat ? capitalizeFirstLetter(attackStat.stat.name) : "Unknown";
            const pokemonAttackValue = attackStat ? attackStat.base_stat : "Unknown";
            const pokemonDefenseName = defenseStat ? capitalizeFirstLetter(defenseStat.stat.name) : "Unknown";
            const pokemonDefenseStatValue = defenseStat ? defenseStat.base_stat : "Unknown";
            const pokemonTypeName = typeName || "Unknown";


            const pokemonNameFormatted = pokemon.name.trim().replace(/^"|"$/g, '').charAt(0).toUpperCase() + pokemon.name.slice(1);
            console.log(pokemon.name)

            const card = document.createElement("div");
            card.className = "Pokemon-Card";

            card.innerHTML = `
        <img src ="${pokemonSprite}">
        <p>${pokemonTypeName}</p>
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
            filteredPokemons.forEach(details => {
                const pokemonSprite = details.sprites.front_default;

                const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

                const hpStat = details.stats.find(stat => stat.stat.name === "hp");
                const attackStat = details.stats.find(stat => stat.stat.name === "attack");
                const defenseStat = details.stats.find(stat => stat.stat.name === "defense");

                const pokemonHPName = hpStat ? hpStat.stat.name.toUpperCase() : "Unknown";
                const pokemonHPValue = hpStat ? hpStat.base_stat : "Unknown";
                const pokemonAttackStatName = attackStat ? capitalizeFirstLetter(attackStat.stat.name) : "Unknown";
                const pokemonAttackValue = attackStat ? attackStat.base_stat : "Unknown";
                const pokemonDefenseName = defenseStat ? capitalizeFirstLetter(defenseStat.stat.name) : "Unknown";
                const pokemonDefenseStatValue = defenseStat ? defenseStat.base_stat : "Unknown";

                const pokemonNameFormatted = details.name.trim().replace(/^"|"$/g, '').charAt(0).toUpperCase() + details.name.slice(1);

                const card = document.createElement("div");
                card.className = "Pokemon-Card";

                card.innerHTML = `
                    <img src="${pokemonSprite}" alt="${pokemonNameFormatted}">
                    <h1>${pokemonNameFormatted}</h1>
                    <p>${pokemonHPName}: ${pokemonHPValue}</p>
                    <p>${pokemonAttackStatName}: ${pokemonAttackValue}</p>
                    <p>${pokemonDefenseName}: ${pokemonDefenseStatValue}</p>
                `;

                container.appendChild(card);
            });
            ;
        } else {
            container.textContent("No pokemons were found in this type of element")
        }

    } catch (error) {
        container.textContent = "An error occurred while fetching Pokémon data.";
        console.error(error);
    }
}