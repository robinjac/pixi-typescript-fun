import { Sprite } from "pixi.js";
import { Tuple } from "./shared";

type State = "idle" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type Slot = {
  state: State;
  sources: Tuple<Sprite>;
};

function createSlot(
  sources: Tuple<Sprite>,
  x: number,
  y: number,
  width: number,
  height: number
): Slot {
  return {
    state: "idle",
    sources,
  };
}

export { createSlot, Slot };
