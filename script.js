const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
let loadPokemonFrom = 1;
let pokemonsAPI;
const typeColors = {
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
	const spinner = document.getElementById("spinner");
	try {
		//Show spinner
		spinner.style.display = "flex";
		let response = await fetch(
			`${BASE_URL}?limit=12&offset=${loadPokemonFrom}.`
		);
		pokemonsAPI = await response.json();
		//Hidden spinner
		spinner.style.display = "none";
	} catch (error) {
		console.log(error);
		//Hidden spinner
		spinner.style.display = "none";
	}
}

async function loadingPokemons() {
	for (let i = 0; i < pokemonsAPI.results.length; i++) {
		const pokemon = pokemonsAPI.results[i];
		let pokemonData = await getPokemonData(pokemon.url);
		let getPokemonColor = pokemonColor(pokemonData);
		LoadingOnePokemon(pokemonData, getPokemonColor);
	}
}

function LoadingOnePokemon(pokemonData, getPokemonColor) {
	console.log(pokemonData);
	const pokemonList = document.getElementById("pokemonList");
	pokemonList.innerHTML += /*html*/ `
    <div class="card" style="width: 15rem; background-color: ${getPokemonColor}">
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
      <div
        class="pokemon-ability card-body d-flex justify-content-center align-items-center gap-3"
      >
        <img class="ability" src="./img/grass.png" alt="">
        <img class="ability" src="./img/poison.png" alt="">
      </div>
    </div>
  `;
}

async function getPokemonData(url) {
	let response = await fetch(url);
	let pokemonData = await response.json();
	return pokemonData;
}

function pokemonColor(pokemonData) {
	let getPokemonType = pokemonData.types[0].type.name;
	let color = typeColors[getPokemonType] || "#AAAA99";
	return color;
}

/* let promiseError = false;
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png
function getPromise() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (promiseError) {
				reject("hat nicht geklappt1");
			} else {
				resolve("hat geklappt1");
			}
		}, 2000);
	});
} */
