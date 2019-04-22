/*
 * Create a list that holds all of your cards
 */

let listOfCards = [
    "fa fa-anchor",
    "fa fa-anchor",
    "fa fa-bicycle",
    "fa fa-bicycle",
    "fa fa-bolt",
    "fa fa-bolt",
    "fa fa-bomb",
    "fa fa-bomb",
    "fa fa-cube",
    "fa fa-cube",
    "fa fa-diamond",
    "fa fa-diamond",
    "fa fa-leaf",
    "fa fa-leaf",
    "fa fa-paper-plane-o",
    "fa fa-paper-plane-o"
];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// store the HTML of the shuffled card
let cardsHtml = '';

const resetButton = document.querySelector('.restart');

function initGame() {
    buildGameBoard();
    resetButton.insertAdjacentHTML('afterend',`<div class="time">00:00</div>`);
}

// Display the cards on the page
function buildGameBoard() {
    listOfCards = shuffle(listOfCards);

// loop through each card and create its HTML
    listOfCards.forEach(function(element) {
        cardsHtml += `<li class="card">
                          <i class="${element}"></i>
                      </li>`;
    });

    deck.innerHTML = cardsHtml;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// define an array to match the opened cards
let openedCards = [];

let matchedCardsCounter = 0;

let moveCounter = 0;
const moves = document.querySelector('.moves');

const stars = document.querySelectorAll('.fa-star');

const deck = document.querySelector('.deck');
deck.addEventListener('click', openCard);

initGame();

// Display timer on the score panel
let seconds = 0;
let minutes = 0;

const timer = document.querySelector('.time');
const intervalID = setInterval(function calculateTime() {

    let formatedSeconds = ("0" + seconds).slice(-2);
    let formatedMinutes = ("0" + minutes).slice(-2);

    seconds += 1;

    if (seconds === 60) {
        seconds = 0;
        minutes += 1;
    }

    timer.innerText = `${formatedMinutes}:${formatedSeconds}`

}, 1000);

// Display the card's symbol & add the card to a *list* of "openedCards" then call "matchCards" function
function openCard(evt) {
    if (openedCards.length < 2) {
        evt.target.classList.add('open', 'show');
        openedCards.push(evt.target);
        updateMoves();
        matchCards();
    }
}

// Check if the cards do match, lock the cards. if not call "unmatchedCards"
function matchCards() {
    if (openedCards.length > 1) {
        if (openedCards[0].firstElementChild.className === openedCards[1].firstElementChild.className) {
            openedCards[0].className = 'card match';
            openedCards[1].className = 'card match';
            openedCards = [];

            matchedCardsCounter += 1;

            if (matchedCardsCounter === 8) {
                showWinModal();
            }

        } else {
            setTimeout(unmatchedCards, 1800);
        }
    }
}

// Hide the card's symbol & remove the cards from "openedCards"
function unmatchedCards() {
    openedCards[0].className = 'card';
    openedCards[1].className = 'card';
    openedCards = [];
}

// Increment the move counter and display it on the page then call "rateStars"
function updateMoves() {
    moveCounter += 1;
    moves.textContent = moveCounter;

    rateStars();
}

// Decrease star rating after number of moves
function rateStars() {
    emptyStar = 'fa fa-star-o';
    switch (moveCounter) {
        case 20:
            stars[2].className = emptyStar;
            break;
        case 24:
            stars[1].className = emptyStar;
            break;
        case 28:
            stars[0].className = emptyStar;
            break;
  }
}

function showWinModal() {
    console.log('Congratulation! you Win!');
    clearInterval(intervalID);
}
