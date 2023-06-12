import { Marble } from "./Marble";
import { Player } from "./Player";

export class Board {
  marbles: Marble[];

  constructor() {
    this.marbles = [];
  }

  addMarblesForPlayer(players: Player[]) {
    this.marbles = [];
    players.forEach((player) => {
      player.marbles.forEach((marble) => {
        this.marbles.push(marble);
      });
    });
  }
}
