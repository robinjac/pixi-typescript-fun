import "./style.css";
import { Assets, Sprite, Text, SpriteSource } from "pixi.js";
import { createButton, Button } from "./button";
import {
  game,
  Tuple,
  takeFirst,
  useScale,
  setPosition,
  repeat9,
  Selected,
} from "./shared";

Text.defaultResolution = 2;
Text.defaultAutoResolution = false;

const otherTextures: Tuple<string>[] = [
  ["background", "assets/Background.png"],
  ["blank", "assets/blank.png"],
  ["button", "assets/button.png"],
  ["lose", "assets/lose.png"],
  ["mystery", "assets/mystery.png"],
  ["win", "assets/win.png"],
];

const symTextures: Tuple<string>[] = repeat9((num) => [
  `sym${num}`,
  `assets/sym${num}.png`,
]);

async function loadGameAssets(): Promise<Record<string, SpriteSource>> {
  const textures: Tuple<string>[] = [...otherTextures, ...symTextures];

  for (const [key, url] of textures) {
    Assets.add(key, url);
  }

  return Assets.load(textures.map(takeFirst));
}

function resizeCanvas(): void {
  game.app.renderer.resize(window.innerWidth, window.innerHeight);
  //stage.scale.x = window.innerWidth / gameWidth;
  //stage.scale.y = window.innerHeight / gameHeight;
}

window.onload = async (): Promise<void> => {
  const textures = await loadGameAssets();

  const background = Sprite.from(textures.background);
  const win = Sprite.from(textures.win);
  const lose = Sprite.from(textures.lose);
  const button = Sprite.from(textures.button);

  useScale(lose)(1.5);
  setPosition(lose, 0.5, 0.5);

  const chooseButton = createButton(button, 0.5, 0.8, 120, 110, goToFinal);

  const playAgainButton = createButton(
    new Text("PLAY AGAIN", { fill: 0xffffff, fontSize: 14 }),
    0.5,
    0.8,
    150,
    50,
    goToStart
  );

  const selectionButtons: Button[] = repeat9((num) => {
    const [key] = symTextures[num - 1];
    const sprite = Sprite.from(textures[key]);

    const button = createButton(sprite, 0.1 * num, 0.5, 90, 90, () => {
      game.select(num as Selected);

      for (const [index, button] of selectionButtons.entries()) {
        button.active = game.hasSelected(index + 1 as Selected);
      }

      chooseButton.source.visible = game.maxSelectionReached;
    });

    return button;
  });

  function goToFinal() {
    for (const button of selectionButtons) {
      button.source.visible = false;
      button.active = false;
    }

    chooseButton.source.visible = false;
    playAgainButton.source.visible = true;

    (game.hasSelected((Math.floor(Math.random() * 9) + 1) as Selected)
      ? win
      : lose
    ).visible = true;
  }

  function goToStart() {
    win.visible = false;
    lose.visible = false;

    for (const button of selectionButtons) {
      button.source.visible = true;
      button.active = false;
    }

    playAgainButton.source.visible = false;
    chooseButton.source.visible = false;

    game.clearSelection();
  }

  document.body.appendChild<HTMLCanvasElement>(
    game.app.view as HTMLCanvasElement
  );

  resizeCanvas();
  goToStart();

  game.stage.addChild(background);
  game.stage.addChild(chooseButton.source);

  for (const button of selectionButtons) {
    game.stage.addChild(button.source);
  }

  game.stage.addChild(lose);
  game.stage.addChild(win);
  game.stage.addChild(playAgainButton.source);
};

window.addEventListener("resize", resizeCanvas);
