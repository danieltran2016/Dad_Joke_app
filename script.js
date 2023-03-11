var quoteRep = document.querySelector("#quote");
var showHis = document.querySelector("#history");
var button = document.querySelector('#btn'); //this is the button to run the quote API and storage function 
var clear = document.querySelector('#clear'); //this is a clear button to clear the local storage 
var historyList = document.querySelector("#history-list"); //this is the history list to show the previous quotes
var allQuotes = []; //this is the inittial empty quotes array 

function init(){
var storedQuotes = JSON.parse(localStorage.getItem("data"))
console.log(storedQuotes)
if (storedQuotes !== null) { //if stored quotes IS NOT null than.... 
  allQuotes = storedQuotes; // set all quotes equal to the stored quote 
  console.log(allQuotes) //this is checking the value of allquotes 
}
  renderQuotes(); 
}

function renderQuotes() {
  historyList.innerHTML = ""; //clears the history list 
console.log(allQuotes);
  for (var i = 0; i < allQuotes.length; i++) { //for i equal to the length of allquotes 
    var quotes = allQuotes[i]; 
console.log(quotes);
    var li = document.createElement("li"); //creates a list element for this run through of the renderquotes function 
    li.textContent = quotes; //changes the list content to the quote content 
    li.setAttribute("data-index", i); //adds attribute to the new list content 
    historyList.appendChild(li); //adds the list element to the history list 
  }
}
init()

function storeQuotes() {
  localStorage.setItem("data", JSON.stringify(allQuotes)); //this stringifies the allquotes and sets it to the local storage 
}

button.addEventListener('click',async function getQuote() {
    const response = await fetch("https://icanhazdadjoke.com/slack", {method: "get", headers: {"Content-type": "application/json"} });
   const data= await response.json() 
   console.log(data)
   quoteRep.textContent = data.attachments[0].text; //this sets the text content of the quoterep to the response of the api 
   allQuotes.push(data.attachments[0].text) //this pushes the next quote into the array of all the quotes 
  storeQuotes()
  renderQuotes()
  });

clear.addEventListener("click", function(){

  localStorage.clear(); //this clears the local storage 
  location.reload(); // this refreshes the page. 
})


