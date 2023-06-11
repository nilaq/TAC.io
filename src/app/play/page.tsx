import { AspectRatio } from "@/components/ui/aspect-ratio";
import React from "react";
import Circles from "./Circles";
import HomeBases from "./HomeBases";
import Cards from "./Cards";

const Game = () => {
  const width = 700;

  return (
    <div className="flex h-screen items-center justify-between p-10">
      <div className="flex h-full w-full flex-col items-center justify-between ">
        <Cards />
        <Cards />
      </div>
      <div className={`w-[700px] min-w-[700px] bg-slate-300 p-5`}>
        <AspectRatio ratio={1 / 1} className="bg-muted">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-slate-400">
            <Circles width={width} />
            {<div className="absolute h-64 w-64 rounded-xl bg-slate-800"></div>}
            <HomeBases />
          </div>
        </AspectRatio>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-between ">
        <Cards />
        <Cards />
      </div>
    </div>
  );
};

export default Game;
