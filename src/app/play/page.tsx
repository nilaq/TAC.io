import { AspectRatio } from "@/components/ui/aspect-ratio";
import React from "react";

const Game = () => {
  const width = 700;
  const circleSize = 24;
  const circleCount = 64;
  const circles = [];

  for (let i = 0; i < circleCount; i++) {
    const inset = 24;
    const angle = 2 * Math.PI * (i / circleCount);
    const radius = (width - 40 - circleSize - inset) / 2;
    const top = radius * Math.cos(angle) + radius + inset / 2;
    const right = radius * Math.sin(angle) + radius + inset / 2;

    const circleStyle = {
      width: `${circleSize}px`,
      height: `${circleSize}px`,
      top: `${top}px`,
      right: `${right}px`,
    };
    circles.push(
      <div
        className={`absolute inline-flex items-center justify-center rounded-full bg-slate-900 text-white`}
        style={circleStyle}
        key={i}
      >
        {i}
      </div>
    );
  }

  const homeBases = [];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      const offset = "0px";
      homeBases.push(
        <div
          className="absolute h-20 w-20 rounded-xl bg-slate-800"
          style={{
            top: `${i == 0 ? offset : ""}`,
            left: `${j == 0 ? offset : ""}`,
            bottom: `${i == 1 ? offset : ""}`,
            right: `${j == 1 ? offset : ""}`,
          }}
          key={i * 2 + j}
        />
      );
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className={`w-[700px] bg-slate-300 p-5`}>
        <AspectRatio ratio={1 / 1} className="bg-muted">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-slate-500">
            {circles}
            {<div className="absolute h-64 w-64 rounded-xl bg-slate-800"></div>}
            {homeBases}
          </div>
        </AspectRatio>
      </div>
    </div>
  );
};

export default Game;
