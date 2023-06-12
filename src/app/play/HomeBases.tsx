import React from "react";

const HomeBases = () => {
  const positionAnchors = [
    { top: "0px", left: "0px" },
    { top: "0px", right: "0px" },
    { bottom: "0px", left: "0px" },
    { bottom: "0px", right: "0px" },
  ];
  const circleSize = 24;
  const circleBaseStyle =
    "inline-flex items-center justify-center rounded-full bg-slate-900 text-white";
  const circleStyle = {
    width: `${circleSize}px`,
    height: `${circleSize}px`,
  };

  return (
    <>
      {positionAnchors.map((style, index) => (
        <div
          className=" absolute grid grid-cols-2 grid-rows-2 items-center justify-items-center gap-2 rounded-xl bg-slate-400 p-1.5"
          style={style}
          key={index}
        >
          <div className={circleBaseStyle} style={circleStyle}>
            -1
          </div>
          <div className={circleBaseStyle} style={circleStyle}>
            -2
          </div>
          <div className={circleBaseStyle} style={circleStyle}>
            -3
          </div>
          <div className={circleBaseStyle} style={circleStyle}>
            -4
          </div>
        </div>
      ))}
    </>
  );
};

export default HomeBases;
