const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
let loadPokemonFrom = 0;
let pokemonsAPI;
const typeColors = [
	{ name: "water", color: "#3399FF", img: "./img/water.png" },
	{ name: "fire", color: "#FF4422", img: "./img/fire.png" },
	{ name: "grass", color: "#77CC55", img: "./img/grass.png" },
	{ name: "electric", color: "#FFCC33", img: "./img/electric.png" },
	{ name: "normal", color: "#AAAA99", img: "./img/normal.png" },
	{ name: "poison", color: "#AA5599", img: "./img/poison.png" },
	{ name: "ground", color: "#DD7744", img: "./img/ground.png" },
	{ name: "rock", color: "#BBAA66", img: "./img/rock.png" },
	{ name: "bug", color: "#AABB22", img: "./img/bug.png" },
	{ name: "ghost", color: "#6666BB", img: "./img/ghost.png" },
	{ name: "steel", color: "#AAAABB", img: "./img/steel.png" },
	{ name: "fairy", color: "#EE99AC", img: "./img/fairy.png" },
	{ name: "fighting", color: "#BB5544", img: "./img/fighting.png" },
	{ name: "psychic", color: "#FF5599", img: "./img/psychic.png" },
	{ name: "ice", color: "#66CCFF", img: "./img/ice.png" },
	{ name: "dragon", color: "#7766EE", img: "./img/dragon.png" },
	{ name: "dark", color: "#775544", img: "./img/dark.png" },
	{ name: "flying", color: "#8899FF", img: "./img/flying.png" },
];
const typeColor2 = {
	water: "#3399FF",
	fire: "#FF4422",
	grass: "#77CC55",
	electric: "#FFCC33",
	normal: "#AAAA99",
	poison: "#AA5599",
	ground: "#DD7744",
	rock: "#BBAA66",
	bug: "#AABB22",
	ghost: "#6666BB",
	steel: "#AAAABB",
	fairy: "#EE99AC",
	fighting: "#BB5544",
	psychic: "#FF5599",
	ice: "#66CCFF",
	dragon: "#7766EE",
	dark: "#775544",
	flying: "#8899FF",
};

async function init() {
	await callingPokemon();
	loadingPokemons();
	console.log(pokemonsAPI);
}

async function callingPokemon() {
	const spinnerContainer = document.getElementById("spinnerContainer");
	const spinner = document.getElementById("pokemon-ball-spinner");
	try {
		//Show spinner
		spinnerContainer.style.display = "flex";
		spinner.classList.add("spinner-animation");
		let response = await fetch(
			`${BASE_URL}?limit=12&offset=${loadPokemonFrom}.`
		);
		pokemonsAPI = await response.json();
		//Hidden spinner
		spinnerContainer.style.display = "none";
		spinner.classList.remove("spinner-animation");
	} catch (error) {
		console.log(error);
		//Hidden spinner
		spinnerContainer.style.display = "none";
		spinner.classList.remove("spinner-animation");
	}
}

async function loadingPokemons() {
	for (let i = 0; i < pokemonsAPI.results.length; i++) {
		const pokemon = pokemonsAPI.results[i];
		let pokemonData = await getPokemonData(pokemon.url);
		let getPokemonColorPhoto = pokemonColor(pokemonData);
		LoadingOnePokemon(pokemonData, getPokemonColorPhoto);
		renderTypesPokemon(pokemonData.id, getPokemonColorPhoto);
	}
}

function LoadingOnePokemon(pokemonData, getPokemonColorPhoto) {
	const pokemonList = document.getElementById("pokemonList");
	pokemonList.innerHTML += /*html*/ `
    <div class="card" style="width: 15rem; background-color: ${getPokemonColorPhoto[0]["color"]}">
      <h5 class="card-title p-2 text-center position-relative">
        <span class="pokemonId-card position-absolute">#${pokemonData.id}</span>
        <span class="first-letter-uppercase">${pokemonData.name}</span>
      </h5>
      <div class="container-img-card"></div>
      <img
        src="${pokemonData.sprites.front_default}"
        class="card-img-top img-pokemon"
        alt="${pokemonData.name}"
      />
      <div id="types-pokemon${pokemonData.id}"
        class="pokemon-ability card-body d-flex justify-content-center align-items-center gap-3"
      ></div>
    </div>
  `;
}

async function getPokemonData(url) {
	let response = await fetch(url);
	let pokemonData = await response.json();
	return pokemonData;
}

function pokemonColor(pokemonData) {
	//onsole.log(pokemonData.types);
	let getPokemonType = [];
	let pokemonColorPhoto = [];
	for (let i = 0; i < pokemonData.types.length; i++) {
		const type = pokemonData.types[i].type.name;
		getPokemonType.push(type);
	}
	//console.log(getPokemonType);
	for (let j = 0; j < getPokemonType.length; j++) {
		const typeElement = getPokemonType[j];
		let t = typeColors.findIndex((type) => type.name == typeElement);
		pokemonColorPhoto.push(typeColors[t]);
	}
	return pokemonColorPhoto;
}

function renderTypesPokemon(idContainer, getPokemonColorPhoto) {
	console.log(getPokemonColorPhoto);
	const typesPokemonContainer = document.getElementById(
		`types-pokemon${idContainer}`
	);
	for (let index = 0; index < getPokemonColorPhoto.length; index++) {
		const type = getPokemonColorPhoto[index];
		console.log(type);
		typesPokemonContainer.innerHTML += /*html*/ `
    <figure class="d-flex justify-content-center flex-column align-items-center mb-0">
      <img class="type-pokemon-img" src="${type.img}" alt="${type.name}">  
      <figcaption>
        ${type.name}
      </figcaption>
    </figure>
      
    `;
	}
}
