import React from "react";
import { Coordinator } from "./positions";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { MarbleState } from "@/game/Marble";
import { cn } from "@/lib/utils";

const Marbles = (props: { width: number }) => {
  const { circleCount, circleSize, inset, gameState } = useGameStore(
    (state) => state
  );

  const coordinator = new Coordinator(
    props.width,
    circleSize,
    circleCount,
    inset
  );

  const CircleBaseStyle =
    "absolute inline-flex items-center justify-center rounded-full bg-slate-900 text-white bg-red-600 border-1 border-red-6";

  const moveMarble = (positions: number) => {
    for (let i = 1; i <= positions; i++) {
      setTimeout(() => {
        if (gameState.board.marbles[0] !== undefined) {
          if (gameState.board.marbles[0].state === MarbleState.House) {
            gameState.board.marbles[0].moveToRing();
          } else {
            gameState.board.marbles[0].move(1);
          }
        }
      }, 150 * i);
    }
  };

  console.log(gameState.board.marbles);

  return (
    <>
      {gameState.board.marbles.map((marble, index) => (
        <motion.div
          className={cn(CircleBaseStyle, `${marble.color}`)}
          initial={{ ...coordinator.getPosition(marble) }} // initial state
          animate={coordinator.getPosition(marble)} // updated state
          key={index}
        ></motion.div>
      ))}
      <Button
        onClick={() => moveMarble(10)}
        className="absolute left-[280px] top-[280px] z-20"
      >
        Move Marble
      </Button>
    </>
  );
};

export default Marbles;
