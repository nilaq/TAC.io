import React from "react";
import { Coordinator } from "./positions";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Marbles = (props: { width: number }) => {
  const circleSize = 24;
  const inset = 16;
  const circleCount = 64;
  const coordinator = new Coordinator(
    props.width,
    circleSize,
    circleCount,
    inset
  );

  const CircleBaseStyle =
    "absolute inline-flex items-center justify-center rounded-full bg-slate-900 text-white bg-red-600 border-1 border-red-6";

  const [marblePos, setMarblePos] = React.useState(0);

  const moveMarble = (positions: number) => {
    for (let i = 1; i <= positions; i++) {
      setTimeout(() => {
        setMarblePos(marblePos + i);
      }, 150 * i);
    }
  };

  return (
    <>
      <motion.div
        className={CircleBaseStyle}
        initial={{ ...coordinator.getPositionOnBoard(marblePos) }} // initial state
        animate={coordinator.getPositionOnBoard(marblePos)} // updated state
      ></motion.div>
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
