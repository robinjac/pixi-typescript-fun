import "./style.css";
import { Assets, Sprite, Graphics, Text, Container } from "pixi.js";
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

  const background = Sprite.from(textures.background);
  const one = Sprite.from(textures.sym1);

  const button = createButton(one, 0.5, 0.5, 90, 90, () => {
    button.active = !button.active;
    console.log("hello world", button.active);
  });

  Text.defaultResolution = 2;
  Text.defaultAutoResolution = false;

  // Create a text object
  const text = new Text("PLAY AGAIN", { fill: 0xffffff, fontSize: 14 });

  const button2 = createButton(text, 0.5, 0.9, 150, 50, () => {
    console.log("restart game");
  });

  document.body.appendChild<HTMLCanvasElement>(game.view as HTMLCanvasElement);
  resizeCanvas();

  stage.addChild(background);
  stage.addChild(button.source);
  stage.addChild(button2.source);
};

window.addEventListener("resize", resizeCanvas);
