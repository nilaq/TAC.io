import { Player } from "@/app/play/positions";

export enum MarbleState {
  Base,
  Ring,
  House,
  Finished,
}

export class Marble {
  private _state: MarbleState;
  private _position: number; // on the board relative to player's start position
  private _color: string;
  private readyToGoIn: boolean; // i.e. can go into the house or not
  private offset: number; // offset from the start position due to player starting postition (e.g. player 2 has offset: 16)

  constructor(color: string, offset: number) {
    this._state = MarbleState.Base;
    this.readyToGoIn = false;
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

  get state() {
    return this._state;
  }

  get canGoIn() {
    return this.readyToGoIn;
  }

  get player() {
    switch (this.offset) {
      case 0:
        return Player.bottomRight;
      case 16:
        return Player.bottomLeft;
      case 32:
        return Player.topLeft;
      default: // top right
        return Player.topRight;
    }
  }

  move(by: number, inHouse = false, finished = false) {
    // moving from ring into house
    if (inHouse) {
      this._position += by - 64;
      this._state = finished ? MarbleState.House : MarbleState.Finished;
    }
    // moving on the ring
    else {
      this._position += by;
      this.readyToGoIn = true;
    }
  }

  // from home base to ring at starting position
  moveToRing() {
    this._state = MarbleState.Ring;
    this._position = 0;
  }
}
