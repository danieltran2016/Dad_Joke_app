var quoteRep = document.querySelector("#quote");
var showHis = document.querySelector("#history");
var button = document.querySelector('#btn');
var clear = document.querySelector('#clear');


var historyList = document.querySelector("#history-list");
var allQuotes = [];

function init(){
var storedQuotes = JSON.parse(localStorage.getItem("data"))
console.log(storedQuotes)
if (storedQuotes !== null) {
  allQuotes = storedQuotes;
  console.log(allQuotes)
}
  renderQuotes();
}

function renderQuotes() {
  // Clear todoList element and update todoCountSpan
  historyList.innerHTML = "";
console.log(allQuotes);
  // Render a new li for each todo
  for (var i = 0; i < allQuotes.length; i++) {
    var quotes = allQuotes[i];
console.log(quotes);
    var li = document.createElement("li");
    li.textContent = quotes;
    li.setAttribute("data-index", i);
    historyList.appendChild(li);
  }
}
init()

function storeQuotes() {
  // Stringify and set key in localStorage to todos array
  localStorage.setItem("data", JSON.stringify(allQuotes));
}

button.addEventListener('click',async function getQuote() {
    const response = await fetch("https://icanhazdadjoke.com/slack", {method: "get", headers: {"Content-type": "application/json"} });
   const data= await response.json() 
   console.log(data)
   quoteRep.textContent = data.attachments[0].text;
   allQuotes.push(data.attachments[0].text)
  storeQuotes()
  renderQuotes()
  });

clear.addEventListener("click", function(){

  localStorage.clear();
  location.reload();
})


