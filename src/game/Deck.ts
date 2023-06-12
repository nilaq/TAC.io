import { Card, CardValue } from "./Card";

export class Deck {
  cards: Card[];

  constructor() {
    this.cards = [];
    this.initializeDeck();
  }

  initializeDeck(): void {
    const cardCounts: { [key: number]: number } = {
      [CardValue.ONE]: 9,
      [CardValue.TWO]: 7,
      [CardValue.THREE]: 7,
      [CardValue.FOUR]: 7,
      [CardValue.FIVE]: 7,
      [CardValue.SIX]: 7,
      [CardValue.SEVEN]: 8,
      [CardValue.EIGHT]: 7,
      [CardValue.NINE]: 7,
      [CardValue.TEN]: 7,
      [CardValue.ELEVEN]: 0,
      [CardValue.TWELVE]: 7,
      [CardValue.THIRTEEN]: 9,
      [CardValue.TRICKSER]: 7,
      [CardValue.DEVIL]: 1,
      [CardValue.JESTER]: 1,
      [CardValue.ANGEL]: 1,
      [CardValue.WORRIOR]: 1,
      [CardValue.TAC]: 4,
    };

    //This pushes all cards assigned above into an array
    for (const cardValue of Object.values(CardValue)) {
      for (let i = 0; i < (cardCounts[cardValue as any] || 0); i++) {
        this.cards.push(new Card(cardValue as any));
      }
    }
    this.shuffle();
  }

  //Shuffles the stack of cards
  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j]!, this.cards[i]!];
    }
  }

  //This removes the top card from the deck
  drawOneCard() {
    if (this.cards.length > 0) {
      return this.cards.shift();
    } else {
      throw new Error("Shit! For some reason the card deck is empty");
    }
  }
}
