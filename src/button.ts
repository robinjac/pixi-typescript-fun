import { Sprite, SpriteSource } from "pixi.js";
import { Point } from "./helpers";
import { gameHeight, gameWidth } from "./shared";

type Button = {
  active: boolean;
  sprite: Sprite;
};

function createButton(
  source: SpriteSource,
  { x, y }: Point,
  onClick: (btn: Button) => void
) {
  const sprite = Sprite.from(source);

  sprite.interactive = true;
  sprite.anchor.set(0.5);

  const width = 90;
  const height = 90;

  sprite.alpha = 1;
  sprite.width = width;
  sprite.height = height;

  sprite.x = sprite.width / 2 + (gameWidth - sprite.width) * x;
  sprite.y = sprite.height / 2 + (gameHeight - sprite.height) * y;

  const setScale = (scale: number) => {
    sprite.width = width * scale;
    sprite.height = height * scale;
  };

  // Button state
  let active = true;
  let pressed = false;

  // Button object
  const btn = {
    sprite: sprite,
    set active(value: boolean) {
      active = value;
      sprite.alpha = active ? 1 : 0.5;
    },
    get active() {
      return active;
    },
  };

  sprite.on("pointerdown", () => {
    pressed = true;
    setScale(0.95);
  });

  sprite.on("pointerup", () => {
    pressed = false;
    setScale(1);
    onClick(btn);
  });

  return btn;
}

function createRectangularButton() {}

export { createButton, createRectangularButton };
