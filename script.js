let currentPokemon
let pokemonArray = []
let pokemonAmount = 21
let renderedPokemon = 1
let searchValueName = []
let loading = false;


async function init() {
    for (renderedPokemon; renderedPokemon <= pokemonAmount; renderedPokemon++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${renderedPokemon}`
        let response = await fetch(url)
        let responseToJson = await response.json()
        currentPokemon = responseToJson
        if (!pokemonArray.includes(currentPokemon.name)) {
            pokemonArray.push(currentPokemon.name)
        }
        render(currentPokemon)
    }
}


window.onscroll = function () {
    let nodeList = document.querySelectorAll('.pokemon-card')
    if (searchValueName.length == 0 && nodeList.length == pokemonAmount) {
        if ((window.innerHeight + window.scrollY + 5) >= document.body.offsetHeight && !loading) {
            console.log(loading)
            loading = true;
            renderedPokemon = pokemonAmount + 1;
            pokemonAmount += 10;
            setTimeout(() => {
                loading = false;
            }, 3000);
            init();
        }
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
        type.innerHTML += `
        <div class="pokemon-type">${currentPokemon.types[i].type.name}</div>
         `
    }
}


function searchPokemon() {
    if (pokemonArray.length == pokemonAmount) {
        for (let i = 1; i <= pokemonArray.length; i++) {
            document.getElementById(`${i}`).classList.remove('d-none')
        }
        searchValueName = []
        let input = document.getElementById('user-search')
        for (let i = 0; i < pokemonArray.length; i++) {
            fillSearchValueArray(input, i)
        }
        if (searchValueName.length == 0 && input.value.length == 0) { // if search array is empty, show again all pokemon
            renderAll()
        } else {
            renderSearch()
        }
    } else {
        console.warn("Warning")
    }
}


function fillSearchValueArray(input, i) {
    if (pokemonArray[i].toLowerCase().includes(input.value.toLowerCase())) {
        if (input.value.length > 0) {
            searchValueName.push(pokemonArray[i])
        }
    }
}


function renderSearch() {
    for (let i = 1; i <= pokemonArray.length; i++) {
        let pokemon = pokemonArray[i - 1];
        if (!searchValueName.includes(pokemon)) {
            document.getElementById(`${i}`).classList.add('d-none')
        }
    }
}


function renderAll() {
    for (let i = 1; i <= pokemonArray.length; i++) {
        document.getElementById(`${i}`).classList.remove('d-none')
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
    if (pokemonID == 0) {
        pokemonID = pokemonAmount
        showPokemon(pokemonID)
    } else {
        showPokemon(pokemonID)
    }
}


function nextPokemon(pokemonID) {
    if (pokemonID == pokemonAmount + 1) {
        pokemonID = 1
        showPokemon(pokemonID)
    } else {
        showPokemon(pokemonID)
    }
}


function renderPokemonType(pokemon) {
    let type = document.getElementById(`detailed-pokemon-type-${pokemon.id}`)
    for (let i = 0; i < pokemon.types.length; i++) {
        type.innerHTML += `
        <div class="pokemon-type">${pokemon.types[i].type.name}</div>
         `
    }
}


function renderPokemonStats(pokemon) {
    let statsContainer = document.getElementById('stats-container')
    for (let i = 0; i < pokemon.stats.length; i++) {
        stats(statsContainer, i, pokemon)
    }
    let abilitiesContainer = document.getElementById('abilities-container')
    for (let i = 0; i < pokemon.abilities.length; i++) {
        abilities(abilitiesContainer, i, pokemon)
    }
    let generalInfoContainer = document.getElementById('general-info-container')
    generalInfo(generalInfoContainer, pokemon)
}

function stats(statsContainer, i, pokemon) {
    let str = pokemon.stats[i].stat.name
    let strToUpperCase = str.charAt(0).toUpperCase() + str.slice(1)
    statBarWidth = (pokemon.stats[i].base_stat / 200) * 100
    statsContainer.innerHTML += renderStats(pokemon, strToUpperCase, i)
}


function abilities(abilitiesContainer, i, pokemon) {
    let str = pokemon.abilities[i].ability.name
    let strToUpperCase = str.charAt(0).toUpperCase() + str.slice(1)
    abilitiesContainer.innerHTML += renderAbilities(strToUpperCase)
}


function generalInfo(generalInfoContainer, pokemon) {
    expBarWidth = (pokemon.base_experience / 400) * 100
    heightBarWidth = (pokemon.height / 30) * 100
    weightBarWidth = (pokemon.weight / 2500) * 100
    generalInfoContainer.innerHTML += renderGeneralInfo(pokemon)
}


function hideDetails() {
    document.getElementById('overlay').classList.add('d-none')
}


function dontClose(event) {
    event.stopPropagation()
}