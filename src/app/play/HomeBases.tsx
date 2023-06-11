import React from "react";

const HomeBases = () => {
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

  return <>{homeBases}</>;
};

export default HomeBases;
