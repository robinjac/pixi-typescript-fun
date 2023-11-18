import "./style.css";
import { Assets, Sprite, Application } from "pixi.js";

const gameWidth = 1136;
const gameHeight = 640;

const app = new Application({
  backgroundColor: 0xd3d3d3,
  width: gameWidth,
  height: gameHeight,
});

const stage = app.stage;


async function loadGameAssets() {
  Assets.add("background", "assets/Background.png");
  Assets.add("button", "assets/button.png");
  
  return Assets.load(["background", "button"]);
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