import { Card } from "./Card";
import { Marble } from "./Marble";
import { Team } from "./Team";

export class Player {
  userId: string;
  team: Team;
  marbles: Marble[];
  hand: Card[];
  isFinished: boolean;

  constructor(userId: string, team: Team) {
    this.team = team;
    this.marbles = [new Marble(), new Marble(), new Marble(), new Marble()]; // Assuming each player starts with 4 marbles
    this.hand = []; // This will be filled when game starts
    this.isFinished = false; // Initially, a player is not finished
    this.userId = userId;
  }

  chooseCardToPlay() {
    // Implement the logic for the player to choose a card to play
  }

  chooseCardToSwap() {
    // Implement the logic for the player to choose a card to swap
  }
}
