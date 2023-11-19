import "./style.css";
import { Assets, Sprite, Text, Container } from "pixi.js";
import { createButton } from "./button";
import { game, stage, Tuple, takeFirst, useScale, setPosition } from "./shared";

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
  const win = Sprite.from(textures.win);
  const lose = Sprite.from(textures.lose);
  const one = Sprite.from(textures.sym1);
  const button = Sprite.from(textures.button);

  Text.defaultResolution = 2;
  Text.defaultAutoResolution = false;

  useScale(lose)(1.5);
  setPosition(lose, 0.5, 0.5);

  const chooseButton = createButton(button, 0.5, 0.8, 120, 110, () => {

    oneButton.source.visible = false;
    chooseButton.source.visible = false;
    playAgainButton.source.visible = true;
    
    (Math.floor(Math.random() * 9) + 1 === 1 ? win : lose).visible = true;
  });

  const oneButton = createButton(one, 0.5, 0.5, 90, 90, () => {
    oneButton.active = !oneButton.active;
    chooseButton.source.visible = oneButton.active;
  });


  const playAgainButton = createButton(
    new Text("PLAY AGAIN", { fill: 0xffffff, fontSize: 14 }),
    0.5,
    0.8,
    150,
    50,
    () => {
      win.visible = false;
      lose.visible = false;

      oneButton.source.visible = true;
      oneButton.active = false;
      playAgainButton.source.visible = false;
    }
  );

  // Initial state
  win.visible = false;
  lose.visible = false;

  oneButton.source.visible = true;
  oneButton.active = false;
  playAgainButton.source.visible = false;

  document.body.appendChild<HTMLCanvasElement>(game.view as HTMLCanvasElement);
  resizeCanvas();

  stage.addChild(background);
  stage.addChild(oneButton.source);
  stage.addChild(chooseButton.source);

  stage.addChild(lose);
  stage.addChild(win);
  stage.addChild(playAgainButton.source);
};

window.addEventListener("resize", resizeCanvas);
