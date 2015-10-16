//*****************************
// GLOBAL VARIABLES
//*****************************

var playerHand = []; // should this be in global scope or inside this function?
var dealerHand = []; // should this be in global scope or inside this function?
var cards = []; //this is also named inside the deck function, but i think it should be in global scope instead
var wallet = 100;
var playerArea = document.getElementById('player-area');
var dealerArea = document.getElementById('dealer-area');
var displayPlayerTotal;
var displayDealerTotal;
var lastCardGiven;


//*****************************
// CREATE DECK ARRAY
//*****************************
//window onload here

var card = function(value, name, suit){
    this.value = value;
    this.name = name;
    this.suit = suit;
}

var deck = function(){
    this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.suits = ['hearts','diams','spades','clubs'];
    this.values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
    var cards = []; // I think this might need to be in global scope also/instead
    for (var s=0; s<this.suits.length; s++) {
        for(var n=0; n<this.names.length; n++) {
            cards.push(new card(this.values[n], this.names[n], this.suits[s]) );
        }
    }
    return cards;
}

var shuffle = function(deck) {
    for (var j, x, i = deck.length; i; j = Math.floor(Math.random() * i), x = deck[--i], deck[i] = deck[j], deck[j] = x);
        return deck;
};

var theDeck = new deck();

// shuffle(theDeck);

//*****************************
// CREATE CARDS FOR THE DOM
//*****************************

// function makeCardImage(lastCardDealt, handOfPlayerOrDealer){
// 	theDeck = shuffle(theDeck);
// 	for(var z=0; z<theDeck.length; z++) {
// 		div = document.createElement('div');
// 		div.className = 'card';
// 		var i;
// 		// if (lastCardDealt.suit == 'Diamonds'){ //<-- I don't need this! I just changed the name from 'Diamonds' to 'diams'
// 		// 	var ascii_char = '&diams;';
// 		// } 
// 		// else {
// 		var ascii_char = '&' + lastCardDealt[0].suit + ';'; //<-- I changed this from lastCardDealt[0].suit.toLowerCase()
// 		// }
// 		div.innerHTML = '<span class="number">' + lastCardDealt[0].name + '</span><span class="suit">' + ascii_char + '</span>';
// 		handOfPlayerOrDealer.appendChild(div); //this will get appended to whomever's hand ...somehow
// 	}
// }

var addCardToDealer = function() {
	var lengthOfDealerHand = dealerHand.length - 1;
	div = document.createElement('div');
	div.className = 'card';
	var ascii_char = '&' + dealerHand[lengthOfDealerHand].suit + ';'; 
	div.innerHTML = '<span class="number">' + dealerHand[lengthOfDealerHand].name + '</span><span class="suit">' + ascii_char + '</span>';
	dealerArea.appendChild(div); 
}

//*****************************
// DEAL
//*****************************

 // set bet function:


var deal = function() {
	wallet = 100;
	playerHand = [];
	dealerHand = [];
	cards = [];
	shuffle(theDeck);

	wallet = wallet - 5;
	cardToPlayer();
	var waitDealer = setTimeout(cardToDealer, 1000);
	// dealerHand[0].style.backgroundColor="#000"; //<--- make first dealer card invisible; this line doesn't work
	var waitPlayer = setTimeout(cardToPlayer, 1000);
	var waitDealer2 = setTimeout(cardToDealer, 1000);

}

var cardToDealer = function() {
	console.log(dealerHand);
	dealerHand.push(theDeck.pop());
	addCardToDealer();
    // makeCardImage(dealerHand, dealerArea);
    // for (var p=0; p<dealerHand.length-1; p++) {
  //   	div = document.createElement('div');
		// div.className = 'card';
		// var ascii_char = '&' + dealerHand[p].suit + ';'; 
		// div.innerHTML = '<span class="number">' + dealerHand[p].name + '</span><span class="suit">' + ascii_char + '</span>';
		// dealerArea.appendChild(div); //this will get appended to whomever's hand ...somehow
    // }
}

var cardToPlayer = function() {
	console.log(playerHand);
	playerHand.push(theDeck.pop());
    // makeCardImage(playerHand, playerArea);
    for (var p=0; p<playerHand.length - 1; p++) {
    	div = document.createElement('div');
		div.className = 'card';
		var ascii_char = '&' + playerHand[p].suit + ';'; 
		div.innerHTML = '<span class="number">' + playerHand[p].name + '</span><span class="suit">' + ascii_char + '</span>';
		playerArea.appendChild(div); //this will get appended to whomever's hand ...somehow
    }
}

var displayPlayerTotal = function() {
// sum of the values in player's array. Sounds simple enough, huh? LOL...
    // total = playerHand[0].value + playerHand[1].value + playerHand[2].value + playerHand[3].value + playerHand[4].value + playerHand[5].value + playerHand[6].value; //<--- this works, but it's hard-coded :)
    // console.log(total);

    // var total;
    // for (var idx = 0; idx < playerHand.length; idx++) {
    //     total += playerHand[idx];
    // }
    // return total;

playerTotal = playerTotal + playerHand[i].value;
playerDealt++


//dealerTotal.innerHTML = dealerCount;





// dealercount = dealercount + dealerHand[i].value;
// if (dealerHand[i].name === 'A') {
// 	dealerAces++
// }


    // var value = playerHand.value; //<--- this still doesn't work
    // var totalPlayer;
    // for (var y=0; y<playerHand.length; y++) {
    // 	totalPlayer += value;
    // 	console.log(totalPlayer);
    // }

    // var sum = playerHand.reduce( //<--- this doesn't work
    //        function(prev,current){
    //          return  +(current[1]) + prev;
    //        }, 0
    //      );
// and then get this total to display in the DOM
}

/* deal function: 
	  subtract money from the player's wallet
	  pop a card from the main deck array
	  push the card into the player's hand array
	  DOM: display the player card 
	  timeout
	  pop a card from the main deck array
	  push the card into the dealer's hand array
	  DOM: display the dealer card FACEDOWN 
	  * setAttribute for that card, id that makes it black
	  timeout
	  (again) pop a card from the main deck array
	  (again) push the card into the player's hand array
	  (again) DOM: display the player card 
	  timeout
	  pop a card from the main deck array
	  push the card into the dealer's hand array
	  DOM: display the dealer card
	  display dealer's sum total
	  display player's sum total 
	  call ___checkForWin___
 */


//*****************************
// PLAYER'S TURN
//*****************************


/* checkForWin function
	  // First, check for blackjacks
	  if (dealerHand === playerHand) && (dealerHand <= 21) {
		return push;
	  } 
	  else if (playerHand === 21) && (dealerHand !== 21) {
	  	return ---player got blackjack
	  	player win $$ add ___betAmount * 1.5x___ to wallet
	  	deal button is on again
	  }
	  else if (dealerHand === 21) && (playerHand !== 21) {
	    return ---dealer got blackjack
	    player lose $$, subtract ___betAmount___ from wallet
	    deal button is on again
	  } 
	  

	  // Next, check to see if anyone has busted
	  if (playerHand > 21) && (dealerHand)


	  // Next, check to see if the player is eligible to hit 
	  if (dealerHand < 21)



	  else if (playerHand > 21) {
	  	return ---bust 
	  	player lose $$, subtract ___betAmount___ from wallet
	  }
	  else if () {
		
	  }

	  _?_ are "push" and "winner" functions? wtf should they be?
 */

 //*****************************
// PLAYER : HIT & STAND
//******************************