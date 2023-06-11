import React from "react";
import { Coordinator, Player } from "./positions";

const circleSize = 24;
const inset = 16;
const circleCount = 64;

const CircleBaseStyle =
  "absolute inline-flex items-center justify-center rounded-full bg-slate-900 text-white";

const Circle = ({ className, style, key, children }) => (
  <div className={className} style={style} key={key}>
    {children}
  </div>
);

const Circles = ({ width }) => {
  const coordinator = new Coordinator(width, circleSize, circleCount, inset);

  const circlesOnBoard = Array.from({ length: circleCount }, (_, i) => (
    <Circle
      className={CircleBaseStyle}
      style={coordinator.getPositionOnBoard(i)}
      key={i}
    >
      {i}
    </Circle>
  ));

  const players = [Player.top, Player.right, Player.bottom, Player.left];
  const houseCircles = players.flatMap((player) =>
    Array.from({ length: 4 }, (_, i) => (
      <Circle
        className={CircleBaseStyle}
        style={coordinator.getHousePosition(player, i)}
        key={i}
      />
    ))
  );

  return <>{[...circlesOnBoard, ...houseCircles]}</>;
};

export default Circles;

