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
    //every marble starts with -1 -> we do not need assignement in the house
    this._position = -1;
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

  //Here we assume that the move is legal and we just execute it -> we do not check where any other marbles are = dumb function
  //BY can be both positive and negative
  //We never actively set the state to base or home here!!! -> that should be done by the controller
  move(by: number, intoHouse = false) {
    // moving from ring into house
    if (this.state === MarbleState.Finished) {
      throw new Error("Cannot move finished marble!");
    } else if (this.state === MarbleState.Base && by === 1) {
      this._position = 0;
      this.state = MarbleState.Ring;
    } else if (intoHouse) {
      //This happens when we go four back into the house
      if (by < 0) {
        //watch out -> here we turn current position negative and add 67 to determine place in house
        this._position = -1 * this._position + 67;
      } else {
        //we have to subtract - 1 to account for the zero
        this._position += by - 1;
      }
      if (this._position > 67) {
        throw new Error(
          "Board out of Bounds. Tried to move up in the house too far"
        );
      }
    }
    // moving on the ring
    else if (
      this.state === MarbleState.Ring ||
      this.state === MarbleState.RingMoved ||
      this.state === MarbleState.House
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
      this.state = MarbleState.RingMoved;
    } else {
      console.log("ILLEGAL MOVE WAS GIVEN: MARBLE DID NOT MOVE");
    }
    console.log("The marble just moved to " + this._position);
  }

  // from home base to ring at starting position
  moveToRing() {
    this.state = MarbleState.Ring;
    this._position = 0;
  }
}
