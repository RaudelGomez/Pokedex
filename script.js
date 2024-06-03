const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
let loadPokemonFrom = 0;
let quantityPokemons = 3;
let pokemonsAPI;
let allPokemonsAPI;
let namePokemons = [];
let colorImgOpen = "";
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

let showingNumberOfPage = 0;
let currentPage = 1;
let firstNumberPagination = 1;

async function init() {
	await getAllPokemons(loadPokemonFrom, quantityPokemons);
	await loadingPokemons();
	getPagination();
	await savingNamePokemonArray();
}

async function getAllPokemons() {
	const spinnerContainer = document.getElementById("spinnerContainer");
	const spinner = document.getElementById("pokemon-ball-spinner");
	try {
		//Show spinner
		spinnerContainer.style.display = "flex";
		spinner.classList.add("spinner-animation");
		let response = await fetch(
			`${BASE_URL}?limit=${quantityPokemons}&offset=${loadPokemonFrom}.`
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
	document.getElementById("pokemonList").innerHTML = "";
	for (let i = 0; i < pokemonsAPI.results.length; i++) {
		const pokemon = pokemonsAPI.results[i];
		let pokemonData = await getPokemonData(pokemon.url);
		let getPokemonColorPhoto = pokemonColor(pokemonData);
		LoadingOnePokemon(pokemonData, getPokemonColorPhoto);
		renderTypesPokemon(pokemonData.id, getPokemonColorPhoto, pokemonData);
	}
}

function LoadingOnePokemon(pokemonData, getPokemonColorPhoto) {
	const pokemonList = document.getElementById("pokemonList");
	pokemonList.innerHTML += /*html*/ `
    ${LoadingOnePokemonHTML(pokemonData, getPokemonColorPhoto)}
  `;
}

async function getPokemonData(url) {
	let response = await fetch(url);
	let pokemonData = await response.json();
	return pokemonData;
}

function pokemonColor(pokemonData) {
	let getPokemonType = [];
	let pokemonColorPhoto = [];
	for (let i = 0; i < pokemonData.types.length; i++) {
		const type = pokemonData.types[i].type.name;
		getPokemonType.push(type);
	}
	for (let j = 0; j < getPokemonType.length; j++) {
		const typeElement = getPokemonType[j];
		let t = typeColors.findIndex((type) => type.name == typeElement);
		pokemonColorPhoto.push(typeColors[t]);
	}
	return pokemonColorPhoto;
}

function renderTypesPokemon(idContainer, getPokemonColorPhoto, pokemonData) {
	const typesPokemonContainer = document.getElementById(
		`types-pokemon${idContainer}`
	);
	for (let i = 0; i < getPokemonColorPhoto.length; i++) {
		const type = getPokemonColorPhoto[i];
		typesPokemonContainer.innerHTML += /*html*/ `
      ${typesPokemonContainerHTML(pokemonData, type, i)}
    `;
	}
}

function changeBGColor(color, id) {
	document.getElementById(`card${id}`).style.backgroundColor = `${color}`;
}

function displayNone(id, i) {
	document.getElementById(`helpColor${id}${i}`).classList.add("d-none");
}

function displayBlock(id, i, numberTypes) {
	if (numberTypes >= 2) {
		document.getElementById(`helpColor${id}${i}`).classList.remove("d-none");
	}
}

async function savingNamePokemonArray() {
	try {
		let response = await fetch(`${BASE_URL}?limit=900&offset=0.`);
		allPokemonsAPI = await response.json();
		for (let i = 0; i < allPokemonsAPI.results.length; i++) {
			const pokemonName = allPokemonsAPI.results[i];
			namePokemons.push({ name: pokemonName.name, url: pokemonName.url });
		}
	} catch (error) {
		console.log(error);
	}
}

function searchingNamePokemon() {
	let namesFound = [];
	let namePoke = document.getElementById("searchPokemon").value;
	if (namePoke.length >= 3) {
		namesFound = namePokemons.filter((name) => name.name.includes(namePoke));
		if (namesFound.length >= 1) {
			loadingPokemonsSearched(namesFound);
		}
	} else {
		loadingPokemons();
	}
}

async function loadingPokemonsSearched(resultsPokemons) {
	document.getElementById("pokemonList").innerHTML = "";
	// console.log(resultsPokemons);
	// console.log(allPokemonsAPI.results);
	for (let i = 0; i < resultsPokemons.length; i++) {
		const pokemon = resultsPokemons[i];
		let pokemonData = await getPokemonData(pokemon.url);
		let getPokemonColorPhoto = pokemonColor(pokemonData);
		LoadingOnePokemon(pokemonData, getPokemonColorPhoto);
		renderTypesPokemon(pokemonData.id, getPokemonColorPhoto, pokemonData);
	}
}

async function openImg(idPokemon) {
	savingCurrentColor(idPokemon);
	let getPokemonColorPhoto;
	try {
		let response = await fetch(`${BASE_URL}/${idPokemon}`);
		thePokemon = await response.json();
		getPokemonColorPhoto = pokemonColor(thePokemon);
	} catch (error) {
		console.log(error);
	}
	let imgPopContainer = document.getElementById("img-pop-container");
	imgPopContainer.classList.add("img-pop-container");
	imgPopContainer.innerHTML = /*html*/ `${openImgHTML(
		thePokemon,
		getPokemonColorPhoto
	)}`;
	renderTypesPokemonOpen(thePokemon, getPokemonColorPhoto);
}

function renderTypesPokemonOpen(pokemonData, getPokemonColorPhoto) {
	let typesPokemonContainerOpen = document.getElementById(`types-pokemon-open`);
	for (let i = 0; i < getPokemonColorPhoto.length; i++) {
		const type = getPokemonColorPhoto[i];
		typesPokemonContainerOpen.innerHTML += /*html*/ `
      ${typesPokemonContainerOpenHTML(pokemonData, type)}
    `;
	}
}

function savingCurrentColor(idPokemon) {
	let pokemonList = document.getElementById("pokemonList");
	let containersCards = pokemonList.querySelectorAll(".card");
	for (const card of containersCards) {
		if (card.id == `card${idPokemon}`) {
			let computedStyle = getComputedStyle(card);
			let backgroundColor = computedStyle.backgroundColor;
			colorImgOpen = backgroundColor;
		}
	}
}
function closeImgOpen(e) {
	console.log(e);
	let imgPopContainer = document.getElementById("img-pop-container");
	imgPopContainer.classList.remove("img-pop-container");
	imgPopContainer.innerHTML = "";
}

function stopPropagation(event) {
	event.stopPropagation();
}

function infoPokemonOpen() {}

/*Pagination */
function getPagination() {
	getPaginationHTML();
	paintingActiveButtonPagination();
	activateDisableButtonBeforePagination();
	activateDisableButtonNextPagination();
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

function pagePaginationHTML() {
	let li = "";
	showingNumberOfPage = currentPage + pokemonsAPI.results.length - 1;
	for (let i = currentPage; i <= showingNumberOfPage; i++) {
		li += `<li class="page-item d-flex"><a class="page-link border-unset" href="#" onclick="showCurrentPokemons('${firstNumberPagination}')">${i}</a></li>`;
	}
	return li;
}

function nextPokemons() {
	currentPage++;
	let lengthPokeArray = pokemonsAPI.results.length;
	paintingActiveButtonPagination(currentPage);
	if (currentPage > showingNumberOfPage) {
		firstNumberPagination = currentPage;
		pagePaginationHTML();
		loadPokemonFrom = firstNumberPagination * lengthPokeArray - lengthPokeArray;
		init();
	}
}

function beforePokemons(loadingSomePokemons) {
	/* loadPokemonFrom = loadingSomePokemons + quantityPokemons;
	firstNumberPagination = firstNumberPagination - 3;
	currentPage--;
	init(); */
}

function paintingActiveButtonPagination() {
	let paginationButtonsContainer = document.getElementById(
		"pagination-buttons-container"
	);
	let liItems = paginationButtonsContainer.querySelectorAll("li");
	//Deactived class active
	for (const li of liItems) {
		if (li.classList.contains("active")) {
			li.classList.remove("active");
		}
	}
	//Activeting class active
	for (const li of liItems) {
		const content = +li.firstChild.innerHTML;
		if (content == currentPage) {
			li.classList.add("active");
		}
	}
}

function showCurrentPokemons(currentNumber) {
	loadPokemonFrom = currentNumber * quantityPokemons - quantityPokemons;
	console.log(currentNumber);
	/**Arreglar el current number aqui */
	currentPage = currentNumber;
	init();
}

function activateDisableButtonBeforePagination() {
	if (currentPage == 1) {
		document.getElementById("link-previous-pokemon").classList.add("disabled");
	}
}

function activateDisableButtonNextPagination() {
	if (pokemonsAPI.next === null) {
		document.getElementById("link-next-pokemon").classList.add("disabled");
	}
}

// function getPaginationHTML() {
// 	let paginationContainer = document.getElementById("paginationContainer");
// 	paginationContainer.innerHTML = "";

// 	paginationContainer.innerHTML += /*html*/ `
//       <ul id="pagination" class="pagination">
//           <li id="link-previous-pokemon" class="page-item ${
// 						currentPage === 1 ? "disabled" : ""
// 					}">
//               <a class="page-link link-load-pokemons" href="#" onclick="beforePokemons(event)">Previous</a>
//           </li>
//           <ul id="pagination-buttons-container" class="pagination">
//               ${pagePaginationHTML()}
//           </ul>
//           <li id="link-next-pokemon" class="page-item ${
// 						pokemonsAPI.next === null ? "disabled" : ""
// 					}">
//               <a class="page-link" href="#" onclick="nextPokemons(event)">Next</a>
//           </li>
//       </ul>
//   `;
// }

// function pagePaginationHTML() {
// 	let li = "";
// 	showingNumberOfPage =
// 		currentPage + Math.ceil(pokemonsAPI.results.length / quantityPokemons) - 1;
// 	for (let i = currentPage; i <= showingNumberOfPage; i++) {
// 		li += `<li class="page-item ${
// 			i === currentPage ? "active" : ""
// 		}"><a class="page-link border-unset" href="#" onclick="showCurrentPokemons(${i})">${i}</a></li>`;
// 	}
// 	return li;
// }

// async function nextPokemons(e) {
// 	e.preventDefault();
// 	if (pokemonsAPI.next !== null) {
// 		currentPage++;
// 		loadPokemonFrom += quantityPokemons;
// 		await init();
// 	}
// }

// async function beforePokemons(e) {
// 	e.preventDefault();
// 	if (currentPage > 1) {
// 		currentPage--;
// 		loadPokemonFrom -= quantityPokemons;
// 		await init();
// 	}
// }

// function paintingActiveButtonPagination() {
// 	let paginationButtonsContainer = document.getElementById(
// 		"pagination-buttons-container"
// 	);
// 	let liItems = paginationButtonsContainer.querySelectorAll("li");
// 	//Deactived class active
// 	for (const li of liItems) {
// 		if (li.classList.contains("active")) {
// 			li.classList.remove("active");
// 		}
// 	}
// 	//Activeting class active
// 	for (const li of liItems) {
// 		const content = +li.firstChild.innerHTML;
// 		if (content == currentPage) {
// 			li.classList.add("active");
// 		}
// 	}
// }

// async function showCurrentPokemons(page) {
// 	currentPage = page;
// 	loadPokemonFrom = (page - 1) * quantityPokemons;
// 	await init();
// }

// function activateDisableButtonPagination() {
// 	if (currentPage == 1) {
// 		document.getElementById("link-previous-pokemon").classList.add("disabled");
// 	}
// }
