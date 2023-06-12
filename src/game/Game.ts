import { Board } from "./Board";
import { Deck } from "./Deck";
import { Player } from "./Player";
import { Card, CardValue } from "./Card";
import { Marble, MarbleState } from "./Marble";

export class Game {
  board: Board;
  deck: Deck;
  players: Player[];
  currentPlayer: number;
  history: Board[];
  previousDeck: Card[];

  constructor() {
    this.board = new Board();
    this.deck = new Deck();
    this.players = [];
    this.history = [];
    this.currentPlayer = 0;
    this.previousDeck = [];
  }

  debug() {
    const m1 = new Marble("blue", 0);
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
      const colors = ["bg-red-500", "bg-blue-500", "bg-red-500", "bg-red-500"];
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
    this.playersMoving();
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

      console.log(player.userId + " has " + JSON.stringify(player.hand));
      //After we calculated what the user can play, we let them choose
      player.chooseCardToPlay(this.previousDeck, legalMoves);
    });

    console.log("------------Every Player moved----------");
    console.log("Board now looks like this");
    this.board.addMarblesForPlayer(this.players);
    console.log(this.board.marbles);

    if (this.players[0]?.hand.length === 0) {
      return;
      this.nextRound();
    }
    this.playersMoving();
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
  ): //looks crazy but an example for this is:
  /*[
    [marble1, [5, 10, 15]],
    [marble2, [10, 20]],
    [marble3, [15, 30, 45]]
  ]*/

  Map<Card, Array<[Marble, number[]]>> {
    // Ask the user for input
    const cardPlayed = 0;
    const legalMoves = new Map<Card, Array<[Marble, number[]]>>();

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
            console.log("Added to potential move due to 1");
            addMoveThatIsLegal(legalMoves, card, marble, 1);
          }
        }

        if (card.value === CardValue.THIRTEEN) {
          //see if one of yours is in the outer box, then it's a legal move
          if (player.hasMarbelInBase()) {
            console.log("Added to potential move due to 13");
            addMoveThatIsLegal(legalMoves, card, marble, 1);
          }
        }
      });
    });
    player.hand.forEach((card) => {
      console.log(
        "Player " +
          player.userId +
          " has with " +
          card +
          " this move available: " +
          legalMoves.get(card)
      );
    });

    return legalMoves;
  }

  makeMove(board: Board, lastCards: [Card], card: Card) {}

  //getValueOfMarbleBefore

  getValueOfMarbleBeforeInRing(marble: Marble): number {
    let closestMarbleBehind = Infinity;
    this.players.forEach((player) => {
      player.marbles.forEach((otherMarble) => {
        // We only care about marbles behind the current marble.
        if (otherMarble.position < marble.position) {
          const distance = (marble.position - otherMarble.position) % 64;
          if (distance < closestMarbleBehind) {
            closestMarbleBehind = distance;
          }
        }
      });
    });
    return closestMarbleBehind === Infinity ? -1 : closestMarbleBehind;
  }

  //TODO getValueOfMarbleAfter
}

export { Deck, Player, Board, Card, Marble };

function addMoveThatIsLegal(
  legalMoves: Map<Card, [Marble, number[]][]>,
  card: Card,
  marble: Marble,
  moveMarbleBy: number
) {
  let priorMoves = legalMoves.get(card);
  if (priorMoves === undefined) {
    priorMoves = [[marble, []]];
  }
  addMoveToMap(priorMoves, marble, moveMarbleBy);
  legalMoves.set(card, priorMoves);
  card.isPlayable = true;
}

function addMoveToMap(
  moves: Array<[Marble, number[]]>,
  marble: Marble,
  move: number
) {
  // Find the element in the array that corresponds to the marble
  const element = moves.find(([m, _]) => m === marble);

  if (element) {
    // If the marble is already in the array, add the move to its list of moves
    element[1].push(move);
  } else {
    // If the marble is not in the array, add a new element for it
    moves.push([marble, [move]]);
  }
}
