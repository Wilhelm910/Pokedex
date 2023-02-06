
let currentPokemon
let pokemonArray = []
let pokemonAmount = 26
let renderedPokemon = 1
let totalPokemonsShown = 150 //150
let searchValue = []


// fill pokemonArray step by step with names to load 25 pokemon at a time
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
    if (pokemonAmount < totalPokemonsShown) {
        pokemonAmount += 25
        init()
    }
    cyclePokemonArray()
}


// cycle through array and render pokemon
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
    pokemonCardNameAndImg(currentPokemon)
    renderPokemonCardType(currentPokemon)
    renderCardBackgroundColor(currentPokemon)
}


function pokemonCardNameAndImg(currentPokemon) {
    let str = currentPokemon.name
    let strToUpperCase = str.charAt(0).toUpperCase() + str.slice(1)
    document.getElementById('pokedex').innerHTML += renderPokemonCardNameAndImg(currentPokemon, strToUpperCase) 
}


function renderPokemonCardType(currentPokemon) {
    let type = document.getElementById(`type-${currentPokemon.id}`)
    for (let i = 0; i < currentPokemon.types.length; i++) {
        type.innerHTML += /*html*/ `
        <div class="pokemon-type">${currentPokemon.types[i].type.name}</div>
         `
    }
}


async function showPokemon(pokemonID) {
    document.getElementById('overlay').classList.remove('d-none')
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
    let response = await fetch(url)
    let responseToJson = await response.json()
    let pokemon = responseToJson
    highlightPokemon(pokemon)
}


function highlightPokemon(pokemon) {
    console.log(pokemon)
    let str = pokemon.name
    let strToUpperCase = str.charAt(0).toUpperCase() + str.slice(1)
    document.getElementById('details-container').innerHTML = renderPokemon(pokemon, strToUpperCase) 
    renderPokemonType(pokemon)
    renderPokemonBackgroundColor(pokemon)
    renderPokemonStats(pokemon)
}


function changeStatsRight() {
    let stats = document.getElementById('stats-container')
    let abilities = document.getElementById('abilities-container')
    let generalInfo = document.getElementById('general-info-container')
    if (!stats.classList.contains('d-none')) {
        stats.classList.add('d-none')
        abilities.classList.remove('d-none')
    } else if (!abilities.classList.contains('d-none')) {
        abilities.classList.add('d-none')
        generalInfo.classList.remove('d-none')
    } else if (!generalInfo.classList.contains('d-none')) {
        generalInfo.classList.add('d-none')
        stats.classList.remove('d-none')
    }
}


function changeStatsLeft() {
    let stats = document.getElementById('stats-container')
    let abilities = document.getElementById('abilities-container')
    let generalInfo = document.getElementById('general-info-container')
    if (!stats.classList.contains('d-none')) {
        stats.classList.add('d-none')
        generalInfo.classList.remove('d-none')
    } else if (!generalInfo.classList.contains('d-none')) {
        abilities.classList.remove('d-none')
        generalInfo.classList.add('d-none')
    } else if (!abilities.classList.contains('d-none')) {
        abilities.classList.add('d-none')
        stats.classList.remove('d-none')
    }
}


function previousPokemon(pokemonID) {
    console.log(pokemonID)
    if (pokemonID == 0) {
        pokemonID = totalPokemonsShown + 1
        showPokemon(pokemonID)
    } else {
        showPokemon(pokemonID)
    }
}


function nextPokemon(pokemonID) {
    if (pokemonID == totalPokemonsShown + 2) {
        pokemonID = 1
        showPokemon(pokemonID)
    } else {
        showPokemon(pokemonID)
    }
}


function renderPokemonType(pokemon) {
    let type = document.getElementById(`detailed-pokemon-type-${pokemon.id}`)
    for (let i = 0; i < pokemon.types.length; i++) {
        type.innerHTML += /*html*/ `
        <div class="pokemon-type">${pokemon.types[i].type.name}</div>
         `
    }
}


function renderPokemonStats(pokemon) {
    let statsContainer = document.getElementById('stats-container')
    for (let i = 0; i < pokemon.stats.length; i++) {
        let str = pokemon.stats[i].stat.name
        let strToUpperCase = str.charAt(0).toUpperCase() + str.slice(1)
        statBarWidth = (pokemon.stats[i].base_stat / 200) * 100
        statsContainer.innerHTML += renderStats(pokemon, strToUpperCase, i)
    }
    let abilitiesContainer = document.getElementById('abilities-container')
    for (let i = 0; i < pokemon.abilities.length; i++) {
        let str = pokemon.abilities[i].ability.name
        let strToUpperCase = str.charAt(0).toUpperCase() + str.slice(1)
        abilitiesContainer.innerHTML += renderAbilities(strToUpperCase)
    
    }
    let generalInfoContainer = document.getElementById('general-info-container')
    expBarWidth = (pokemon.base_experience / 400) * 100
    heightBarWidth = (pokemon.height / 25) * 100
    weightBarWidth = (pokemon.weight / 1100) * 100
    generalInfoContainer.innerHTML += renderGeneralInfo(pokemon) 
   
}



function hideDetails() {
    document.getElementById('overlay').classList.add('d-none')
}


function dontClose(event) {
    event.stopPropagation()
}


function searchPokemon() {
    searchValue = []
    let input = document.getElementById('user-search')
    for (let i = 0; i < pokemonArray.length; i++) {
        fillSearchValueArray(input,i)
    }
    if (searchValue.length == 0) { // if search array is empty, show again all pokemon
        document.getElementById('pokedex').innerHTML = ''
        renderedPokemon = 1
        init()
    } else {
        renderSearch()
    }
}


function fillSearchValueArray(input,i) {
    if (pokemonArray[i].toLowerCase().includes(input.value.toLowerCase())) {
        if (input.value.length > 0) {
        searchValue.push(pokemonArray[i])
        }
    }
}


async function renderSearch() {
    console.log(searchValue)
    if (searchValue.length > 0) {
        console.log("test")
        document.getElementById('pokedex').innerHTML = ''
    }
    for (let i = 0; i < searchValue.length; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${searchValue[i]}`
        let response = await fetch(url)
        let responseToJson = await response.json()
        let pokemonNames = responseToJson
        currentPokemon = pokemonNames
        render(currentPokemon)
    }
}