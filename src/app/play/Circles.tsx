import React from "react";
import { Coordinator, Player } from "./positions";

const circleSize = 24;
const inset = 16;
const circleCount = 64;

const CircleBaseStyle =
  "absolute inline-flex items-center justify-center rounded-full bg-slate-900 text-white";

interface CirclesProps {
  width: number;
}

const Circles = ({ width }: CirclesProps) => {
  const coordinator = new Coordinator(width, circleSize, circleCount, inset);

  const circlesOnBoard = Array.from({ length: circleCount }, (_, i) => (
    <div
      className={CircleBaseStyle}
      style={coordinator.getPositionOnBoard(i)}
      key={i}
    >
      {i}
    </div>
  ));

  const players = [
    Player.bottomLeft,
    Player.bottomRight,
    Player.topLeft,
    Player.topRight,
  ];
  const houseCircles = players.flatMap((player, index) =>
    Array.from({ length: 4 }, (_, i) => (
      <div
        className={CircleBaseStyle}
        style={coordinator.getHousePosition(player, i)}
        key={i + 64 + 4 * index}
      >
        {i + 64}
      </div>
    ))
  );

  return <>{[...circlesOnBoard, ...houseCircles]}</>;
};

export default Circles;
