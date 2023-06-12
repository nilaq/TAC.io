import { Player } from "@/app/play/positions";

export enum MarbleState {
  Base,
  Ring,
  RingMoved,
  House,
  Finished,
}

export class Marble {
  private state: MarbleState;
  private _position: number; // on the board relative to player's start position
  private _color: string;
  private offset: number; // offset from the start position due to player starting postition (e.g. player 2 has offset: 16)

  constructor(color: string, offset: number) {
    this.state = MarbleState.Base;
    this._position = 0; // assuming position 0 is the start position
    this._color = color;
    this.offset = offset;
  }

  get position() {
    return this._position + this.offset;
  }

  get color() {
    return this._color;
  }

  get getState(): MarbleState {
    return this.state;
  }

  get currentlyInGame() {
    return (
      this.state === MarbleState.Ring || this.state === MarbleState.RingMoved
    );
  }

  get player() {
    switch (this.offset) {
      case 0:
        return Player.bottom;
      case 16:
        return Player.left;
      case 32:
        return Player.top;
      default:
        return Player.right;
    }
  }

  move(by: number, inHouse = false, finished = false) {
    // moving from ring into house
    if (inHouse) {
      this._position += by - 64;
      this.state = finished ? MarbleState.House : MarbleState.Finished;
    }
    // moving on the ring
    else {
      this._position += by;
      this.state = MarbleState.RingMoved;
    }
  }

  // from home base to ring at starting position
  moveToRing() {
    this.state = MarbleState.Ring;
    this._position = 0;
  }
}
