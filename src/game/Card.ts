export enum CardValue {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  TEN = 10,
  ELEVEN = 0,
  TWELVE = 12,
  THIRTEEN = 13,
  TRICKSER = -1,
  TAC = -10,
}

export class Card {
  isPlayable: boolean;
  value: number; // Assuming a card has a value, update based on your game rules

  constructor(value: CardValue) {
    this.value = value;
    this.isPlayable = false;
  }
}
