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

const game = new Application({
  backgroundColor: 0xd3d3d3,
  width: gameWidth,
  height: gameHeight,
});

const stage = game.stage;

/** Sets the position with normalized coordinates (values 0 - 1) within the game screen */
const setPosition = (source: Sprite | Text, x: number, y: number) => {
    source.anchor.set(0.5);
    source.x = source.width / 2 + (gameWidth - source.width) * x;
    source.y = source.height / 2 + (gameHeight - source.height) * y;
}

export {
  Tuple,
  Point,
  Sprite,
  Text,
  takeFirst,
  takeSecond,
  toPoint,
  easeInOut,
  useScale,
  setPosition,
  game,
  stage,
  gameWidth,
  gameHeight
};
