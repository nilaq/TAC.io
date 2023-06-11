import React from "react";

const Cards = () => {
  const noCards = 5;
  return <div className="h-20 w-full bg-blue-600">
    {Array.from(Array(noCards).keys()).map((i) => {
        <Image src="/images/cards/1.png" width={40} height={60} />
    }
  </div>;
};

export default Cards;
