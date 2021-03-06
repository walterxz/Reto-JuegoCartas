let cards = [];
let pcCards = [];
let myCards = [];
let trash = [];
let selectedCard = "";
let takenCard = null;
let player = false;

document.getElementById("start").addEventListener("click", startGame);
document.getElementById("deck").addEventListener("click", takeCard);
document.getElementById("continue").addEventListener("click", passTurn);

document.getElementById("my1").addEventListener("click", changeCard);
document.getElementById("my2").addEventListener("click", changeCard);
document.getElementById("my3").addEventListener("click", changeCard);
document.getElementById("my4").addEventListener("click", changeCard);
document.getElementById("my5").addEventListener("click", changeCard);

var log = document.getElementById("log");

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function restart() {
  cards = [];
  pcCards = [];
  myCards = [];
  trash = [];
  takenCard = null;
  player = false;
  document.getElementById("deck-img").src = "../img/back.jpg";
  cards = shuffle(cardsRepository);
}

function startGame() {
  //Inicializar  variables
  restart();
  log.innerHTML = "Iniciando juego repartiendo cartas";
  while (pcCards.length < 5) {
    let card = cards.shift();
    pcCards.push(card);
  }
  while (myCards.length < 5) {
    let card = cards.shift();
    myCards.push(card);
  }
  updateImages();
}

function takeCard() {
  if (cards.length > 0) {
    //sacar carta del arreglo
    let card = cards.shift();
    document.getElementById("selected").src = card.image;
    console.log(card, cards.length);
    takenCard = card;
    log.innerHTML = `Has sacado la carta ${card.suit} ${card.value}`;
    player = true;
  } else {
    log.innerHTML = `No hay cartas`;
  }
}

function updateImages() {
  // Asignacion de imagenes

  document.getElementById("my1").src = myCards[0]["image"];
  document.getElementById("my2").src = myCards[1]["image"];
  document.getElementById("my3").src = myCards[2]["image"];
  document.getElementById("my4").src = myCards[3]["image"];
  document.getElementById("my5").src = myCards[4]["image"];

  // document.getElementById('pc1').src='/img/back.jpg'
  // document.getElementById('pc2').src='/img/back.jpg'
  // document.getElementById('pc3').src='/img/back.jpg'
  // document.getElementById('pc4').src='/img/back.jpg'
  // document.getElementById('pc5').src='/img/back.jpg'

  document.getElementById("pc1").src = pcCards[0]["image"];
  document.getElementById("pc2").src = pcCards[1]["image"];
  document.getElementById("pc3").src = pcCards[2]["image"];
  document.getElementById("pc4").src = pcCards[3]["image"];
  document.getElementById("pc5").src = pcCards[4]["image"];
}

function passTurn() {
  log.innerHTML = `Continua PC`;
  player = false;
  setTimeout(() => {
    takeCard();
    setTimeout(() => ia(), 2000);
  }, 2000);
}

function changeCard() {
  //actualizar cartas tomadas
  let position = this.dataset.id;
  if (player) {
    let temp = myCards[position];
    myCards[position] = takenCard;
    takenCard = temp;
    document.getElementById("selected").src = takenCard.image;
    log.innerHTML = `Cambiaste la carta ${takenCard.suit} ${takenCard.value} por ${myCards[position].suit} ${myCards[position].value}`;
    updateImages();
    winValidation();
  } else {
    alert("No puedes cambiar");
  }
}

function winValidation() {
  let cAce = myCards.filter((r) => r.value === "ACE").length;
  let c2 = myCards.filter((r) => r.value === "2").length;
  let c3 = myCards.filter((r) => r.value === "3").length;
  let c4 = myCards.filter((r) => r.value === "4").length;
  let c5 = myCards.filter((r) => r.value === "5").length;
  let c6 = myCards.filter((r) => r.value === "6").length;
  let c7 = myCards.filter((r) => r.value === "7").length;
  let c8 = myCards.filter((r) => r.value === "8").length;
  let c9 = myCards.filter((r) => r.value === "9").length;
  let c10 = myCards.filter((r) => r.value === "10").length;
  let cJack = myCards.filter((r) => r.value === "JACK").length;
  let cQueen = myCards.filter((r) => r.value === "QUEEN").length;
  let cKing = myCards.filter((r) => r.value === "KING").length;

  //Si se repiten 3 y 2 cartas Mostrar mensaje de Win
  if (
    (cAce === 3 ||
      c2 === 3 ||
      c3 === 3 ||
      c4 === 3 ||
      c5 === 3 ||
      c6 === 3 ||
      c7 === 3 ||
      c8 === 3 ||
      c9 === 3 ||
      c10 === 3 ||
      cJack === 3 ||
      cQueen === 3 ||
      cKing === 3) &&
    (cAce === 2 ||
      c2 === 2 ||
      c3 === 2 ||
      c4 === 2 ||
      c5 === 2 ||
      c6 === 2 ||
      c7 === 2 ||
      c8 === 2 ||
      c9 === 2 ||
      c10 === 2 ||
      cJack === 2 ||
      cQueen === 2 ||
      cKing === 2)
  ) {
    log.innerHTML = "Ganaste";
  }
}

