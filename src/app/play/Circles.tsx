import React from "react";

const Circles = (props: {width: number}) => {
  const circleSize = 24;
  const circleCount = 64;
  const circles = [];

  for (let i = 0; i < circleCount; i++) {
    const inset = 24;
    const angle = 2 * Math.PI * (i / circleCount);
    const radius = (props.width - 40 - circleSize - inset) / 2;
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

  return (
    <>
    {circles}
    </>
  )
};

export default Circles;
