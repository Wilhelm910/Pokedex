
let currentPokemon
let pokemonArray = []
let pokemonAmount = 26
let renderedPokemon = 1


async function init() {
    for (let i = 1; i <= pokemonAmount; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`
        let response = await fetch(url)
        let responseToJson = await response.json()
        let pokemonNames = responseToJson
        if (!pokemonArray.includes(pokemonNames.name)) {
            pokemonArray.push(pokemonNames.name)
        }
    }
    if (pokemonAmount < 26) { //150
        pokemonAmount += 25
        init()
    }
    cyclePokemonArray()
}


async function cyclePokemonArray() {
    for (renderedPokemon; renderedPokemon <= pokemonArray.length; renderedPokemon++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${renderedPokemon}`
        let response = await fetch(url)
        let responseToJson = await response.json()
        currentPokemon = responseToJson
        render(currentPokemon)
    }
}


function render(currentPokemon) {
    renderPokemonCardNameAndImg(currentPokemon)
    renderPokemonCardType(currentPokemon)
    renderCardBackgroundColor(currentPokemon)
    console.log(currentPokemon)
}


function renderPokemonCardNameAndImg(currentPokemon) {
    let str = currentPokemon.name
    let strToUpperCase = str.charAt(0).toUpperCase() + str.slice(1)
    document.getElementById('pokedex').innerHTML += /*html*/ `
    <div onclick="showPokemon(${currentPokemon})" class="pokemon-card" id="${currentPokemon.id}">
        <div class="pokemon-name">#${currentPokemon.id.toString().padStart(3, '0')} <b>${strToUpperCase}</b></div>
        <div class="pokemon-img-container">
            <img class="pokemon-img" src="${currentPokemon.sprites.other.dream_world.front_default}">
        </div>
        <div class="pokemon-type-container" id="type-${currentPokemon.id}"></div>
    </div>
    `
}


function renderPokemonCardType(currentPokemon) {
    let type = document.getElementById(`type-${currentPokemon.id}`)
    for (let i = 0; i < currentPokemon.types.length; i++) {
        type.innerHTML += /*html*/ `
        <div class="pokemon-type">${currentPokemon.types[i].type.name}</div>
         `
    }
}


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


async function showPokemon(id) {
    document.getElementById('overlay').classList.remove('d-none')
    console.log(id)
}


function hideDetails() {
    document.getElementById('overlay').classList.add('d-none')
}

function dontClose(event) {
    event.stopPropagation()
}