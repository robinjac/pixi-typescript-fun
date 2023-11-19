import { Sprite, Text } from "pixi.js";
import { gameHeight, gameWidth } from "./shared";

type Button = {
  active: boolean;
  source: Sprite | Text;
};

function createButton(
  source: Sprite | Text,
  x: number,
  y: number,
  width: number,
  height: number,
  onClick: () => void
): Button {
  source.interactive = true;
  source.cursor = "pointer";
  source.anchor.set(0.5);

  const setScale = (scale: number) => {
    source.width = width * scale;
    source.height = height * scale;
  };

  // Button state
  let active = true;
  let pressed = false;

  source.alpha = 1;
  source.width = width;
  source.height = height;

  source.x = source.width / 2 + (gameWidth - source.width) * x;
  source.y = source.height / 2 + (gameHeight - source.height) * y;

  source.on("pointerdown", () => {
    pressed = true;
    setScale(0.95);
  });

  source.on("pointerup", () => {
    pressed = false;
    setScale(1);
    onClick();
  });

  return {
    source,
    set active(value: boolean) {
      active = value;
      source.alpha = active ? 1 : 0.5;
    },
    get active() {
      return active;
    },
  };
}

function createRectangularButton() {}

export { createButton, createRectangularButton };