function ia() {
  log.innerHTML = "Aplicando IA [--__--]";
  setTimeout(() => {
    let cAce = myCards.filter((r) => r.value === "ACE").length;
    let c2 = myCards.filter((r) => r.value === "2").length;
    let c3 = myCards.filter((r) => r.value === "3").length;
    let c4 = myCards.filter((r) => r.value === "4").length;
    let c5 = myCards.filter((r) => r.value === "5").length;
    let c6 = myCards.filter((r) => r.value === "6").length;
    let c7 = myCards.filter((r) => r.value === "7").length;
    let c8 = myCards.filter((r) => r.value === "8").length;
    let c9 = myCards.filter((r) => r.value === "9").length;
    let cJack = myCards.filter((r) => r.value === "JACK").length;
    let cQueen = myCards.filter((r) => r.value === "QUEEN").length;
    let cKing = myCards.filter((r) => r.value === "KING").length;
    if (false) {
      log.innerHTML = "Cambio carta, tu turno";
    } else {
      log.innerHTML = "No cambio carta, tu turno";
    }
  }, 2000);

  // Si no tiene carta repetida cambiar esa
  //No hacer cambio de una si tiene 3 repetidas
}

let cardsRepository = [
  {
    code: "JH",
    image: "https://deckofcardsapi.com/static/img/JH.png",
    value: "JACK",
    suit: "HEARTS",
  },
  {
    code: "4C",
    image: "https://deckofcardsapi.com/static/img/4C.png",
    value: "4",
    suit: "CLUBS",
  },
  {
    code: "9S",
    image: "https://deckofcardsapi.com/static/img/9S.png",
    value: "9",
    suit: "SPADES",
  },
  {
    code: "JC",
    image: "https://deckofcardsapi.com/static/img/JC.png",
    value: "JACK",
    suit: "CLUBS",
  },
  {
    code: "8D",
    image: "https://deckofcardsapi.com/static/img/8D.png",
    value: "8",
    suit: "DIAMONDS",
  },
  {
    code: "2C",
    image: "https://deckofcardsapi.com/static/img/2C.png",
    value: "2",
    suit: "CLUBS",
  },
  {
    code: "4H",
    image: "https://deckofcardsapi.com/static/img/4H.png",
    value: "4",
    suit: "HEARTS",
  },
  {
    code: "5S",
    image: "https://deckofcardsapi.com/static/img/5S.png",
    value: "5",
    suit: "SPADES",
  },
  {
    code: "7C",
    image: "https://deckofcardsapi.com/static/img/7C.png",
    value: "7",
    suit: "CLUBS",
  },
  {
    code: "7S",
    image: "https://deckofcardsapi.com/static/img/7S.png",
    value: "7",
    suit: "SPADES",
  },
  {
    code: "0C",
    image: "https://deckofcardsapi.com/static/img/0C.png",
    value: "10",
    suit: "CLUBS",
  },
  {
    code: "8H",
    image: "https://deckofcardsapi.com/static/img/8H.png",
    value: "8",
    suit: "HEARTS",
  },
  {
    code: "AC",
    image: "https://deckofcardsapi.com/static/img/AC.png",
    value: "ACE",
    suit: "CLUBS",
  },
  {
    code: "AD",
    image: "https://deckofcardsapi.com/static/img/aceDiamonds.png",
    value: "ACE",
    suit: "DIAMONDS",
  },
  {
    code: "KH",
    image: "https://deckofcardsapi.com/static/img/KH.png",
    value: "KING",
    suit: "HEARTS",
  },
  {
    code: "9H",
    image: "https://deckofcardsapi.com/static/img/9H.png",
    value: "9",
    suit: "HEARTS",
  },
  {
    code: "6C",
    image: "https://deckofcardsapi.com/static/img/6C.png",
    value: "6",
    suit: "CLUBS",
  },
  {
    code: "QD",
    image: "https://deckofcardsapi.com/static/img/QD.png",
    value: "QUEEN",
    suit: "DIAMONDS",
  },
  {
    code: "JD",
    image: "https://deckofcardsapi.com/static/img/JD.png",
    value: "JACK",
    suit: "DIAMONDS",
  },
  {
    code: "5C",
    image: "https://deckofcardsapi.com/static/img/5C.png",
    value: "5",
    suit: "CLUBS",
  },
  {
    code: "KC",
    image: "https://deckofcardsapi.com/static/img/KC.png",
    value: "KING",
    suit: "CLUBS",
  },
  {
    code: "8S",
    image: "https://deckofcardsapi.com/static/img/8S.png",
    value: "8",
    suit: "SPADES",
  },
  {
    code: "4S",
    image: "https://deckofcardsapi.com/static/img/4S.png",
    value: "4",
    suit: "SPADES",
  },
  {
    code: "8C",
    image: "https://deckofcardsapi.com/static/img/8C.png",
    value: "8",
    suit: "CLUBS",
  },
  {
    code: "2D",
    image: "https://deckofcardsapi.com/static/img/2D.png",
    value: "2",
    suit: "DIAMONDS",
  },
  {
    code: "0D",
    image: "https://deckofcardsapi.com/static/img/0D.png",
    value: "10",
    suit: "DIAMONDS",
  },
  {
    code: "5H",
    image: "https://deckofcardsapi.com/static/img/5H.png",
    value: "5",
    suit: "HEARTS",
  },
  {
    code: "9C",
    image: "https://deckofcardsapi.com/static/img/9C.png",
    value: "9",
    suit: "CLUBS",
  },
  {
    code: "9D",
    image: "https://deckofcardsapi.com/static/img/9D.png",
    value: "9",
    suit: "DIAMONDS",
  },
  {
    code: "6H",
    image: "https://deckofcardsapi.com/static/img/6H.png",
    value: "6",
    suit: "HEARTS",
  },
  {
    code: "2S",
    image: "https://deckofcardsapi.com/static/img/2S.png",
    value: "2",
    suit: "SPADES",
  },
  {
    code: "3C",
    image: "https://deckofcardsapi.com/static/img/3C.png",
    value: "3",
    suit: "CLUBS",
  },
  {
    code: "7D",
    image: "https://deckofcardsapi.com/static/img/7D.png",
    value: "7",
    suit: "DIAMONDS",
  },
  {
    code: "JS",
    image: "https://deckofcardsapi.com/static/img/JS.png",
    value: "JACK",
    suit: "SPADES",
  },
  {
    code: "KD",
    image: "https://deckofcardsapi.com/static/img/KD.png",
    value: "KING",
    suit: "DIAMONDS",
  },
  {
    code: "5D",
    image: "https://deckofcardsapi.com/static/img/5D.png",
    value: "5",
    suit: "DIAMONDS",
  },
  {
    code: "AS",
    image: "https://deckofcardsapi.com/static/img/AS.png",
    value: "ACE",
    suit: "SPADES",
  },
  {
    code: "6D",
    image: "https://deckofcardsapi.com/static/img/6D.png",
    value: "6",
    suit: "DIAMONDS",
  },
  {
    code: "QH",
    image: "https://deckofcardsapi.com/static/img/QH.png",
    value: "QUEEN",
    suit: "HEARTS",
  },
  {
    code: "6S",
    image: "https://deckofcardsapi.com/static/img/6S.png",
    value: "6",
    suit: "SPADES",
  },
  {
    code: "3D",
    image: "https://deckofcardsapi.com/static/img/3D.png",
    value: "3",
    suit: "DIAMONDS",
  },
  {
    code: "2H",
    image: "https://deckofcardsapi.com/static/img/2H.png",
    value: "2",
    suit: "HEARTS",
  },
  {
    code: "7H",
    image: "https://deckofcardsapi.com/static/img/7H.png",
    value: "7",
    suit: "HEARTS",
  },
  {
    code: "4D",
    image: "https://deckofcardsapi.com/static/img/4D.png",
    value: "4",
    suit: "DIAMONDS",
  },
  {
    code: "QS",
    image: "https://deckofcardsapi.com/static/img/QS.png",
    value: "QUEEN",
    suit: "SPADES",
  },
  {
    code: "AH",
    image: "https://deckofcardsapi.com/static/img/AH.png",
    value: "ACE",
    suit: "HEARTS",
  },
  {
    code: "QC",
    image: "https://deckofcardsapi.com/static/img/QC.png",
    value: "QUEEN",
    suit: "CLUBS",
  },
  {
    code: "3H",
    image: "https://deckofcardsapi.com/static/img/3H.png",
    value: "3",
    suit: "HEARTS",
  },
  {
    code: "3S",
    image: "https://deckofcardsapi.com/static/img/3S.png",
    value: "3",
    suit: "SPADES",
  },
  {
    code: "0S",
    image: "https://deckofcardsapi.com/static/img/0S.png",
    value: "10",
    suit: "SPADES",
  },
  {
    code: "KS",
    image: "https://deckofcardsapi.com/static/img/KS.png",
    value: "KING",
    suit: "SPADES",
  },
  {
    code: "0H",
    image: "https://deckofcardsapi.com/static/img/0H.png",
    value: "10",
    suit: "HEARTS",
  },
];
