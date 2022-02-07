function toTurn(card){
    if (toTurnBlock == "disable"){
        divParent = card.parentNode;
        divParent.classList.add("turned");
        numberOfTurns();

        if(firstUpturnedCard == ""){
            firstUpturnedCard = divParent;
        } else {
            numberOfPlays();

            if(divParent.querySelector(".back-face img").alt == firstUpturnedCard.querySelector(".back-face img").alt){
                numberOfCorrectPlays();
                firstUpturnedCard = "";
            } else {
                toTurnBlock = "enable";
                setTimeout('firstUpturnedCard.classList.remove("turned")', 1000);
                setTimeout('divParent.classList.remove("turned")', 1000);
                setTimeout('firstUpturnedCard = ""', 1000);
                setTimeout('toTurnBlock = "disable"', 1000);
            }
        }
    }
}

function numberOfPlays() {
    plays++;
    playsHTML = document.querySelector(".plays");
    playsHTML.innerHTML = `Jogadas: ${plays}`;
}

function numberOfTurns() {
    turns++;
    turnsHTML = document.querySelector(".numberOfTurns");
    turnsHTML.innerHTML = `Viradas de cartas: ${turns}`;
}

function numberOfCorrectPlays() {
    correctPlays++;
    if (correctPlays == (numberOfCards/2)){
        clearInterval(IntervalStopwatch);

        if (parseInt(minutes) == 0){
            let textWinner = document.querySelector(".textWinner");
            textWinner.innerHTML = `Você conseguiu concluir o jogo com ${plays} jogadas. Seu tempo foi de ${parseInt(seconds)} segundo(s).`;
        } else {
            let textWinner = document.querySelector(".textWinner");
            textWinner.innerHTML = `Você conseguiu concluir o jogo com ${plays} jogadas. Seu tempo foi de ${parseInt(minutes)} minuto(s) e ${parseInt(seconds)} segundo(s).`;
        }

        winner = document.querySelector(".winner");
        winner.classList.remove("hidden");
    }
}

function comparador() { 
	return Math.random() - 0.5; 
}

function stopwatch() {
    minutes = parseInt(totalTime/60);
    if(minutes < 10){minutes = "0" + minutes;}

    seconds = parseInt(totalTime%60);
    if(seconds < 10){seconds = "0" + seconds;}

    time = document.querySelector(".stopwatch");
    time.innerHTML = `Cronometro: ${minutes}:${seconds}`;

    totalTime++;
}

let winner = "";
let totalTime = 0;
let minutes = 0;
let seconds = 0;
let time = "";
let IntervalStopwatch = "";
let plays = 0;
let playsHTML = "";

let turns = 0;
let turnsHTML = "";

let correctPlays = 0;

let toTurnBlock = "disable";

let firstUpturnedCard = "";

let numberOfCards = 0;

function startGame(){
    winner = document.querySelector(".winner");
    winner.classList.add("hidden");

    totalTime = 0;
    minutes = 0;
    seconds = 0;
    time = "";
    IntervalStopwatch = setInterval(stopwatch, 1000);
    plays = 0;
    playsHTML = "";

    turns = 0;
    turnsHTML = "";

    correctPlays = 0;

    toTurnBlock = "disable";

    firstUpturnedCard = "";

    numberOfCards = 0;
    do{
        numberOfCards = parseInt(prompt("Com quantas cartas deseja jogar? Escolha de 4 a 14 cartas"));
    } while (!(numberOfCards >= 4 && numberOfCards <= 14 && (numberOfCards % 2) == 0))

    let cardOptions = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];
    let cards = [];

    for (let i = 0; i < (numberOfCards/2); i++){
        cards.push(cardOptions[i]);
        cards.push(cardOptions[i]);
    }

    cards.sort(comparador);

    let main = document.querySelector("main");

    main.innerHTML = '<div class="accountant"><strong class="stopwatch">Cronometro: 00:00</strong><strong class="numberOfTurns">Viradas de cartas: 0</strong><strong class="plays">Jogadas: 0</strong></div><div class="winner hidden"><p class="congrats">PARABÉNS</p><p class="textWinner"></p><button onclick="startGame()">Jogar Novamente</button></div>';

    for(let i = 0; i < numberOfCards; i++){
        main.innerHTML += `<div class="card" data-identifier="card"><div class="front-face face" onclick="toTurn(this)" data-identifier="front-face"><img src="img/front.png" alt="parrot"></div><div class="back-face face" data-identifier="back-face"><img src="img/${cards[i]}.gif" alt="${cards[i]}"></div></div>`;
    }
}

startGame();