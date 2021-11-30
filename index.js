const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');


let apiQuotes = []

function newQuote(){
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
}

async function getQuote(){
    const apiURL = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
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