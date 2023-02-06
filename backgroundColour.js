// render pokedex Background colour
function renderCardBackgroundColor(currentPokemon) {
    let content = document.getElementById(`${currentPokemon.id}`)
    if (currentPokemon.types[0].type.name == 'grass') {
        content.classList.add('type-grass')
    } else if (currentPokemon.types[0].type.name == 'water') {
        content.classList.add('type-water')
    } else if (currentPokemon.types[0].type.name == 'fire') {
        content.classList.add('type-fire')
    } else if (currentPokemon.types[0].type.name == 'bug') {
        content.classList.add('type-bug')
    } else if (currentPokemon.types[0].type.name == 'normal') {
        content.classList.add('type-normal')
    } else if (currentPokemon.types[0].type.name == 'poison') {
        content.classList.add('type-poison')
    } else if (currentPokemon.types[0].type.name == 'electric') {
        content.classList.add('type-electric')
    } else if (currentPokemon.types[0].type.name == 'fairy') {
        content.classList.add('type-fairy')
    } else if (currentPokemon.types[0].type.name == 'ground') {
        content.classList.add('type-ground')
    } else if (currentPokemon.types[0].type.name == 'fighting') {
        content.classList.add('type-fighting')
    } else if (currentPokemon.types[0].type.name == 'psychic') {
        content.classList.add('type-psychic')
    } else if (currentPokemon.types[0].type.name == 'rock') {
        content.classList.add('type-rock')
    } else if (currentPokemon.types[0].type.name == 'ghost') {
        content.classList.add('type-ghost')
    } else if (currentPokemon.types[0].type.name == 'ice') {
        content.classList.add('type-ice')
    } else if (currentPokemon.types[0].type.name == 'dragon') {
        content.classList.add('type-dragon')
    }
}


// render highlighted pokemon Background colour
function renderPokemonBackgroundColor(pokemon) {
    let content = document.getElementById(`detailed-pokemon-${pokemon.id}`)
    if (pokemon.types[0].type.name == 'grass') {
        content.classList.add('type-grass')
    } else if (pokemon.types[0].type.name == 'water') {
        content.classList.add('type-water')
    } else if (pokemon.types[0].type.name == 'fire') {
        content.classList.add('type-fire')
    } else if (pokemon.types[0].type.name == 'bug') {
        content.classList.add('type-bug')
    } else if (pokemon.types[0].type.name == 'normal') {
        content.classList.add('type-normal')
    } else if (pokemon.types[0].type.name == 'poison') {
        content.classList.add('type-poison')
    } else if (pokemon.types[0].type.name == 'electric') {
        content.classList.add('type-electric')
    } else if (pokemon.types[0].type.name == 'fairy') {
        content.classList.add('type-fairy')
    } else if (pokemon.types[0].type.name == 'ground') {
        content.classList.add('type-ground')
    } else if (pokemon.types[0].type.name == 'fighting') {
        content.classList.add('type-fighting')
    } else if (pokemon.types[0].type.name == 'psychic') {
        content.classList.add('type-psychic')
    } else if (pokemon.types[0].type.name == 'rock') {
        content.classList.add('type-rock')
    } else if (pokemon.types[0].type.name == 'ghost') {
        content.classList.add('type-ghost')
    } else if (pokemon.types[0].type.name == 'ice') {
        content.classList.add('type-ice')
    } else if (pokemon.types[0].type.name == 'dragon') {
        content.classList.add('type-dragon')
    }
}
