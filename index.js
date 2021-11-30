const quoteContainer = document.getElementById('container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = []

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function showQuote(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQuote(){
    loading();
    let index = Math.floor(Math.random() * apiQuotes.length);
    let quote = apiQuotes[index];
    if(quote.text.length > 80){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    if(quote.author){
        authorText.textContent = quote.author;
    }else{
        authorText.textContent = 'Unknown'
    }
    showQuote();
}


async function getQuote(){
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch(error){
        // Catch Error Here
        console.log(error);
    } 
}

function tweetQuote(){
    const tweetURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(tweetURL,'_blank');
}

twitterBtn.addEventListener('click',tweetQuote);
newQuoteBtn.addEventListener('click',newQuote);

getQuote();