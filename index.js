let dealerCards = []
let playerCards = []
isAlive = false
hasBlackJack = false
dealerBusted = false
let dealerHand = document.getElementById("dealer")
let playerHand = document.getElementById("player")
let dealerSum = 0
let playerSum = 0
let triggerMessage = ""
let dealerCount = document.getElementById("dealer-count")
let playerCount = document.getElementById("player-count")
let trigger = document.getElementById("trigger-section")
let gameStart = false


function getRandomCard() {
    let randomCard = Math.floor ( Math.random() *10 ) + 1
    return randomCard
}

function startGame () {
    
    if (gameStart === false) {
        isAlive = true
        let dealerFirstCard = getRandomCard()
        let playerFirstCard = getRandomCard()
        let playerSecondCard = getRandomCard()
    
        dealerCards = [dealerFirstCard]
        playerCards = [playerFirstCard, playerSecondCard]
        dealerSum = dealerFirstCard
        playerSum = playerFirstCard + playerSecondCard
        gamePlay()
    }
}

function gamePlay() {
    dealerHand.textContent = " "
    playerHand.textContent = " "

    for ( let i = 0; i < dealerCards.length; i++ ) {
        dealerHand.textContent += dealerCards[i] + " "
    }

    for ( let i = 0; i < playerCards.length; i++ ) {
        playerHand.textContent += playerCards[i] + " "
    }

    dealerCount.textContent = dealerSum
    playerCount.textContent = playerSum

    if ( dealerSum < 21 && playerSum < 21 ) {
        triggerMessage = "What's your next move?"
        gameStart = true
    }   else if ( playerSum === 21 ) {
        triggerMessage = "You've got blackjack baby!"
        hasBlackJack = true
    } else if ( playerSum > 21 ) {
        triggerMessage = "You're out!"
        isAlive = false
    } else if ( dealerSum > 21 ) {
        triggerMessage = "Dealer Busted, you won!"
        dealerBusted = true
    } else if ( dealerSum === 21 && playerSum < 21 ) {
        triggerMessage = "Dealer Won!"
    }

    trigger.textContent = triggerMessage
}

function hitMe() {
    if ( isAlive === true && hasBlackJack === false && dealerBusted === false && dealerSum < 17 ) {
        let playerNewCard = getRandomCard()
        playerSum += playerNewCard
        playerCards.push(playerNewCard)
        gamePlay()
    }
}

function hitDealer() {

    if ( dealerBusted === false && gameStart === true && isAlive === true && hasBlackJack === false && dealerSum < 17 ) {
        let dealerNewCard = getRandomCard()
        dealerSum += dealerNewCard
        dealerCards.push(dealerNewCard)
        gamePlay()
    }
}

function finishGame() {

    if ( dealerBusted === false && gameStart === true && isAlive === true && hasBlackJack === false && dealerSum < 21 ) {
        if ( dealerSum < playerSum) {
            triggerMessage = "You have a higher pair than the dealer, you win!"
        } else if ( dealerSum > playerSum ) {
            triggerMessage = "Dealer's pair is higher than yours, dealer wins!"
        } else if ( dealerSum === playerSum ) {
            triggerMessage = "It's a draw!"
        }

        trigger.textContent = triggerMessage
    }
    
}
