import { Board } from "./Board";
import { Deck } from "./Deck";
import { Player } from "./Player";
import { Card, CardValue } from "./Card";
import { Marble, MarbleState } from "./Marble";

type ToHouse = boolean;
type Move = number;
type MarbleMoveTuple = [[Marble, Move, ToHouse]];
type MoveCombinations = MarbleMoveTuple[];

type legalPossibilities = Map<Card, MoveCombinations>;

export class Game {
  board: Board;
  deck: Deck;
  players: Player[];
  currentPlayer: number;
  history: Board[];
  previousDeck: Card[];
  gameIterations: number;

  constructor() {
    this.board = new Board();
    this.deck = new Deck();
    this.players = [];
    this.history = [];
    this.currentPlayer = 0;
    this.previousDeck = [];
    this.gameIterations = 0;
    // only for debugging rn, this should be done by the controller later on when starting the game
    this.startGameOfFour(["1", "2", "3", "4"]);
  }

  debug() {
    const m1 = new Marble("blue", 0);

    m1.move(-4);
    console.log(
      "moved marble by -4 to " + m1.position + " current state is " + m1.state
    );
    m1.move(100);
    console.log(
      "moved marble by 100 to " + m1.position + " current state is " + m1.state
    );

    m1.move(1);
    console.log(
      "moved marble by 1 to " + m1.position + " current state is " + m1.state
    );

    m1.move(-4);
    console.log(
      "moved marble by -4 to " + m1.position + " current state is " + m1.state
    );
    m1.move(8, true);
    console.log(
      "moved marble by 8 to " + m1.position + " current state is " + m1.state
    );

    const m2 = new Marble("green", 0);
    m2.move(1);
    console.log(
      "moved m2 by 1 to " + m2.position + " current state is " + m2.state
    );

    m2.move(-4);
    console.log(
      "moved m2 by -4 to " + m2.position + " current state is " + m2.state
    );

    m2.move(62);
    console.log(
      "moved m2 by 62 to " + m2.position + " current state is " + m2.state
    );

    m2.move(5);
    console.log(
      "moved m2 by 5 to " + m2.position + " current state is " + m2.state
    );
  }

  startGameOfFour(userIds: string[]) {
    console.log("Game started");

    if (userIds.length !== 4) {
      throw new Error("Four user IDs must be provided");
    }

    // Create a player for each user ID and assign them to a team
    for (let i = 0; i < 4; i++) {
      const userId = userIds[i];
      if (userId === undefined) {
        throw new Error("One Player has no user ID");
      }

      //Here we could add logic for splitting up teams
      const colors = [
        "#ef4444", // red
        "#f59e0b", // yellow
        "#0ea5e9", // blue
        "#84cc16", // green,
      ];
      const player = new Player(
        userId,
        i < 2 ? 1 : 2,
        colors[i] as string,
        i * 16
      );
      this.players.push(player);
    }

    console.log("players created" + this.players);

    this.nextRound();
  }

  nextRound() {
    // Shuffle the cards or rather create a new deck at the start of each round
    if (this.deck.cards.length == 0) {
      console.log("Shuffling new cards");
      this.deck = new Deck();
      this.deck.shuffle();
      this.previousDeck = [];
    }

    console.log("New Round started");
    console.log("size of the card deck is " + this.deck.cards.length);

    // Set the current player to the first player again
    let numberOfCardsToDealPerPlayer = 5;

    //Check if we need to hand out 6 cards instead of 5
    if (this.deck.cards.length == 24) {
      numberOfCardsToDealPerPlayer = 6;
    }
    this.dealCards(numberOfCardsToDealPerPlayer);
    this.currentPlayer = 0;

    //Determine whether each player CAN come out during this round
    this.players.forEach((player) => {
      player.calculateIfCanComeOut();
      console.log(player.userId + " can come out: " + player.canComeOut);
    });

    this.gameIterations++;
    if (this.gameIterations <= 6) {
      this.playersMoving();
    }
  }

  playersMoving() {
    //Once it's the players turns to move, we first check for each of these players, what are their legal moves that they can do
    let legalMoves = new Map();

    this.players.forEach((player) => {
      legalMoves = this.calculateLegalMoves(
        player,
        this.board,
        this.previousDeck
      );

      console.log(
        "Deck of " + player.userId + " is " + JSON.stringify(player.hand)
      );
      //After we calculated what the user can play, we let them choose
      player.chooseWhatToPlay(this.previousDeck, legalMoves);
    });

    console.log("------------Every Player moved----------");
    console.log("Board now looks like this");
    this.board.addMarblesForPlayer(this.players);
    console.log(this.board.marbles);

    if (this.players[0]?.hand.length === 0) {
      return;
      this.nextRound();
    }
    this.gameIterations++;
    //if (this.gameIterations < 30) {
    this.playersMoving();
    //}
  }

  swapCards() {
    // Implement the logic for swapping cards between team members at the start of a round
  }

