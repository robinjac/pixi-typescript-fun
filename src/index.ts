import "./style.css";
import { Assets, Sprite, Application } from "pixi.js";
import { Tuple, takeFirst, takeSecond } from "./helpers";

const gameWidth = 1136;
const gameHeight = 640;

const app = new Application({
  backgroundColor: 0xd3d3d3,
  width: gameWidth,
  height: gameHeight,
});

const stage = app.stage;

async function loadGameAssets() {
  const otherSprites: Tuple<string>[] = [
    ["background", "assets/Background.png"],
    ["blank", "assets/blank.png"],
    ["button", "assets/button.png"],
    ["lose", "assets/lose.png"],
    ["mystery", "assets/mystery.png"],
    ["win", "assets/win.png"],
  ];

  const symSprites: Tuple<string>[] = Array.from({ length: 9 }, (_, index) => [
    `sym${index + 1}`,
    `assets/sym${index + 1}.png`,
  ]);

  const sprites: Tuple<string>[] = [...otherSprites, ...symSprites];
  const assetKeys = sprites.map(takeFirst);

  Assets.add(assetKeys, sprites.map(takeSecond));

  return Assets.load(assetKeys);
}

function resizeCanvas(): void {
  app.renderer.resize(window.innerWidth, window.innerHeight);
  stage.scale.x = window.innerWidth / gameWidth;
  stage.scale.y = window.innerHeight / gameHeight;
}

window.onload = async (): Promise<void> => {
  const textures = await loadGameAssets();
  const backgroundSprite = Sprite.from(textures.background);

  document.body.appendChild<HTMLCanvasElement>(app.view as HTMLCanvasElement);
  resizeCanvas();

  stage.addChild(backgroundSprite);
};

window.addEventListener("resize", resizeCanvas);
