import { Board } from "./Board";
import { Card, CardValue } from "./Card";
import { Marble, MarbleState } from "./Marble";

type ToHouse = boolean;
type Move = number;
type MarbleMoveTuple = [[Marble, Move, ToHouse]];
type MoveCombinations = MarbleMoveTuple[];

type legalPossibilities = Map<Card, MoveCombinations>;

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

  // This player function is also dumb. It simply gets the legal moves now and plays the first move, discards their card and places their marble
  chooseWhatToPlay(pastStack: Card[], legalMoves: legalPossibilities) {
    //TODO: Ask the user for input
    let cardPlayed = 0;
    //TODO: Ask the user for input
    const marbleChosen = 0;
    //TODO: Ask the user for input
    const moveChosen = 0;

    let noLegalMove = true;

    //TODO: Just for now, the player plays the first thing on their hand that they can -> DELETE THIS LATER
    for (let i = 0; i < this.hand.length; i++) {
      const card = this.hand[i];
      if (card === undefined) {
        throw new Error("Accessed Card does not exist");
      }
      if (legalMoves.has(card)) {
        cardPlayed = i;
        noLegalMove = false;
      }
      //If the user cannot play a legal move they just discard the first
    }
    if (noLegalMove) {
      console.log(
        this.userId + " cannot play any legal move and just discards"
      );
    }

    const cardSelected = this.hand[cardPlayed];

    if (cardSelected === undefined || cardPlayed === undefined) {
      throw new Error("This card should not exists");
    } else {
      const legalMove = legalMoves.get(cardSelected);
      //If there is a legal move play it
      if (legalMove !== undefined) {
        this.playMove(legalMove, moveChosen);
      }
      //User always plays a card
      this.playCard(pastStack, cardPlayed);
    }
  }

  //This function is called when the user has chosen a card and a marble they want to play with. Now they can move with the marble to any position in the move array
  playCard(pastStack: Card[], index: number) {
    if (this.hand[index] === undefined || index === undefined) {
      throw new Error("This card should not exists");
    }

    console.log(this.userId + " played a " + this.hand[index]?.value);

    //calculate legal, if no legal, all are legal but just discarded

    pastStack.push(this.hand[index]!);
    this.hand.splice(index, 1);
  }

  //This function is called when the user has chosen a card and a marble they want to play with. Now they can move with the marble to any position in the move array
  playMove(moveCombos: MoveCombinations, move: number) {
    if (moveCombos === undefined) {
      throw new Error("Move you are trying to play does not exist");
    } else {
      const nextMove = moveCombos[move];
      if (nextMove !== undefined) {
        nextMove.forEach((moveCombo) => {
          console.log(
            this.userId +
              " is moving the marble " +
              JSON.stringify(moveCombo[0]) +
              " by spaces: " +
              moveCombo[1] +
              " and can it go into the house? " +
              moveCombo[2]
          );
          moveCombo[0].move(moveCombo[1], moveCombo[2]);
        });
      }
    }
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

  getMarbelsInRing(): Marble[] {
    return this.marbles.filter(
      (marble) =>
        marble.getState === MarbleState.Ring ||
        marble.getState === MarbleState.RingMoved
    );
  }
}
