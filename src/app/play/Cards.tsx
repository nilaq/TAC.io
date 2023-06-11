import Image from "next/image";
import React from "react";

const Cards = (props: { top: boolean; name: string; isTurn: boolean }) => {
  const noCards = 5;

  const name = (
    <div className="justfiy-center flex items-center justify-center gap-3">
      {props.isTurn && (
        <div className="h-3 w-3 rounded-full bg-slate-700"></div>
      )}
      <p className="text-xl text-muted-foreground">{props.name}</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-between gap-3">
      {props.top && name}
      <div className="flex h-20 items-center justify-between gap-1">
        {[1, 2, 3, 4, 5].map((cardNumber) => (
          <Image
            key={cardNumber}
            className="h-full"
            src="./Card.svg"
            alt={`card ${cardNumber}`}
            width="50"
            height="100"
          />
        ))}
      </div>
      {!props.top && name}
    </div>
  );
};

export default Cards;
