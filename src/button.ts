import { Sprite, SpriteSource } from "pixi.js";
import { Point } from "./helpers";
import { gameHeight, gameWidth } from "./shared";

function createButton(source: SpriteSource, { x, y }: Point, onClick: () => void) {
  const btn = Sprite.from(source);

  btn.interactive = true;
  btn.anchor.set(0.5);

  btn.width = 90;
  btn.height = 90;

  btn.x = btn.width / 2 + (gameWidth - btn.width) * x;
  btn.y = btn.height / 2 + (gameHeight - btn.height) * y;

  btn.on("pointertap", onClick);

  return btn;
}

function createRectangularButton() {}

export { createButton, createRectangularButton };
