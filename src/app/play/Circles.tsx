import React from "react";

const Circles = (props: { width: number }) => {
  const inset = 16;
  const circleSize = 24;
  const circleCount = 64;
  const circles = [];
  const circleBaseStyle =
    "absolute inline-flex items-center justify-center rounded-full bg-slate-900 text-white";
  const radius = (props.width - circleSize - inset) / 2;

  // marbles around the circle
  for (let i = 0; i < circleCount; i++) {
    const angle = 2 * Math.PI * (i / circleCount);
    const top = radius * Math.cos(angle) + radius + inset / 2;
    const right = radius * Math.sin(angle) + radius + inset / 2;

    const circleStyle = {
      width: `${circleSize}px`,
      height: `${circleSize}px`,
      top: `${top}px`,
      right: `${right}px`,
    };
    circles.push(
      <div className={circleBaseStyle} style={circleStyle} key={i}>
        {/*i*/}
      </div>
    );
  }

  // marbles in the house
  for (let i = 0; i < 4; i++) {
    const gap = radius * Math.sin((2 * Math.PI) / circleCount) - circleSize;
    const offset = (circleSize + gap) * (1 + i) + inset / 2;
    const baseStyle = {
      width: `${circleSize}px`,
      height: `${circleSize}px`,
    };

    circles.push(
      <div
        className={circleBaseStyle}
        style={{ ...baseStyle, top: `${offset}px` }}
        key={i}
      >
        {/*i*/}
      </div>
    );
    circles.push(
      <div
        className={circleBaseStyle}
        style={{ ...baseStyle, left: `${offset}px` }}
        key={i}
      >
        {/*i*/}
      </div>
    );
    circles.push(
      <div
        className={circleBaseStyle}
        style={{ ...baseStyle, right: `${offset}px` }}
        key={i}
      >
        {/*i*/}
      </div>
    );
    circles.push(
      <div
        className={circleBaseStyle}
        style={{ ...baseStyle, bottom: `${offset}px` }}
        key={i}
      >
        {/*i*/}
      </div>
    );
  }

  return <>{circles}</>;
};

export default Circles;