  dealCards(numberOfCards: number) {
    console.log("Dealing " + numberOfCards + " cards");
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

  calculateLegalMoves(
    player: Player,
    board: Board,
    lastCards: Card[]
  ): legalPossibilities {
    const legalMoves = new Map<Card, MoveCombinations>();

    player.hand.forEach((card) => {
      //resets the card for the following round
      card.isPlayable = false;
      //we can play the following special cards always!
      if (
        card.value === CardValue.DEVIL ||
        card.value === CardValue.JESTER ||
        card.value === CardValue.ANGEL
      ) {
        //TODO write this function for the devil -> maybe it's like the next person is moving already except for you can choose
        console.log("Added to potential move due to devil, jester or angel");
        card.isPlayable = true;
        legalMoves.set(card, []);
      }

      //remember player has isMarbelInRing

      player.marbles.forEach((marble) => {
        if (
          marble.state === MarbleState.Ring ||
          marble.state === MarbleState.RingMoved
        ) {
          //All black cards!!!
          if (
            card.value === CardValue.TWO ||
            card.value === CardValue.THREE ||
            card.value === CardValue.FIVE ||
            card.value === CardValue.SIX ||
            card.value === CardValue.NINE ||
            card.value === CardValue.TEN ||
            card.value === CardValue.TWELVE
          ) {
            console.log(
              "Added the" + card.value + " to the potential moves of the player"
            );
            if (
              //Check if no marble is after the current marble. Also TODO: Add here the house behavior
              card.value.valueOf() <=
              this.getValueOfMarbleAfterInRing(marble, player)
            ) {
              addMoveToOurLegalStructure(legalMoves, card, marble, [
                card.value.valueOf(),
              ]);
            }
          }
          console.log(
            "Marble " +
              JSON.stringify(marble) +
              " of player " +
              player.userId +
              " has a marble behind it with a distance: " +
              this.getValueOfMarbleBeforeInRing(marble, player) +
              " and has a marble in front of it with a distance: " +
              this.getValueOfMarbleAfterInRing(marble, player)
          );
        }

        //get Value of marble before this one
        //get Value of marble after this one -> then you know how many you can walk in front or back

        //for every marbel check
        if (card.value === CardValue.FOUR) {
          //check how far last marble is or home
        }
        if (card.value === CardValue.TAC) {
          //can you move with the last played move that is not a TAC?
        }
        if (card.value === CardValue.WORRIOR) {
          //see if one of yours is in the outer box, then it's a legal move
        }

        if (card.value === CardValue.ONE) {
          //see if one of yours is in the outer box, then it's a legal move
          if (player.hasMarbelInBase()) {
            console.log("Added the 1 to the potential moves of the player");
            addMoveToOurLegalStructure(legalMoves, card, marble, [1]);
          }
        }

        if (card.value === CardValue.THIRTEEN) {
          //see if one of yours is in the outer box, then it's a legal move
          if (player.hasMarbelInBase()) {
            console.log("Added the 13 to the potential moves of the player");
            addMoveToOurLegalStructure(legalMoves, card, marble, [1]);
          }
        }
      });
    });
    player.hand.forEach((card) => {
      console.log(
        "Player " +
          player.userId +
          " has with the card: " +
          card.value +
          " this move available: " +
          JSON.stringify(legalMoves.get(card))
      );
    });

    return legalMoves;
  }

  //getValueOfMarbleBefore
  getValueOfMarbleBeforeInRing(marble: Marble, currentPlayer: Player): number {
    let closestMarbleBehind = Infinity;
    this.players.forEach((player) => {
      player.marbles.forEach((otherMarble) => {
        // We only care about marbles behind the current marble.
        if (
          otherMarble.state === MarbleState.Ring ||
          otherMarble.state === MarbleState.RingMoved
        ) {
          let distance = (marble.position - otherMarble.position) % 64;
          if (distance <= 0) {
            distance += 64;
          }
          if (distance < closestMarbleBehind) {
            closestMarbleBehind = distance;
          }
        }
      });
    });
    return closestMarbleBehind;
  }

  //getValueOfMarbleAfter
  getValueOfMarbleAfterInRing(marble: Marble, currentPlayer: Player): number {
    let closestMarbleInFront = Infinity;
    this.players.forEach((player) => {
      player.marbles.forEach((otherMarble) => {
        // We only care about marbles behind the current marble.
        if (
          otherMarble.state === MarbleState.Ring ||
          otherMarble.state === MarbleState.RingMoved
        ) {
          let distance = (otherMarble.position - marble.position) % 64;
          if (distance <= 0) {
            distance += 64;
          }
          if (distance < closestMarbleInFront) {
            closestMarbleInFront = distance;
          }
        }
      });
    });
    return closestMarbleInFront;
  }
}

//TODO getValueOfMarbleAfter

export { Deck, Player, Board, Card, Marble };

function addMoveToOurLegalStructure(
  legalMoves: legalPossibilities,
  card: Card,
  marble: Marble,
  moves: number[],
  toHouse = false
) {
  let priorMoves = legalMoves.get(card);
  if (priorMoves === undefined) {
    priorMoves = [];
  }
  addMoveToMap(priorMoves, marble, moves, toHouse);
  legalMoves.set(card, priorMoves);
  card.isPlayable = true;
}

function addMoveToMap(
  moveCombos: MoveCombinations,
  marble: Marble,
  moves: number[],
  toHouse: boolean
) {
  moves.forEach((moveBy) => {
    // Add a new element for the marble with the new move
    moveCombos.push([[marble, moveBy, toHouse]]);
  });
}
