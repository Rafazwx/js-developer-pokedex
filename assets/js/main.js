const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})



// Botão de mudar cor de fundo
document.getElementById('changeBackground').addEventListener('click', () => {
    const colors = ['#f5f5f5', '#ffe4e1', '#e6e6fa', '#d8bfd8', '#afeeee', '#f0fff0'];
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
});


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            <button class="favorite-btn" data-id="${pokemon.number}">Favoritar</button>
        </li>
    `
}



setTimeout(() => {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favoriteButtons.forEach(button => {
        const pokemonId = button.getAttribute('data-id');
        
        if (favorites.includes(pokemonId)) {
            button.classList.add('favorited');
            button.textContent = 'Favorito';
        }

        button.addEventListener('click', () => {
            if (favorites.includes(pokemonId)) {
                favorites = favorites.filter(id => id !== pokemonId);
                button.classList.remove('favorited');
                button.textContent = 'Favoritar';
            } else {
                favorites.push(pokemonId);
                button.classList.add('favorited');
                button.textContent = 'Favorito';
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));
        });
    });
}, 1000);
