import React, { useState } from "react";
import Card from "./Card";

interface Card {
  id: number;
  value: string;
  selected: boolean;
}

const Cards = (props: { top: boolean; name: string; isTurn: boolean }) => {
  const [cards, setCards] = React.useState<Card[]>([
    { id: 1, value: "1", selected: false },
    { id: 2, value: "3", selected: false },
    { id: 3, value: "8", selected: true },
    { id: 4, value: "Trickser", selected: false },
    { id: 5, value: "Teufel", selected: false },
  ]);

  const selectCard = (selectedCard: Card) => {
    const cardsCopy = [...cards];
    cardsCopy.forEach(
      (card) => (card.selected = card.id === selectedCard.id && !card.selected)
    );
    setCards(cardsCopy);
  };

  const removeCard = (removedCard: Card) => {
    const cardsCopy = [...cards];
    const index = cardsCopy.findIndex((card) => card.id === removedCard.id);
    cardsCopy.splice(index, 1);
    setCards(cardsCopy);
  };

  const name = (
    <div className="flex items-center justify-center gap-3">
      {props.isTurn && (
        <div className="h-3 w-3 rounded-full bg-slate-700"></div>
      )}
      <p className="text-xl text-muted-foreground">{props.name}</p>
    </div>
  );

  return (
    <div className="flex w-full flex-col items-center justify-start gap-6">
      {props.top && name}
      <div className={`relative flex h-[150px] w-[240px] justify-between`}>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            value={card.value}
            selected={card.selected}
            left={`${40 * index}px`}
            onClick={() => selectCard(card)}
            onDoubleClick={() => removeCard(card)}
          />
        ))}
      </div>
      {!props.top && name}
    </div>
  );
};

export default Cards;
