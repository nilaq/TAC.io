import { Marble } from "./Marble";
import { Player } from "./Player";

export class Board {
  marbles: Marble[];

  constructor() {
    this.marbles = [];
  }

  addMarblesForPlayer(player: Player) {
    for (let i = 1; i <= 4; i++) {
      const marble = new Marble(player.color, player.startPosition, -i);
      this.marbles.push(marble);
      player.marbles.push(marble);
    }
  }

  // Implement other methods based on your game rules
}
