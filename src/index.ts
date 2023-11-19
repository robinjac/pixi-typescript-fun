import "./style.css";
import { Assets, Sprite, Text, SpriteSource } from "pixi.js";
import { createButton, Button } from "./button";
import {
  game,
  stage,
  Tuple,
  takeFirst,
  useScale,
  setPosition,
  repeat9,
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

const symTextures: Tuple<string>[] = repeat9((index) => [
  `sym${index + 1}`,
  `assets/sym${index + 1}.png`,
]);

async function loadGameAssets(): Promise<Record<string, SpriteSource>> {
  const textures: Tuple<string>[] = [...otherTextures, ...symTextures];

  for (const [key, url] of textures) {
    Assets.add(key, url);
  }

  return Assets.load(textures.map(takeFirst));
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
  const button = Sprite.from(textures.button);

  useScale(lose)(1.5);
  setPosition(lose, 0.5, 0.5);

  const chooseButton = createButton(button, 0.5, 0.8, 120, 110, () =>
    finalGameState(1)
  );


  const playAgainButton = createButton(
    new Text("PLAY AGAIN", { fill: 0xffffff, fontSize: 14 }),
    0.5,
    0.8,
    150,
    50,
    initialGameState
  );

  const selectionButtons: Button[] = repeat9(index => {
    const [key,] = symTextures[index];
    const sprite = Sprite.from(textures[key])

    const button = createButton(sprite, 0.1 * (index + 1), 0.5, 90, 90, () => {
      button.active = !button.active;
      chooseButton.source.visible = false;
    })

    return button;
  })

  function finalGameState(selection: number) {
    selectionButtons[selection - 1].source.visible = false;
    chooseButton.source.visible = false;
    playAgainButton.source.visible = true;

    (Math.floor(Math.random() * 9) + 1 === selection ? win : lose).visible =
      true;
  }

  function initialGameState() {
    win.visible = false;
    lose.visible = false;

    for(const button of selectionButtons) {
      button.source.visible = true;
      button.active = false;
    }

    playAgainButton.source.visible = false;
  }

  document.body.appendChild<HTMLCanvasElement>(game.view as HTMLCanvasElement);

  resizeCanvas();
  initialGameState();

  stage.addChild(background);
  stage.addChild(chooseButton.source);

  for(const button of selectionButtons) {
    stage.addChild(button.source);
  }

  stage.addChild(lose);
  stage.addChild(win);
  stage.addChild(playAgainButton.source);
};

window.addEventListener("resize", resizeCanvas);
