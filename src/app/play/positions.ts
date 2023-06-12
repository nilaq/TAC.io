import { Marble, MarbleState } from "@/game/Marble";

interface Position {
  width: string;
  height: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

export enum Player {
  topRight,
  bottomRight,
  bottomLeft,
  topLeft,
}

export class Coordinator {
  private circleSize: number;
  private circleCount: number;
  private inset: number;
  private radius: number;
  private width: number;

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
    this.width = width;
  }

  getPosition(marble: Marble): Position {
    switch (marble.state) {
      case MarbleState.Base:
        return this.getBasePosition(marble.player, marble.position);
      case MarbleState.Ring:
      case MarbleState.RingMoved:
        return this.getPositionOnBoard(marble.position);
      case MarbleState.House:
      case MarbleState.Finished:
        return this.getHousePosition(marble.player, marble.position);
    }
  }

  getBasePosition(player: Player, position: number): Position {
    const gap = 8;
    const padding = 6;
    let offsetX = padding;
    let offsetY = padding;
    const positionOffsetX = -(gap + this.circleSize) * ((position % 2) + 1);
    const positionOffsetY =
      -(gap + this.circleSize) * (Math.floor(position / 2) + 1);
    const baseStyle = {
      width: `${this.circleSize}px`,
      height: `${this.circleSize}px`,
    };

    switch (player) {
      case Player.topRight:
        offsetX += this.circleSize + gap;
        return {
          ...baseStyle,
          top: `${offsetY + positionOffsetY}px`,
          right: `${offsetX + positionOffsetX}px`,
        };
      case Player.bottomRight:
        offsetX += this.circleSize + gap;
        offsetY += this.circleSize + gap;
        return {
          ...baseStyle,
          top: `${this.width - this.circleSize - offsetY + positionOffsetY}px`,
          right: `${offsetX + positionOffsetX}px`,
        };
      case Player.bottomLeft:
        offsetY += this.circleSize + gap;
        return {
          ...baseStyle,
          top: `${this.width - this.circleSize - offsetY + positionOffsetY}px`,
          right: `${
            this.width - this.circleSize - offsetX + positionOffsetX
          }px`,
        };
      default: // topLeft
        return {
          ...baseStyle,
          top: `${offsetY + positionOffsetY}px`,
          right: `${
            this.width - this.circleSize - offsetX + positionOffsetX
          }px`,
        };
    }
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
      case Player.topRight:
        return {
          ...baseStyle,
          top: `${offset}px`,
        };
      case Player.bottomRight:
        return {
          ...baseStyle,
          bottom: `${offset}px`,
        };
      case Player.bottomLeft:
        return {
          ...baseStyle,
          right: `${offset}px`,
        };
      default: // topLeft
        return {
          ...baseStyle,
          left: `${offset}px`,
        };
    }
  }
}
