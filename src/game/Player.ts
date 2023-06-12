import { Board } from "./Board";
import { Card } from "./Card";
import { Marble } from "./Marble";

export class Player {
  userId: string;
  team: number;
  marbles: Marble[];
  hand: Card[];
  isFinished: boolean;
<<<<<<< HEAD
  canComeOut: boolean;

  constructor(userId: string, team: number) {
    this.team = -1;
    this.marbles = [new Marble(), new Marble(), new Marble(), new Marble()]; // Assuming each player starts with 4 marbles
    this.hand = []; // This will be filled when game starts
    this.isFinished = false; // Initially, a player is not finished
    this.userId = userId;
    this.canComeOut = false;
=======
  color: string;
  startPosition: number;

  constructor(
    userId: string,
    team: Team,
    color: string,
    startPosition: number
  ) {
    this.team = team;
    this.marbles = []; // marbles are added when game starts
    this.hand = []; // This will be filled when game starts
    this.isFinished = false; // Initially, a player is not finished
    this.userId = userId;
    this.color = color;
    this.startPosition = startPosition;
>>>>>>> 5b4981b543044fad81f5dc7302e407ee2be8fee3
  }

  chooseCardToPlay() {
    // Ask the user for input
    const cardPlayed = 0;

    console.log("The user played a " + this.hand[cardPlayed]?.value);

    this.hand.splice(cardPlayed, 1);
  }

  calculateLegalMoves(board: Board, lastCards) {
    // Ask the user for input
    const cardPlayed = 0;

    console.log("The user played a " + this.hand[cardPlayed]?.value);

  //for every card check
  if (card === .DEVIL || card === .JESTER || card === .ANGEL || card === .WORRIOR){
    cardPlayed.isPlayable = true
  }
  if (card === .TAC){
    //check how far last marble is or home
  }
  //for every marbel check
  if (card === .FOUR){
    //check how far last marble is or home
  }





    this.hand.splice(cardPlayed, 1);
  }

  chooseCardToSwap() {
    // Ask the user for input
    const cardPlayed = 0;
    this.hand.splice(cardPlayed, 1);

    //STILL ADD NEW CARD
  }

  calculateIfCanComeOut() {
    this.hand.forEach((card) => {
      if (card.value === 1 || card.value === 13) this.canComeOut = true;
      return;
    });
  }
}
