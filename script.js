/* 
	Tell us about your project below!👇

		For this LevelUp, I wanted to make a website that someone could use to browse global movies and create a watchlist for these movies (as long as they don't reload the page!). To do this, I used the Online Move Database API (www.omdbapi.com) which had access to movie attributes such as runtime, ratings, and plot summaries. 
		Anytime a user searches in the search box or filters using the dropdowns, the script below makes an API call with the appropriate parameters. It stores the data in a list of films. Another API call is made to access title-specific information (runtime, reviews, etc) right before displaying the list of films as cards on the website.
		The user can select "Add to Watchlist" and the film will be added while the button is disabled. The user can then look through their watchlist to better understand the total time it would take for them to finish their list. 
		Currently, the year filter is disabled as its logic is not built into the API and would require further effort from the developer. There is a todo.txt file that lists out many changes that would improve this website significantly.
	
************* IMPORTANT NOTE ************
Our API Key is NOT secure!! The only way to secure the API Key is to complete the API requests in the backend, which is beyond this project's scope. One naive way to "secure" the API key is to use a random num generator with a seed that will search from a large array, typecasting numbers to characters. However, if anyone was to peek at the code, this would be equivalent to no protection. 
		
*/

const ERR_CODES = Object.freeze({
	success: 0,
	empty: 1,
	tooShort: 2,
	notFound: 3,
	other: 4
});

let FILMS = [];
let ERR_STATUS = ERR_CODES.success;
let WATCH_TIMES = [];

const _inputEmptyHtml = `<p class="userMessage text-center">We can't suggest anything if you don't type anything! ;)</p>`;
const _inputTooShortHtml = `<p class="userMessage text-center">We found too many suggestions with that search. Please try again with a longer search!</p>`;
const _inputNotFoundHtml = `<p class="userMessage text-center">We could not find any suggestions with that search. Please try again with a different search!</p>`;
const _inputOtherErrorHtml = `<p class="userMessage text-center">Hmmm... seems like that search is giving us some issues. Please try again with a different search!</p>`;

// Get data from API
function getData() {
	// Get Search
	const input1 = document.getElementById("movie-input1").value;
	const input2 = document.getElementById("movie-input2").value;
	const input = input1.length >= input2.length ? input1 : input2;
	// Get type filter
	const typeFilterBtnText = document.getElementById("type-filter-btn").innerText.toLowerCase().trim();
	let typeValue = "";
	switch (typeFilterBtnText) {
		case "type": typeValue = ""; break;
		case "movies": typeValue = "movie"; break;
		case "series": typeValue = "series"; break;
	}
	// API Call
	axios.get("https://www.omdbapi.com/?s=" + input.trim().toLowerCase() + "&type=" + typeValue + "&apikey=7c9947e6")
		.catch(function(error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and 
				// an instance of http.ClientRequest in node.js
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}
			console.log(error.config);
		})
		.then(response => {
			console.log("Response object: ");
			console.log(response);
			if (response.data.Response === "True") {
				console.log("API call returned a true response!");
				FILMS = response.data.Search;
				ERR_STATUS = ERR_CODES.success;
				// Filter by year to be done
			} else if (response.data.Response === "False") {
				console.log("API call returned a false response!");
				FILMS = [];
				if (response.data.Error === "Incorrect IMDb ID.") {
					// Search field was empty
					ERR_STATUS = ERR_CODES.empty;
				} else if (response.data.Error === "Too many results.") {
					// Search field was too short
					ERR_STATUS = ERR_CODES.tooShort;
				} else if (response.data.Error === "Movie not found!") {
					// Search field results were empty
					ERR_STATUS = ERR_CODES.notFound;
				} else {
					// Search input was a bad request
					ERR_STATUS = ERR_CODES.other;
				}
			} else {
				console.log("What the sigma?!");
			}
			console.log(FILMS);
			console.log(ERR_STATUS);
			displayData();
		});
}

// Display data in cards
function displayData() {
	console.log("Films being displayed")
	_cardContainer = document.getElementById("entertainment-container");
	_cardContainer.innerHTML = "";
	_errorContainer = document.getElementById("error-text-div");
	_errorContainer.innerHTML = "";
	if (ERR_STATUS === ERR_CODES.success) {
		FILMS.forEach((film) => newFilmCard(film));
	} else if (ERR_STATUS === ERR_CODES.empty) {
		_errorContainer.innerHTML = _inputEmptyHtml;
	} else if (ERR_STATUS === ERR_CODES.tooShort) {
		_errorContainer.innerHTML = _inputTooShortHtml;
	} else if (ERR_STATUS === ERR_CODES.notFound) {
		_errorContainer.innerHTML = _inputNotFoundHtml;
	} else if (ERR_STATUS === ERR_CODES.other) {
		_errorContainer.innerHTML = _inputOtherErrorHtml;
	}
}

