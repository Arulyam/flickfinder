# FlickFinder
For this simple project, I wanted to make a website that someone could use to browse global movies and create a watchlist for these movies (as long as they don't reload the page!). To do this, I used the [Online Move Database API](https://www.omdbapi.com/) which had access to movie attributes such as runtime, ratings, and plot summaries. 

Anytime a user searches in the search box or filters usinthe dropdowns, the script below makes an API call with thappropriate parameters. It stores the data in a list ofilms. Another API call is made to access title-specifiinformation (runtime, reviews, etc) right before displayinthe list of films as cards on the website.
The user can select "Add to Watchlist" and the film will badded while the button is disabled. The user can then loothrough their watchlist to better understand the total timit would take for them to finish their list.

Currently, the year filter is disabled as its logic is nobuilt into the API and would require further effort from thdeveloper. There is a todo.txt file that lists out main changes that would improve this website significantly.

> **IMPORTANT NOTE:** Our API Key is NOT secure!! The only way to secure the API Key is to complete the API requests in the backend, which is beyond this project's scope. One naive way to "secure" the API key is to use a random num generator with a seed that will search from a large array, typecasting numbers to characters. However, if anyone was to peek at the code, this would be equivalent to no protection.

<br /><br />
		
## Original Prompt 

### Instructions
Task: Build an HTML, CSS, and JavaScript project that utilizes at least one third party API. Your project should receive data from an API and do something with that data. Aside from that, there are no specific technical requirements for this level up. You will have complete creative ownership over what you build!

In the **Resources** section below, there's a link to a huge list of public APIs you can use in your project. Feel free to select any API from that list. If you have trouble deciding on an API to use, we've also curated a short list of fun API suggestions you can choose from.

### Requirements
1. Build an HTML, CSS, and JavaScript project that utilizes at least one third party API. 

2. At the top of your `script.js` file you'll notice we've left you an empty multiline comment. When you are ready to submit, create a write-up that's a few sentences or paragraphs in the comment to walk your grader through your project. The main points to discuss are:

	- Which API did you use? Why did you choose that one?
	- How did you interact with the API, technically?
	- What does your project do/how does it work?
	- If you were going to keep coding this project, what would you build next?

### Resources

#### [Gigantic List of Public APIs](https://github.com/public-apis/public-apis)
_(Note: while all the APIs listed above are public and free to use, some of them require authorization to access. For simplicity we recommend using an API with no "Auth" required. Authorization is used to identify which project is making a call and prevent abuse of the service. If the API you choose requires authorization, the page may mention an API key or refer to "Auth". Follow the steps on the API's website to generate a key and add it to your request URL in the designated place.)_

Having trouble deciding on an API to use? Here's a short, curated list of APIs to give you a few ideas:

- [TV Maze API](https://www.tvmaze.com/api) (tv show data)
- [Open Library API](https://openlibrary.org/developers/api) (lots of resources)
- [PokéAPI](https://pokeapi.co/) (yep, it's Pokemon!)
- [Star Wars API](https://swapi.dev/) (Star Wars data!)
- [NASA Image and Video Library](https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf) (space pics)
- [The MealDB API](https://www.themealdb.com/api.php) (recipe and meal data)

Good luck and happy coding! 🤓