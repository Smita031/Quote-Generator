//using async func to fetch request for quote with try-catch statements.

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButtom = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//Add loader func to show the page loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function completeLoading() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//create new function newQuote which show new quote on every single click
function newQuote() {
    loading();
    //pick a random quote at a time from apiQuotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // authorText.textContent = quote.author;
    //Check if author field is blank/null/anonymous, replace it with "Unknown"
    if (quote.author === "Anonymous") {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    //Check quote length to determine styling, if quote length>100, long-quote style will be applied on thoses
    if (quoteText.length > 30) {
        quoteText.classList.add("long-quote")
    } else {
        quoteText.classList.remove("long-quote")
    }
    quoteText.textContent = quote.text;
    completeLoading();
}

//get quotes from an API
async function getQuotes() {
    loading();
    const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try {
        const response = await fetch(apiURL)
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // we catch error here, if any
        //alert(error)/Toast(error) etc
        console.log(error);
    }
}

//need a function to tweet quotes on twitter platform
function tweetQuotes() {
    //using backtick to make url a template string
    const twitterURL = `https://twitter.com/intent/tweet?text= ${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

//add Event listners for twitter and New Quote buttons to work
newQuoteButtom.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuotes);

//below func create to get quotes from quotes.js file directly and not through an API.
// function getLocalQuotes() {
//     //pick a random quote at a time from localQuotes
//     const localQuotesArray = localQuotes[0] //Todo extra step coz localQuotes is an array containing array of objects
//     const quote = localQuotesArray[Math.floor(Math.random() * localQuotesArray.length)];
//     console.log(quote)
// }

//on Load, run getQuotes() func as soon as the page loads
getQuotes();
//getLocalQuotes()