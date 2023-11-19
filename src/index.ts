import "./style.css";
import { Assets, Sprite, Text, SpriteSource, Texture } from "pixi.js";
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

Text.defaultResolution = 3;
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

window.onload = async (): Promise<void> => {
  const textures = await loadGameAssets();

  const background = Sprite.from(textures.background);
  const button = Sprite.from(textures.button);

  const number = Sprite.from(textures.blank);
  const mystery = Sprite.from(textures.mystery);

  setPosition(mystery, 0.51, 0.16);

  useScale(number)(0.8);
  setPosition(number, 0.5, 0.1);

  // Create win scene
  const win = Sprite.from(textures.win);

  // Create lose scene
  const lose = Sprite.from(textures.lose);
  useScale(lose)(1.1);
  setPosition(lose, 0.5, 0.45);

  const chooseButton = createButton(button, 0.5, 0.9, 160, 140, goToFinal);

  const playAgainButton = createButton(
    new Text("PLAY AGAIN", { fill: 0xffffff, fontSize: 14 }),
    0.5,
    0.8,
    180,
    60,
    goToStart
  );

  const selectionButtons: Button[] = repeat9((num) => {
    const [key] = symTextures[num - 1];
    const sprite = Sprite.from(textures[key]);

    const button = createButton(sprite, 0.1 * num, 0.6, 100, 100, () => {
      game.select(num as Selected);

      for (const [index, button] of selectionButtons.entries()) {
        button.active = game.hasSelected((index + 1) as Selected);
      }

      chooseButton.active = game.maxSelectionReached;
      chooseButton.source.interactive = game.maxSelectionReached;
    });

    return button;
  });

  function goToFinal() {
    const winnerNumber = (Math.floor(Math.random() * 9) + 1) as Selected;
    const won = game.hasSelected(winnerNumber);

    chooseButton.source.interactive = false;

    for (const button of selectionButtons) {
      button.source.interactive = false;
    }

    setTimeout(() => {
      const [key] = symTextures[winnerNumber - 1];
      number.texture = textures[key] as Texture;
      mystery.visible = false;

      if (won) {
        setTimeout(() => {
          win.visible = true;
          playAgainButton.source.visible = true;
        }, 1000);
      } else {
        lose.visible = true;
        playAgainButton.source.visible = true;
        chooseButton.source.visible = false;
      }
    }, 2000);
  }

  function goToStart() {
    win.visible = false;
    lose.visible = false;

    for (const button of selectionButtons) {
      button.source.interactive = true;
      button.source.visible = true;
      button.active = true;
    }

    playAgainButton.source.visible = false;

    chooseButton.source.interactive = false;
    chooseButton.source.visible = true;
    chooseButton.active = false;

    number.texture = textures.blank as Texture;
    mystery.visible = true;

    game.clearSelection();
  }
  game.stage.addChild(background);
  game.stage.addChild(chooseButton.source);

  for (const button of selectionButtons) {
    game.stage.addChild(button.source);
  }

  game.stage.addChild(number);
  game.stage.addChild(mystery);

  game.stage.addChild(lose);
  game.stage.addChild(win);
  game.stage.addChild(playAgainButton.source);

  resizeCanvas();
  goToStart();
};

function resizeCanvas(): void {
  game.app.renderer.resize(window.innerWidth, window.innerHeight);
  //stage.scale.x = window.innerWidth / gameWidth;
  //stage.scale.y = window.innerHeight / gameHeight;
}

document.body.appendChild<HTMLCanvasElement>(
  game.app.view as HTMLCanvasElement
);

window.addEventListener("resize", resizeCanvas);
