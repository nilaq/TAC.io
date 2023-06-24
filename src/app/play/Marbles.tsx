import React from "react";
import { Coordinator } from "./positions";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { MarbleState } from "@/game/Marble";
import { cn } from "@/lib/utils";

const Marbles = (props: { width: number }) => {
  const { circleCount, circleSize, inset, gameState, setGameState } =
    useGameStore((state) => state);

  const [hasChanged, setHasChanged] = React.useState(false);

  const coordinator = new Coordinator(
    props.width,
    circleSize,
    circleCount,
    inset
  );

  const CircleBaseStyle =
    "absolute inline-flex items-center justify-center rounded-full text-black z-50";

  const moveMarble = (positions: number) => {
    if (gameState.board.marbles[0]?.state === MarbleState.Base) {
      gameState.board.marbles[0].move(1);
      console.log("move to ring");
      setHasChanged(true);
    } else {
      for (let i = 1; i <= positions; i++) {
        setTimeout(() => {
          if (gameState.board.marbles[0] !== undefined) {
            console.log("move");
            gameState.board.marbles[0].move(1, true);
            setHasChanged(true);
          }
        }, 150 * i);
      }
    }
  };

  React.useEffect(() => {
    if (hasChanged) {
      setHasChanged(false);
    }
    setGameState(gameState);
  }, [hasChanged, gameState, setGameState]);

  console.log(gameState.board.marbles);

  return (
    <>
      {gameState.board.marbles.map((marble, index) => {
        console.log(marble);
        return (
          <motion.div
            className={CircleBaseStyle}
            initial={{ ...coordinator.getPosition(marble) }} // initial state
            animate={coordinator.getPosition(marble)} // updated state
            style={{
              backgroundColor: marble.color,
            }}
            key={index}
          >
            {marble.position}
          </motion.div>
        );
      })}

      <Button
        onClick={() => {
          moveMarble(5);
        }}
        className="absolute left-[270px] top-[300px] z-20"
      >
        Move Marble
      </Button>
    </>
  );
};

export default Marbles;
