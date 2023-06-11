import { Marble } from "./Marble";
import { Player } from "./Player";

export class Board {
  outerRing: Marble[];
  houses: Map<Player, Marble[]>;

  constructor() {
    this.outerRing = [];
    this.houses = new Map();
  }

  // Implement other methods based on your game rules
}
