function LoadingOnePokemonHTML(pokemonData, getPokemonColorPhoto) {
	return /*html*/ `
    <div id="card${pokemonData.id}" class="card" style="width: 15rem; background-color: ${getPokemonColorPhoto[0]["color"]}" >
      <h5 class="card-title p-2 text-center position-relative cards-headline d-flex">
        <span class="pokemonId-card">#${pokemonData.id}</span>
        <span class="first-letter-uppercase text-center align-content-center flex-grow-1 card-headline-name">${pokemonData.name}</span>
      </h5>
      <img
        src="${
					pokemonData.sprites.other.dream_world?.front_default
						? pokemonData.sprites.other.dream_world?.front_default
						: pokemonData.sprites?.front_default
				}"
        class="card-img-top img-pokemon" alt="${pokemonData.name}" onclick="openImg('${pokemonData.id}')"
      />
      <div id="types-pokemon${pokemonData.id}" class="pokemon-types card-body d-flex justify-content-center align-items-center gap-3"></div>
    </div>
`;
}

function typesPokemonContainerHTML(pokemonData, type, i) {
	return /*html*/ `
    <figure class="d-flex justify-content-center flex-column align-items-center mb-0" onclick="changeBGColor('${type.color}', ${pokemonData.id})">
      <p id="helpColor${pokemonData.id}${i}" class="d-none position-absolute help-color text-center rounded-1 p-1">Click here<br>to change color</p>
      <img class="type-pokemon-img" src="${type.img}" alt="${type.name}" onmouseover="displayBlock('${pokemonData.id}', '${i}', '${pokemonData.types.length}')" onmouseout="displayNone('${pokemonData.id}', '${i}')">  
      <figcaption>${type.name}</figcaption>
    </figure>
    `;
}

function openImgHTML(pokemonData, color) {
	if (!color) {color = colorImgOpen;}
	return /*html*/ `
    <div class="arrow-container" onclick="stopPropagation(event)">
      <svg id="arrow-left" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-left-circle-fill arrow-slide" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" onclick="beforePokemon(${pokemonData.id})"/>
      </svg>
    </div>
    <div id="cardOpen${pokemonData.id}" class="card" style="width: 15rem; background-color: ${color}; padding: 0.09rem;" onclick="stopPropagation(event)">
      <h5 class="card-title p-2 text-center position-relative cards-headline d-flex">
        <span class="pokemonId-card">#${pokemonData.id}</span>
        <span class="first-letter-uppercase text-center align-content-center flex-grow-1 card-headline-name">${pokemonData.name}</span>
      </h5>
      <img
        src="${
					pokemonData.sprites.other.dream_world?.front_default
						? pokemonData.sprites.other.dream_world?.front_default
						: pokemonData.sprites?.front_default
				}"
        class="card-img-top img-pokemon" alt="${pokemonData.name}"
      />
      <div id="types-pokemon-open" class="pokemon-types card-body d-flex justify-content-center align-items-center gap-3 p-2"></div>
      <div id="info-pokemon-open"></div>
    </div>
    <div class="arrow-container" onclick="stopPropagation(event)">
      <svg id="arrow-right" xmlns="http://www.w3.org/2000/svg"fill="currentColor" class="bi bi-arrow-right-circle-fill arrow-slide" viewBox="0 0 16 16" onclick="nextPokemon(${pokemonData.id})">
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
      </svg>
    </div>
  `;
}

function typesPokemonContainerOpenHTML(type) {
	return /*html*/ `
    <figure class="d-flex justify-content-center flex-column align-items-center mb-0">
      <img class="type-pokemon-img-open" src="${type.img}" alt="${type.name}">  
      <figcaption>${type.name}</figcaption>
    </figure>
    `;
}

function infoPokemonOpenHTML(thePokemon) {
	return /*html*/ `
  <div class="bg-color-info-card">
    <div class="d-flex info-headline">
      <p id="menu-info-main" class="text-center flex-grow-1 mb-0 headline-border-bottom active-info p-2" onclick="showInfo('info-main')">main</p>
      <p id="menu-info-stats" class="text-center flex-grow-1 mb-0 headline-border-bottom p-2" onclick="showInfo('info-stats')">stats</p>
      <p id="menu-info-evo" class="text-center flex-grow-1 mb-0 headline-border-bottom p-2" onclick="showInfo('info-evo')">evo-from</p>  
    </div>
    <div id="info-pokemon" class="p-2">
      ${mainInfoHTML(thePokemon)}
      <div id="info-stats" class="info-stats d-none"></div>
      <div id="info-evo" class="info-evo d-none d-flex flex-column justify-content-center align-items-center">
    </div>
  </div>
  `;
}

function mainInfoHTML(thePokemon) {
	return /*html*/ `
    <div id="info-main" class="info-main">
        <p class="d-flex mb-1"><span>Height:</span> <span class="flex-grow-1">${thePokemon.height / 10} m</span></p>
        <p class="d-flex mb-1"><span>Weight:</span><span>${thePokemon.weight / 100} Kg</span> </p>
        <p class="d-flex mb-1"><span>Experience:</span><span>${thePokemon.base_experience}</span></p>
        <p class="d-flex mb-1">
          <span>Abilities:</span>
          <span id="abilities"></span>
        </p>
    </div>
  `;
}

function getPaginationHTML() {
	let paginationContainer = document.getElementById("paginationContainer");
	paginationContainer.innerHTML = "";
	paginationContainer.innerHTML += /*html*/ `
    <ul id="pagination" class="pagination">
      <li id="link-previous-pokemon" class="page-item">
        <a  class="page-link link-load-pokemons" onclick="beforePokemons()">Previous</a>
      </li>
      <ul id="pagination-buttons-container" class="pagination">
        ${pagePaginationHTML()}
      </ul>
      <li id="link-next-pokemon" class="page-item">
        <a class="page-link" href="#" onclick="nextPokemons()">Next</a>
      </li>
    </ul>
  `;
}
