import { Board } from "./Board";
import { Deck } from "./Deck";
import { Player } from "./Player";
import { Team } from "./Team";
import { Card } from "./Card";
import { Marble } from "./Marble";

export class Game {
  board: Board;
  deck: Deck;
  teams: Team[];
  players: Player[];
  currentPlayer: number;
  history: Board[];

  constructor() {
    this.board = new Board();
    this.deck = new Deck();
    this.teams = [];
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

    const team1 = new Team([]);
    const team2 = new Team([]);

    // Create a player for each user ID and assign them to a team
    for (let i = 0; i < 4; i++) {
      const userId = userIds[i];
      if (userId === undefined) {
        throw new Error("One Player has no user ID");
      }

      //Here we could add logic for splitting up teams
      const colors = ["bg-red-500", "bg-blue-500", "bg-red-500", "bg-red-500"];
      const player = new Player(
        userId,
        i < 2 ? team1 : team2,
        colors[i] as string,
        i * 16
      );
      this.players.push(player);

      if (i < 2) {
        team1.players.push(player);
      } else {
        team2.players.push(player);
      }
    }

    this.teams.push(team1);
    this.teams.push(team2);

    this.players.forEach((player) => {
      this.board.addMarblesForPlayer(player);
    });

    console.log("teams created" + this.teams);

    this.nextRound();
    console.log("first round starts" + this.teams);
  }

  nextRound() {
    console.log("New Round started");
    console.log("size of the card deck is " + this.deck.cards.length);
    // Set the current player to the first player again
    let numberOfCardsToDealPerPlayer = 5;

    if (this.deck.cards.length == 24) {
      numberOfCardsToDealPerPlayer = 6;
    }
    this.dealCards(numberOfCardsToDealPerPlayer);
    this.currentPlayer = 0;

    if (this.deck.cards.length == 0) {
      console.log("Shuffling new cards");
      this.deck = new Deck();
      return this.nextTurn();
    }
    this.nextRound();
  }

  nextTurn() {
    // Advance to the next player's turn
  }

  swapCards() {
    // Implement the logic for swapping cards between team members at the start of a round
  }

  dealCards(numberOfCards: number) {
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
}

export { Deck, Player, Team, Board, Card, Marble };
