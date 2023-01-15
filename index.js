/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i <games.length; i++){
        
        

        // create a new div element, which will become the game card
        const game = document.createElement("div");


        // add the class game-card to the list
        game.classList.add("game-card");


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        const display = `
        <div class="game-card">
        <img class="game-img" src= "${games[i].img}" >
        <h2>
            ${games[i].name}
                </h2>
        <p class="description">${games[i].description}</p>
        <p class="goal"> Pledged: ${games[i].goal}</p>
        <p class="backers"> Goal: ${games[i].backers}</p>
        </div>`;
        game.innerHTML = display;

        // append the game to the games-container
        gamesContainer.appendChild(game)

    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element 
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalIndContributions = GAMES_JSON.reduce( (acc, contribution) => {
    return acc + contribution.backers;
}, 0)


// set the inner HTML using a template literal and toLocaleString to get a number with commas
const cont_display = `
    <div class="indiv-contributions">
    <p class="totalIndContr">${totalIndContributions.toLocaleString('en-US')}</p>
    </div>
    `;
contributionsCard.innerHTML = cont_display;
// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalPledgedAmount = GAMES_JSON.reduce( (acc, money) => {
    return acc + money.pledged;
  }, 0)
// set inner HTML using template literal
const display_raised = `
  <div class = "money-pledged"
  <p class = "totalMoneyPledged">${totalPledgedAmount.toLocaleString('en-US')}</p>
  </div>
  `;
raisedCard.innerHTML = display_raised;
// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const display_allGames = `
  <div class = "total-games"
  <p class = "totalNoOfGames">${11}</p>
  </div>
  `;

gamesCard.innerHTML = display_allGames;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listOfUnfundedGames = GAMES_JSON.filter ( (game) => {
        return game.pledged < game.goal;
      });
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfUnfundedGames);
}
// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let listOfFundedGames = GAMES_JSON.filter ( (game) => {
        return game.pledged >= game.goal;
      });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listOfFundedGames);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let totalUnfunded = GAMES_JSON.filter( (game) => {
    return game.pledged < game.goal;
}, 0).length;

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${totalPledgedAmount.toLocaleString('en-US')} has been raised for 
${GAMES_JSON.length} games. Currently ${totalUnfunded} ${totalUnfunded == 1 ? "game remains" : "games remain"}
unfunded. We need your help to fund these amazing games!`

// create a new DOM element containing the template string and append it to the description container
const paragraph = document.createElement('div');
paragraph.innerHTML = displayStr;
descriptionContainer.appendChild(paragraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const[first, second,...others] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const displayFirstGame = `
<div class = "firstgame"
<p class = "name">${first.name}</p>
<p class = "funding"> Funding: $${first.pledged.toLocaleString('en-US')}</p>
</div>
`;
const firstGame = document.createElement('p');
firstGame.innerHTML = displayFirstGame;
firstGameContainer.appendChild(firstGame);
// do the same for the runner up item
const displaySecondGame = `
<div class = "secondgame"
<p class = "name"> ${second.name}</p>
<p class = "funding">Funding: $${second.pledged.toLocaleString('en-US')}</p>
</div>
`;

const secondGame = document.createElement('p');
secondGame.innerHTML = displaySecondGame;
secondGameContainer.appendChild(secondGame);