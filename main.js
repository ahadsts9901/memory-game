// JavaScript

const cards = document.querySelectorAll(".card");
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({ target: clickedCard }) {
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            cardOne = clickedCard;
        } else {
            cardTwo = clickedCard;
            disableDeck = true;
            const cardOneName = cardOne.querySelector(".back-view h1").getAttribute("class");
            const cardTwoName = cardTwo.querySelector(".back-view h1").getAttribute("class");
            matchCards(cardOneName, cardTwoName);
        }
    }
}

function matchCards(card1, card2) {
    if (card1 === card2) {
        matched++;
        if (matched === 8) {
            setTimeout(() => {
                shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        disableDeck = false;
    } else {
        setTimeout(() => {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        }, 400);

        setTimeout(() => {
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");
            cardOne.querySelector(".back-view").classList.remove("flip"); // Flip back the first card
            cardTwo.querySelector(".back-view").classList.remove("flip"); // Flip back the second card
            cardOne = cardTwo = "";
            disableDeck = false;
        }, 1200);
    }
}


function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    const arr = [
        "facebook", "facebook", "alarm-fill", "alarm-fill",
        "bell-fill", "bell-fill", "twitter", "twitter",
        "code-slash", "code-slash", "browser-edge",
        "browser-edge", "chat-left-dots-fill", "chat-left-dots-fill",
        "virus", "virus"
    ];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        const newCardIcon = card.querySelector(".back-view h1");
        newCardIcon.className = "bi";
        newCardIcon.classList.add(`bi-${arr[i]}`);
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});