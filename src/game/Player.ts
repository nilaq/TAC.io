import { Card } from "./Card";
import { Marble } from "./Marble";
import { Team } from "./Team";

export class Player {
  userId: string;
  team: Team;
  marbles: Marble[];
  hand: Card[];
  isFinished: boolean;
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
  }

  chooseCardToPlay() {
    // Implement the logic for the player to choose a card to play
  }

  chooseCardToSwap() {
    // Implement the logic for the player to choose a card to swap
  }
}
