import { Card } from "./Card";
import { Player } from "./Player";

export class Team {
  players: Player[];
  cards: Card[];

  constructor(players: Player[]) {
    this.players = players;
    this.cards = [];
  }

  exchangeCards() {
    // Implement the logic for exchanging cards within the team
  }
}
