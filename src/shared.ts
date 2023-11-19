import { Application, Sprite, Text } from "pixi.js";

type Tuple<a> = [a, a];

/** A point is a normalized coordinate beteen 0 - 1 */
type Point = { x: number; y: number };

const takeFirst = <T>([first]: Tuple<T>): T => first;
const takeSecond = <T>([, second]: Tuple<T>): T => second;
const toPoint = ([first, second]: Tuple<number>): Point => ({
  x: first,
  y: second,
});

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2;

const useScale =
  (source: Sprite | Text, width?: number, height?: number) =>
  (scale: number) => {
    source.width = (width ?? source.width) * scale;
    source.height = (height ?? source.height) * scale;
  };

const gameWidth = 1136;
const gameHeight = 640;

const app = new Application({
  backgroundColor: 0x00000,
  width: gameWidth,
  height: gameHeight,
});

type Selected = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

let selectedValues: Set<Selected> = new Set();

const game = {
  app,
  stage: app.stage,
  select: (value: Selected) => {
    if (selectedValues.has(value)) {
      selectedValues.delete(value);
    } else if (selectedValues.size < 5) {
      selectedValues.add(value);
    }
  },
  hasSelected: (value: Selected) => selectedValues.has(value),
  get maxSelectionReached() {
    return selectedValues.size === 5;
  },
  clearSelection: () => selectedValues.clear()
};

/** Sets the position with normalized coordinates (values 0 - 1) within the game screen */
const setPosition = (source: Sprite | Text, x: number, y: number) => {
  source.anchor.set(0.5);
  source.x = source.width / 2 + (gameWidth - source.width) * x;
  source.y = source.height / 2 + (gameHeight - source.height) * y;
};

const repeat9 = <T>(fn: (index: number) => T): T[] =>
  Array.from({ length: 9 }, (_, index) => fn(index + 1));

export {
  Tuple,
  Point,
  Sprite,
  Text,
  Selected,
  takeFirst,
  takeSecond,
  toPoint,
  easeInOut,
  useScale,
  setPosition,
  repeat9,
  game,
  gameWidth,
  gameHeight,
};
