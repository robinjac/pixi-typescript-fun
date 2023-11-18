import "./style.css";
import { Assets, Sprite } from "pixi.js";
import { Tuple, takeFirst } from "./helpers";
import { createButton } from "./button";
import { game, stage } from "./shared";

async function loadGameAssets() {
  const otherTextures: Tuple<string>[] = [
    ["background", "assets/Background.png"],
    ["blank", "assets/blank.png"],
    ["button", "assets/button.png"],
    ["lose", "assets/lose.png"],
    ["mystery", "assets/mystery.png"],
    ["win", "assets/win.png"],
  ];

  const symTextures: Tuple<string>[] = Array.from({ length: 9 }, (_, index) => [
    `sym${index + 1}`,
    `assets/sym${index + 1}.png`,
  ]);

  const textures: Tuple<string>[] = [...otherTextures, ...symTextures];
  const assetKeys = textures.map(takeFirst);

  textures.forEach(([key, url]) => Assets.add(key, url));

  return Assets.load(assetKeys);
}

function resizeCanvas(): void {
  game.renderer.resize(window.innerWidth, window.innerHeight);
  //stage.scale.x = window.innerWidth / gameWidth;
  //stage.scale.y = window.innerHeight / gameHeight;
}

window.onload = async (): Promise<void> => {
  const textures = await loadGameAssets();

  const backgroundSprite = Sprite.from(textures.background);
  const button = createButton(textures.sym1, { x: 0.5, y: 0.5 }, () => {
    button.active = !button.active;
    console.log("hello world", button.active);
  });

  document.body.appendChild<HTMLCanvasElement>(game.view as HTMLCanvasElement);
  resizeCanvas();

  stage.addChild(backgroundSprite);
  stage.addChild(button.sprite);
};

window.addEventListener("resize", resizeCanvas);
