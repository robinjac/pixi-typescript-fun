import { Application } from "pixi.js";

const gameWidth = 1136;
const gameHeight = 640;

const game = new Application({
  backgroundColor: 0xd3d3d3,
  width: gameWidth,
  height: gameHeight,
});

const stage = game.stage;

export { game, stage, gameWidth, gameHeight };
