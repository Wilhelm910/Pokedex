function renderPokemonCardNameAndImg(currentPokemon, strToUpperCase) {
    return /*html*/ `  
    <div onclick="showPokemon(${currentPokemon.id})" class="pokemon-card" id="${currentPokemon.id}">
        <div class="pokemon-name">#${currentPokemon.id.toString().padStart(3, '0')} <b>${strToUpperCase}</b></div>
        <div class="pokemon-img-container">
            <img class="pokemon-img" src="${currentPokemon.sprites.other.dream_world.front_default}">
        </div>
        <div class="pokemon-type-container" id="type-${currentPokemon.id}"></div>
    </div>
    `
}


function renderPokemon(pokemon, strToUpperCase) {
    return /*html*/ `
    <div class="pokemon-card-detail" id="detailed-pokemon-${pokemon.id}">
    <div class="flexrow">
        <div class="absolute hover" onclick="hideDetails()"><p>X</p></div>
        <div>
            <div class="pokemon-name">#${pokemon.id.toString().padStart(3, '0')} <b>${strToUpperCase}</b></div>
            <div class="pokemon-type-container" id="detailed-pokemon-type-${pokemon.id}"></div>
        </div>
    </div>
    
        
        <div class="img-section">
            
            <div class="arrow-container-pokemon-prev hover"><img onclick="previousPokemon(${pokemon.id} - 1)" class="arrow-previous" src="./img/nachster.png"></div>
                <div class="pokemon-img-container">
                    <img class="pokemon-img" src="${pokemon.sprites.other.dream_world.front_default}">
                </div>
            <div class="arrow-container-pokemon-next hover"><img onclick="nextPokemon(${pokemon.id} + 1)" class="arrow-next" src="./img/nachster.png"></div>
        </div>
        <div class="stats-section">
        <div class="arrow-container-stats-prev hover small"><img onclick="changeStatsLeft()" class="arrow-previous" src="./img/nachster.png"></div>
            <div id="pokemon-stats">
                <div id="stats-container"></div>
                <div id="abilities-container" class="d-none"></div>
                <div id="general-info-container" class="d-none"></div>
            </div>
            <div class="arrow-container-stats-next hover small"><img onclick="changeStatsRight()" class="arrow-next" src="./img/nachster.png"></div>
        <div>
    </div>
    `
}


function renderStats(pokemon, strToUpperCase, i) {
    return /*html*/ `
    <div class="stat-container">
        <div class="stat-name">${strToUpperCase}</div>
        <div class="stat"> <div class="stat-bar" style="width:${statBarWidth}%">${pokemon.stats[i].base_stat}</div></div>
    </div>
`
}


function renderAbilities(strToUpperCase) {
    return /*html*/ `
        <div class="abilities-container">
            <div class="stat"> <div class="stat-bar">${strToUpperCase}</div></div>
        </div>
`
}


function renderGeneralInfo(pokemon) {
    return  /*html*/ `  
    <div class="stat-container">
        <div class="stat-name">Base-Experience</div>
        <div class="stat"> <div class="stat-bar" style="width:${expBarWidth}%">${pokemon.base_experience}</div></div>
    </div> 
    <div class="stat-container">
        <div class="stat-name">Height</div>
        <div class="stat"> <div class="stat-bar" style="width:${heightBarWidth}%">${pokemon.height}</div></div>
    </div> 
    <div class="stat-container">
        <div class="stat-name">Weight</div>
        <div class="stat"> <div class="stat-bar" style="width:${weightBarWidth}%">${pokemon.weight}</div></div>
    </div> 
`
}