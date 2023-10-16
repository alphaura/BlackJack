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
let startButton = document.getElementById("start-button")
let gameStart = false
let gameOver = false


//getRandomCard function helps in having a fair game by generating random numbers to every card dealt.

function getRandomCard() {
    let randomCard = Math.floor ( Math.random() *10 ) + 1
    return randomCard
}

//startGame function takes care of actually starting the game from the very first time, and was linked to the startOver function to provide an easier gameplay.

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

//gamePlay function takes care of how most of the general game is played;

//It resets the hands both sides have to an empty string to then display the array of cards being randomly generated in the dealerCards and playerCards.
//It displays both card totals to the UI
//It changes the strings inside the trigger box according to the condition being met

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
        gameOver = false
    }   else if ( playerSum === 21 ) {
        triggerMessage = "You've got blackjack baby!"
        hasBlackJack = true
        gameOver = true
    } else if ( playerSum > 21 ) {
        triggerMessage = "You're out!"
        isAlive = false
        gameOver = true
    } else if ( dealerSum > 21 ) {
        triggerMessage = "Dealer Busted, you won!"
        dealerBusted = true
        gameOver = true
    } else if ( dealerSum === 21 && playerSum < 21 ) {
        triggerMessage = "Dealer Won!"
        gameOver = true
    }

    trigger.textContent = triggerMessage
}

//hitMe function is linked to the player's side, where when the player decides to take a card, it randomly pushes a new card to the total and 
//to the individual hand as well. The function is conditioned to only work if a specific state is met.

function hitMe() {
    if ( isAlive === true && hasBlackJack === false && dealerBusted === false && dealerSum < 17 ) {
        let playerNewCard = getRandomCard()
        playerSum += playerNewCard
        playerCards.push(playerNewCard)
        gamePlay()
    }
}

//hitDealer function is linked to the dealer's side, where when the player decides not to take another card, the function generates random numbers
//to the dealers total and the individual hand until the condition is broken.

function hitDealer() {

    if ( dealerBusted === false && gameStart === true && isAlive === true && hasBlackJack === false && dealerSum < 17 ) {
        let dealerNewCard = getRandomCard()
        dealerSum += dealerNewCard
        dealerCards.push(dealerNewCard)
        gamePlay()
    }
}

//finishGame function can only be actioned when the game ended, however, the result isn't shown. Meaning if the dealer is at 18 and player is at 20, 
//the hitDealer and hitMe functions will not be actionable, therefore, the finishGame function comes into action, and manually displays the result in the
//trigger box.

function finishGame() {

    if ( dealerBusted === false && gameStart === true && isAlive === true && hasBlackJack === false && dealerSum < 21 ) {
        if ( dealerSum < playerSum) {
            triggerMessage = "You have a higher hand than the dealer, you win!"
            gameOver = true
        } else if ( dealerSum > playerSum ) {
            triggerMessage = "Dealer's hand is higher than yours, dealer wins!"
            gameOver = true
        } else if ( dealerSum === playerSum ) {
            triggerMessage = "It's a draw!"
            gameOver = true
        }

        trigger.textContent = triggerMessage
    }
}

//startOver function takes care of ease of use, and avoids from the user to stay refreshing every time they want to restart a new game. This function is 
//conditioned specifically to reset everything, and is linked with the startGame function through the "gameStart = false" condition, to actually allow
//the game to start all over again always using fair play.

function startOver() {
    if ( gameOver === true ) {
        dealerSum = 0
        playerSum = 0
        playerHand.textContent = " "
        dealerHand.textContent = " "
        dealerCount.textContent = "Total Amount"
        playerCount.textContent = "Total Amount"
        gameStart = false
        triggerMessage = "Want to test your luck again?"
        trigger.textContent = triggerMessage
    }
}