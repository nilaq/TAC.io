import { Board } from "./Board";
import { Card, CardValue } from "./Card";
import { Marble, MarbleState } from "./Marble";

export class Player {
  userId: string;
  team: number;
  marbles: Marble[];
  hand: Card[];
  isFinished: boolean;
  canComeOut: boolean;
  color: string;
  startPosition: number;

  constructor(
    userId: string,
    team: number,
    color: string,
    startPosition: number
  ) {
    this.team = -1;
    this.marbles = [
      new Marble(color, startPosition),
      new Marble(color, startPosition),
      new Marble(color, startPosition),
      new Marble(color, startPosition),
    ]; // Assuming each player starts with 4 marbles
    this.hand = []; // This will be filled when game starts
    this.isFinished = false; // Initially, a player is not finished
    this.userId = userId;
    this.canComeOut = false;
    this.color = color;
    this.startPosition = startPosition;
  }

  chooseCardToPlay(
    pastStack: Card[],
    legalMoves: Map<Card, Array<[Marble, number[]]>>
  ) {
    // Ask the user for input
    let cardPlayed = 0;
    if (this.hand[cardPlayed] === undefined || cardPlayed === undefined) {
      throw new Error("This card should not exists");
    }

    //TODO: Just for now, the player plays the first card on their hand that they can
    for (let i = 0; i < this.hand.length; i++) {
      if (legalMoves.has(this.hand[i]!)) {
        cardPlayed = i;
      }
    }

    console.log("The user played a " + this.hand[cardPlayed]?.value);

    //calculate legal, if no legal, all are legal but just discarded

    pastStack.push(this.hand[cardPlayed]!);
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

  isMarbelInRing(): boolean {
    this.marbles.forEach((marble) => {
      if (
        marble.getState === MarbleState.Ring ||
        marble.getState === MarbleState.RingMoved
      ) {
        return true;
      }
    });
    return false;
  }

  hasMarbelInBase(): boolean {
    return this.marbles.some((marble) => marble.getState === MarbleState.Base);
  }
}
