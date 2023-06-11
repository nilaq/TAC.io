export enum MarbleState {
  Moved,
  House,
  Fresh,
  Finished,
}

export class Marble {
  state: MarbleState;
  position: number;

  constructor() {
    this.state = MarbleState.Fresh;
    this.position = 0; // assuming position 0 is the start position
  }
}