// Create New Film Card
function newFilmCard(filmBasic) {
	axios.get("https://www.omdbapi.com/?i=" + filmBasic.imdbID + "&apikey=7c9947e6").then(filmData => {
		console.log(filmData);
		let col = document.createElement("div");
		col.classList.add("col");

		let card = document.createElement("div");
		card.classList.add("card", "h-100", "bg-dark");

		let filmPoster = document.createElement("img");
		filmPoster.src = filmData.data.Poster;
		filmPoster.classList.add("card-img-top", "mb-auto");
		card.appendChild(filmPoster);

		let cardBody = document.createElement("div");
		cardBody.classList.add("card-body", "d-flex", "flex-column");
		card.appendChild(cardBody);

		let filmName = document.createElement("h3");
		filmName.innerText = filmData.data.Title;
		filmName.classList.add("film-title");
		cardBody.appendChild(filmName);

		let filmRuntime = document.createElement("p");
		filmRuntime.innerText = filmData.data.Runtime;
		filmRuntime.classList.add("h4", "film-runtime");
		cardBody.appendChild(filmRuntime);

		let filmPlot = document.createElement("p");
		filmPlot.innerText =
			filmData.data.Plot.length > 120
				? filmData.data.Plot.slice(0, 120) + "..."
				: filmData.data.Plot;
		cardBody.appendChild(filmPlot);

		let addToWatchlist = document.createElement("button");
		addToWatchlist.classList.add("btn", "btn-secondary", "mt-auto");
		addToWatchlist.innerText = "Add to Watchlist";
		addToWatchlist.onclick = function() {
			this.innerText = "In Watchlist";
			this.classList = "btn btn-secondary bg-dark disabled mt-auto";
			// store amount in watchlist total
			WATCH_TIMES.push(Number(filmData.data.Runtime.split(" ")[0]));

			// create new watchlist item container card
			let watchlistItemCard = document.createElement("div");
			watchlistItemCard.classList.add("watchlist-item", "mb-1");

			// add film image thumbnail and append to card
			let watchlistItemThumb = document.createElement("img");
			watchlistItemThumb.src = filmData.data.Poster;
			watchlistItemThumb.alt = filmData.data.Type;
			watchlistItemThumb.classList.add("thumbnail");
			watchlistItemCard.appendChild(watchlistItemThumb);

			// add film name and append to card
			let filmName = document.createElement("strong");
			filmName.innerText = filmData.data.Title;
			watchlistItemCard.appendChild(filmName);

			// add film runtime and append to card
			let runtime = document.createElement("p");
			runtime.innerText = filmData.data.Runtime;
			runtime.classList.add("watchlist-runtime");
			watchlistItemCard.appendChild(runtime);

			// append card to watchlist items container
			document.querySelector(".watchlist-items-container").appendChild(watchlistItemCard);
			// update watchlist total
			let watchlistTotal = WATCH_TIMES.reduce((prev, cur) => prev + cur, 0);
			document.querySelector("#watchlist-time").innerText = watchlistTotal + " min"
			// display watchlist-badge
			let watchlistBadge = document.querySelector("#watchlist-badge");
			if (watchlistBadge.classList.contains("visually-hidden")) {
				watchlistBadge.classList.remove("visually-hidden");
			}
		};
		// append card to watchlist body
		cardBody.appendChild(addToWatchlist);
		// append card to col
		col.appendChild(card);
		// append col to entertainment container
		document.querySelector("#entertainment-container").appendChild(col);
	});
}

// Search Event Listener (Enter and Button)
const _buttonElem1 = document.getElementById("search-button1");
const _searchElem1 = document.getElementById("movie-input1");
const _buttonElem2 = document.getElementById("search-button2");
const _searchElem2 = document.getElementById("movie-input2");

_buttonElem1.addEventListener('click', () => {
	getData();
});

_searchElem1.addEventListener('keyup', (e) => {
	if (e.key == "Enter" ||
		e.code == "Enter" ||
		e.keyCode == 13
	) {
		getData();
	}
});

_buttonElem2.addEventListener('click', () => {
	getData();
});

_searchElem2.addEventListener('keyup', (e) => {
	if (e.key == "Enter" ||
		e.code == "Enter" ||
		e.keyCode == 13
	) {
		getData();
	}
});

// Inupt Event Listener (Match Input)
_searchElem1.addEventListener('input', () => {
	_searchElem2.value = _searchElem1.value;
});

_searchElem2.addEventListener('input', () => {
	_searchElem1.value = _searchElem2.value;
});

// Dropdown Event Listener (Change Text)
const _yearFilterBtn = document.getElementById("year-filter-btn");
const _typeFilterBtn = document.getElementById("type-filter-btn");
//const _yearFilter = document.getElementById("year-filter");
//const _typeFilter = document.getElementById("type-filter");

function changeDropdownText(dropdownType, text) {
	console.log("Dropdown Clicked");
	if (dropdownType === "year") {
		_yearFilterBtn.innerText = text;
	} else if (dropdownType === "type") {
		_typeFilterBtn.innerText = text;
	}
	if (_searchElem1.value.length != 0 || _searchElem2.value.length != 0) {
		getData();
	}
}





