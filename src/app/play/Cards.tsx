import React, { useState } from "react";
import Card from "./Card";

const Cards = (props: { top: boolean; name: string; isTurn: boolean }) => {
  const cards = [
    { id: 1, value: "1" },
    { id: 2, value: "3" },
    { id: 3, value: "8" },
    { id: 4, value: "Trickser" },
    { id: 5, value: "Teufel" },
  ];

  const name = (
    <div className="flex items-center justify-center gap-3">
      {props.isTurn && (
        <div className="h-3 w-3 rounded-full bg-slate-700"></div>
      )}
      <p className="text-xl text-muted-foreground">{props.name}</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-between gap-3">
      {props.top && name}
      <div
        className={`justify-between" style="left: 20px relative flex h-[150px] w-[300px]`}
        style={{ left: `20px` }}
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`duration-50 absolute top-0 h-[150px] w-[100px] cursor-pointer border-gray-100 transition-all ease-in-out hover:z-10 hover:scale-105`}
            style={{
              left: `${40 * index}px`,
            }}
          >
            <Card value={card.value} />
          </div>
        ))}
      </div>
      {!props.top && name}
    </div>
  );
};

export default Cards;
