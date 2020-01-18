let conClicks = 0;
let totClicks = 0;
let totMatches = 0;
let firstCard = undefined;
let firstCardValue = undefined;
let firstCardId = undefined;
const valueArray = [];
const picArray = ["candle", "cat", "hands", "harley", "kid", "muffin", "palmtree", "piano", "seattle", "train"];

textInsideBox = document.querySelector("#text-inside");
allCards = document.querySelectorAll("#board img.img-card");
for (let i=1; i<=allCards.length/2; i++) {
    valueArray.push(i);
    valueArray.push(i);
}

for (let i=0; i<allCards.length; i++) {
    let randomPosition = Math.floor(Math.random() * valueArray.length)
    allCards[i].setAttribute("data-cardValue", valueArray[randomPosition]);
    allCards[i].setAttribute("data-cardImg", picArray[valueArray[randomPosition]]);
    valueArray.splice(randomPosition,1);
}

const startButton = document.querySelector("#start-button");
startButton.addEventListener('click', activateBoard);

function activateBoard(){
    startButton.style.display = "none";
    let board = document.querySelector("#board");
    board.addEventListener('click', playGame); 
}

function playGame(){
    if (event.target.tagName === "IMG"){
        let currentCard = event.target;
        let currentCardValue = currentCard.getAttribute("data-cardValue");
        let currentCardId = currentCard.getAttribute("data-cardId");
        let currentCardImg = currentCard.getAttribute("data-cardImg");
        textInsideBox.innerText = `Attempts: ${++totClicks}`;
        conClicks++;
        if (conClicks < 3){
            currentCard.setAttribute("src",`imgs/${currentCardImg}.jpg`);
            if (conClicks == 1) {
                firstCard = currentCard;
                firstCardValue = currentCardValue;
                firstCardId = currentCardId;
            }
            if (conClicks == 2) {
                if (currentCardValue === firstCardValue && currentCardId != firstCardId){
                    totMatches++;
                    if (totMatches === allCards.length/2){
                        textInsideBox.innerText = `Congratulations! \n Game completed in ${totClicks} attempts`;
                        board.removeEventListener('click', playGame);
                        startButton.textContent = "Reload";
                        startButton.style.display = "inline-block";
                        startButton.classList.replace("btn-outline-warning", "btn-warning")
                        startButton.addEventListener('click', function(){
                            window.location.reload();
                        });
                    }
                } else {
                    setTimeout(function() {
                        firstCard.setAttribute("src","imgs/question.gif");
                        currentCard.setAttribute("src","imgs/question.gif");
                    }, 1000);
                }
                conClicks = 0;
                firstCardValue = "";
                firstCardId = "";
            }
        } 
    }
}