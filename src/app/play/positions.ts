interface Position {
  width: string;
  height: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

export enum Player {
  right,
  left,
  top,
  bottom,
}

export class Coordinator {
  private circleSize: number;
  private circleCount: number;
  private inset: number;
  private radius: number;

  constructor(
    width: number,
    circleSize: number,
    circleCount: number,
    inset: number
  ) {
    this.circleSize = circleSize;
    this.circleCount = circleCount;
    this.inset = inset;
    this.radius = (width - inset - circleSize) / 2;
  }

  getPositionOnBoard(index: number): Position {
    const angle = 2 * Math.PI * (index / this.circleCount);
    const top = this.radius * Math.cos(angle) + this.radius + this.inset / 2;
    const right = this.radius * Math.sin(angle) + this.radius + this.inset / 2;

    return {
      width: `${this.circleSize}px`,
      height: `${this.circleSize}px`,
      top: `${top}px`,
      right: `${right}px`,
    };
  }

  getHousePosition(player: Player, position: number): Position {
    const gap =
      this.radius * Math.sin((2 * Math.PI) / this.circleCount) -
      this.circleSize;
    const offset = (this.circleSize + gap) * (1 + position) + this.inset / 2;
    const baseStyle = {
      width: `${this.circleSize}px`,
      height: `${this.circleSize}px`,
    };

    switch (player) {
      case Player.top:
        return {
          ...baseStyle,
          top: `${offset}px`,
        };
      case Player.bottom:
        return {
          ...baseStyle,
          bottom: `${offset}px`,
        };
      case Player.left:
        return {
          ...baseStyle,
          left: `${offset}px`,
        };
      default:
        return {
          ...baseStyle,
          right: `${offset}px`,
        };
    }
  }
}
