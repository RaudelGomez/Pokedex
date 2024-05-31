function LoadingOnePokemonHTML(pokemonData, getPokemonColorPhoto) {
	return /*html*/ `
    <div id="card${
			pokemonData.id
		}" class="card" style="width: 15rem; background-color: ${
		getPokemonColorPhoto[0]["color"]
	}" onclick="openImg('id${pokemonData.id}')">
      <h5 class="card-title p-2 text-center position-relative">
        <span class="pokemonId-card position-absolute">#${pokemonData.id}</span>
        <span class="first-letter-uppercase">${pokemonData.name}</span>
      </h5>
      <div class="container-img-card"></div>
      <img
        src="${
					pokemonData.sprites?.other.dream_world.front_default
						? pokemonData.sprites?.other.dream_world.front_default
						: pokemonData.sprites?.other.home.front_default
						? pokemonData.sprites?.other.showdown.front_default
						: pokemonData.sprites?.front_default
				}"
        class="card-img-top img-pokemon"
        alt="${pokemonData.name}"
        onclick="openImg('${pokemonData.id}')"
      />
      <div id="types-pokemon${pokemonData.id}"
        class="pokemon-types card-body d-flex justify-content-center align-items-center gap-3"
      ></div>
    </div>
`;
}

function typesPokemonContainerHTML(pokemonData, type, i) {
	return /*html*/ `
    <figure class="d-flex justify-content-center flex-column align-items-center mb-0" onclick="changeBGColor('${type.color}', ${pokemonData.id})">
      <p id="helpColor${pokemonData.id}${i}" class="d-none position-absolute help-color text-center rounded-1 p-1">Click here<br>to change color</p>
      <img class="type-pokemon-img" src="${type.img}" alt="${type.name}" 
      onmouseover="displayBlock('${pokemonData.id}', '${i}', '${pokemonData.types.length}')" onmouseout="displayNone('${pokemonData.id}', '${i}')">  
      <figcaption>
        ${type.name}
      </figcaption>
    </figure>
    `;
}

function openImgHTML(pokemonData) {
	console.log(pokemonData);
	console.log(colorImgOpen);
	return /*html*/ `<div id="card${
		pokemonData.id
	}" class="card" style="width: 15rem; background-color: ${colorImgOpen}">
    <h5 class="card-title p-2 text-center position-relative">
      <span class="pokemonId-card position-absolute">#${pokemonData.id}</span>
      <span class="first-letter-uppercase">${pokemonData.name}</span>
    </h5>
    <div class="container-img-card"></div>
    <img
      src="${
				pokemonData.sprites?.other.dream_world.front_default
					? pokemonData.sprites?.other.dream_world.front_default
					: pokemonData.sprites?.other.home.front_default
					? pokemonData.sprites?.other.showdown.front_default
					: pokemonData.sprites?.front_default
			}"
      class="card-img-top img-pokemon"
      alt="${pokemonData.name}"
      onclick="openImg('${pokemonData.id}')"
    />
    <div id="types-pokemon${pokemonData.id}"
      class="pokemon-types card-body d-flex justify-content-center align-items-center gap-3"
    ></div>
  </div>
;`;
}
