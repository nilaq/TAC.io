"use client";

import { useEffect, useRef, useState } from "react";
import { Deck, Player, Game, Board, Card, Marble } from "src/game/Game";

const TestView: React.FC = () => {
  const [game, setGame] = useState<Game | null>(null);
  const [deck, setDeck] = useState<Deck | null>(null);

  useEffect(() => {
    // Create a new game
    const newGame = new Game();
    setGame(newGame);
    newGame.debug();

    // Start game of four players
    newGame.startGameOfFour(["player1", "player2", "player3", "player4"]);

    // Create a new deck
    const newDeck = new Deck();
    setDeck(newDeck);

    // Shuffle the deck
    newDeck.shuffle();

    // Deal cards
    newGame.dealCards(5);
  }, []);

  return (
    <div>
      <h1>Test View</h1>
      <h2>Game</h2>
      <h2>Deck</h2>
      <pre>{JSON.stringify(deck?.cards, null, 2)}</pre>
    </div>
  );
};

export default TestView;
