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
  
  let active = true;
  const btn = {
    sprite: sprite,
    set active(value: boolean) {
      active = value;
      
      if(active) {
        sprite.alpha = 1;
      }else{
        sprite.alpha = 0.5;
      }
    },
    get active() {
      return active;
    },
  };

  sprite.interactive = true;
  sprite.anchor.set(0.5);

  sprite.width = 90;
  sprite.height = 90;

  sprite.x = sprite.width / 2 + (gameWidth - sprite.width) * x;
  sprite.y = sprite.height / 2 + (gameHeight - sprite.height) * y;

  sprite.on("pointertap", () => {
    onClick(btn);
  });

  return btn;
}

function createRectangularButton() {}

export { createButton, createRectangularButton };
