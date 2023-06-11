"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";
import Circles from "./Circles";
import HomeBases from "./HomeBases";
import Cards from "./Cards";
import Mid from "./Mid";
import Image from "next/image";

const Game = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<number | null>(null);

  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setSize(Math.min(width, height));
      }
    }

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="flex h-screen items-center justify-center py-12">
      <div className="flex h-full w-full flex-col items-center justify-between ">
        <Cards top={true} name="Raban" isTurn={false} />
        <Cards top={false} name="Nils" isTurn={false} />
      </div>
      <div className={`aspect-square h-full bg-slate-300 p-5`}>
        <div
          ref={containerRef}
          className="relative flex h-full w-full flex-col items-center justify-center rounded-full bg-slate-400"
        >
          {/*<Image
            src="./CircleBG.svg"
            alt="boardbg"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              position: "absolute",
            }}
          />
          */}
          <Circles width={size != null ? size : 0} />
          <Mid />
          <HomeBases />
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-between ">
        <Cards top={true} name="Julius" isTurn={false} />
        <Cards top={false} name="Domse" isTurn={true} />
      </div>
    </div>
  );
};

export default Game;
