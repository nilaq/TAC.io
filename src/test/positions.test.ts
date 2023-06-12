import { Coordinator } from "@/app/play/positions";
import { Marble, MarbleState } from "@/game/Marble";
import { test, expect } from "vitest";

const coordinator = new Coordinator(700, 24, 64, 16);

test("homeBase Position", async () => {
  const marbles = [];
  for (let i = 0; i < 4; i++) {
    marbles.push(new Marble("red", i * 16));
  }
  const positions = marbles.map((marble) => coordinator.getPosition(marble));
  console.log(positions);
  expect(positions).toMatchObject([
    { top: "0px", left: "0px" },
    { top: "0px", right: "0px" },
    { bottom: "0px", left: "0px" },
    { bottom: "0px", right: "0px" },
  ]);
});
