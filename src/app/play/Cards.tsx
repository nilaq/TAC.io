import Image from "next/image";
import React from "react";

const Cards = () => {
  const noCards = 5;
  return (
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
  );
};

export default Cards;
