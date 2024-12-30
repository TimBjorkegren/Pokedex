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
        const imgElement = document.getElementById("pokemonSprite");

        /*
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block"; */

        const container = document.getElementById("pokemonContainer");
        container.innerHTML = "";
        const card = document.createElement("div");
        card.className = "PokemonCard";

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