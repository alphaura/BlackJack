let isAlive = false
let hasBlackJack = false
let dealerCards = []
let playerCards = []
let startGame = false
let dealerCountEl = document.getElementById("dealer-count")
let dealer = document.getElementById("dealer")
let playerCountEl = document.getElementById("player-count")
let player = document.getElementById("player")y
let buttonMessage = ""
let triggerMessage = ""
let triggerSection = document.getElementById("trigger-section")
let startOrHit = document.getElementById("hit-button")

dealerCountEl = 0
playerCountEl = 0




function getRandomCard() {
    let randomCard = Math.floor ( Math.random() * 10 ) + 1
}

function gameStart() {
    let dealerFirstCard = getRandomCard()
    let playerFirstCard = getRandomCard()
    let playerSecondCard = getRandomCard()
    dealerCards = [dealerFirstCard]
    playerCards = [playerFirstCard, playerSecondCard]
    dealerCountEl = dealerFirstCard
    playerCountEl = playerFirstCard + playerSecondCard
    dealer = dealerFirstCard
    player = playerFirstCard + " " + playerSecondCard
}

function gamePlay() {
    for (let i = 0; i < dealerCards; i++) {
        dealer.textContent = dealerCards[i] + " "
    }

    for ( let i = 0; i < playerCards; i++) {
        player.textContent = playerCards[i] + " "
    }

    if ( playerCountEl > 21 && dealerCountEl > 21 ) {
        triggerMessage = "What’s your move?"
    } else if ( playerCountEl < 21 && dealerCountEl > 21 ) {
        triggerMessage = "You’re out!"
    } else if ( playerCountEl === 21 && ( dealerCountEl > 21 || dealerCountEl < 21 ) ) {
        triggerMessage = "You got blackjack!"
    } else if ( playerCountEl === 21 && dealerCountEl === 21 ) {
        triggerMessage = "It’s a draw!"
    } else ( playerCountEl > 21 && dealerCountEl < 21 ) {
        triggerMessage = "Dealer busted!"
    }

    triggerSection = triggerMessage
}


function hitMe() {
    if (startGame === false) {
        buttonMessage = "Start Game"
        startOrHit = buttonMessage
        gameStart()
        
    } else {
        buttonMessage = "Hit Me"
        startOrHit = buttonMessage
        let card = getRandomCard()
        playerCountEl += card
        playerCards.push(card)
        player.push(card)
        gamePlay()
    }
}

hitMe()

function stay() {

}