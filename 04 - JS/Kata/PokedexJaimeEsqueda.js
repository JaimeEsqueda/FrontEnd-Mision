const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokeMoves = document.querySelector('[data-poke-moves]');

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};


const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types, moves } = data;
    console.log(data)

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    renderPokemonMoves(moves);


}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML='';
    types.forEach(type =>{
        const typeTextElement = document.createElement("h3");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        statElementName.className += "names";
        const statElementAmount = document.createElement("p");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });

}

const renderPokemonMoves = moves => {
    pokeMoves.innerHTML='';
    moves.forEach(move => {
        const moveElement = document.createElement("div");
        const moveElementName = document.createElement("div");
        moveElementName.className += "moves";
        moveElementName.textContent = move.move.name;
        moveElement.appendChild(moveElementName);
        pokeMoves.appendChild(moveElement);

    });

}

const renderNotFound = () => {
    pokeName.textContent = 'Not Found';
    pokeImg.setAttribute('src', 'C:/Users/chimi/OneDrive/Documents/Developer Full Stack/FrontEnd/04 - JS/practica/Mine/imagenes/pikachucrying.gif');
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeMoves.innerHTML = '';
    pokeId.textContent = '';
}