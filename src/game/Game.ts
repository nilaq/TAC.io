import { Board } from "./Board";
import { Deck } from "./Deck";
import { Player } from "./Player";
import { Card } from "./Card";
import { Marble } from "./Marble";

export class Game {
  board: Board;
  deck: Deck;
  players: Player[];
  currentPlayer: number;
  history: Board[];

  constructor() {
    this.board = new Board();
    this.deck = new Deck();
    this.players = [];
    this.history = [];
    this.currentPlayer = 0;
    this.startGameOfFour(["1", "2", "3", "4"]);
  }

  startGameOfFour(userIds: string[]) {
    console.log("Game started");

    if (userIds.length !== 4) {
      throw new Error("Four user IDs must be provided");
    }

    // Create a player for each user ID and assign them to a team
    for (let i = 0; i < 4; i++) {
      const userId = userIds[i];
      if (userId === undefined) {
        throw new Error("One Player has no user ID");
      }

      //Here we could add logic for splitting up teams
<<<<<<< HEAD
      const player = new Player(userId, i < 2 ? 1 : 2);
=======
      const colors = ["bg-red-500", "bg-blue-500", "bg-red-500", "bg-red-500"];
      const player = new Player(
        userId,
        i < 2 ? team1 : team2,
        colors[i] as string,
        i * 16
      );
>>>>>>> 5b4981b543044fad81f5dc7302e407ee2be8fee3
      this.players.push(player);
    }

<<<<<<< HEAD
    console.log("players created" + this.players);
=======
    this.teams.push(team1);
    this.teams.push(team2);

    this.players.forEach((player) => {
      this.board.addMarblesForPlayer(player);
    });

    console.log("teams created" + this.teams);

>>>>>>> 5b4981b543044fad81f5dc7302e407ee2be8fee3
    this.nextRound();
  }

  nextRound() {
    // Shuffle the cards or rather create a new deck at the start of each round
    if (this.deck.cards.length == 0) {
      console.log("Shuffling new cards");
      this.deck = new Deck();
      this.deck.shuffle();
    }

    console.log("New Round started");
    console.log("size of the card deck is " + this.deck.cards.length);

    // Set the current player to the first player again
    let numberOfCardsToDealPerPlayer = 5;

    //Check if we need to hand out 6 cards instead of 5
    if (this.deck.cards.length == 24) {
      numberOfCardsToDealPerPlayer = 6;
    }
    this.dealCards(numberOfCardsToDealPerPlayer);
    this.currentPlayer = 0;

    //Determine whether each player CAN come out during this round
    this.players.forEach((player) => {
      player.calculateIfCanComeOut();
      console.log(player.userId + " can come out: " + player.canComeOut);
    });
    this.playersMoving();
  }

  playersMoving() {
    this.players.forEach((player) => {
      console.log(player.userId + " has " + JSON.stringify(player.hand));
      player.chooseCardToPlay();
    });
    if (this.players[0]?.hand.length === 0) {
      return;
      this.nextRound();
    }
    this.playersMoving();
  }

  swapCards() {
    // Implement the logic for swapping cards between team members at the start of a round
  }

  dealCards(numberOfCards: number) {
    console.log("Dealing " + numberOfCards + " cards");
    // Assign numberOfCards cards to each player
    this.players.forEach((player) => {
      for (let i = 0; i < numberOfCards; i++) {
        const card = this.deck.drawOneCard(); // remove the top card from the deck
        if (card) {
          // if a card was successfully removed from the deck
          player.hand.push(card); // give it to the player
        }
      }
    });
  }

  createDeck() {
    // Implement the logic for swapping cards between team members at the start of a round
  }

  // Implement other methods based on your game rules


  calculateLegalMoves(board: Board, lastCards): Hashtable {
    // Ask the user for input
    const cardPlayed = 0;

    console.log("The user played a " + this.hand[cardPlayed]?.value);

  //for every card check
  if (card === .DEVIL){
    cardPlayed.isPlayable = true
  }
  if (card === .JESTER){
    cardPlayed.isPlayable = true
  }
  if (card === .ANGEL){
    cardPlayed.isPlayable = true
  }
  
  //for every marbel check
  if (card === .FOUR){
    //check how far last marble is or home
  }
  if (card === .TAC){
    //can you move with the last played move that is not a TAC?
  }
  if (card === .WORRIOR){
    //see if one of yours is in the outer box, then it's a legal move
  }





    this.hand.splice(cardPlayed, 1);
  }



}

export { Deck, Player, Board, Card, Marble };
