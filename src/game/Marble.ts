import { Player } from "@/app/play/positions";

export enum MarbleState {
  Base,
  Ring,
  RingMoved,
  House,
  Finished,
}

export class Marble {
  private _state: MarbleState;
  private _position: number; // on the board relative to player's start position
  private _color: string;
  private offset: number; // offset from the start position due to player starting postition (e.g. player 2 has offset: 16)

  constructor(color: string, offset: number, basePosition = -1) {
    this._state = MarbleState.Base;
    //every marble starts with -1 -> we do not need assignement in the house
    this._position = basePosition;
    this._color = color;
    this.offset = offset;
  }

  get position() {
    return (
      this._position + (this._state === MarbleState.Base ? 0 : this.offset)
    );
  }

  get color() {
    return this._color;
  }

  get state(): MarbleState {
    return this._state;
  }

  get currentlyInGame() {
    return (
      this._state === MarbleState.Ring || this._state === MarbleState.RingMoved
    );
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

  //Here we assume that the move is legal and we just execute it -> we do not check where any other marbles are = dumb function
  //BY can be both positive and negative
  //We never actively set the state to base or home here!!! -> that should be done by the controller
  move(by: number, intoHouse = false) {
    // moving from ring into house
    if (this._state === MarbleState.Finished) {
      throw new Error("Cannot move finished marble!");
    } else if (this._state === MarbleState.Base && by === 1) {
      this._position = 0;
      this._state = MarbleState.Ring;
    } else if (intoHouse) {
      //This happens when we go four back into the house
      if (by < 0) {
        //watch out -> here we turn current position negative and add 68 to determine place in house
        this._position = -1 * this._position + 68;
      } else {
        //we have to subtract - 1 to account for the zero
        this._position += by;
      }
      if (this._position > 68) {
        throw new Error(
          "Board out of Bounds. Tried to move up in the house too far"
        );
      }
    }
    // moving on the ring
    else if (
      this._state === MarbleState.Ring ||
      this._state === MarbleState.RingMoved ||
      this._state === MarbleState.House
    ) {
      this._position += by;
      //if the user cannot go in the house but moves four back
      if (this._position < 0) {
        this._position += 64;
      }
      //if the marble does not have the permission to go into the house or does not want to go in the house, it keeps going
      if (this._position > 63) {
        this._position -= 64;
      }
      this._state = MarbleState.RingMoved;
    } else {
      console.log("ILLEGAL MOVE WAS GIVEN: MARBLE DID NOT MOVE");
    }
    console.log("The marble just moved to " + this._position);
  }
}
