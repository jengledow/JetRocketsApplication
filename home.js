let availableDiscs = [];
let index = 0;
let limit = 20;

async function getDiscs() {
	let discs = await fetch('https://discit-api.fly.dev/disc');
	discs = await discs.json();
	return discs;
}

async function load() {
	availableDiscs = await getDiscs();

	next();
}

function buildDisc(disc) {
	let div = document.createElement("div"); 
	let discImage = document.createElement("img");
	discImage.src = disc.pic;
	discImage.alt = disc.name;

	div.addEventListener('click', () => {
		bagDisc(disc);
	})
	div.append(discImage);
	return div;
}

function bagDisc(disc) {
	let div = document.createElement("div");
	let name = document.createElement("h3");
	div.append(name);
	document.getElementById("bagOfDiscs").append(div);
}

function loadDiscSelection() {
	document.getElementById("selection").replaceChildren();
	for(let i = index; i < index + limit; i++){
		let disc = buildDisc(availableDiscs[i]);
		document.getElementById("selection").append(disc);
	}
}

function next() {
	console.log(index, limit);
	loadDiscSelection();
	index += limit;
}

function prev() {
	index -= limit;
	loadDiscSelection();
}

window.onload = function() {
	load();
}