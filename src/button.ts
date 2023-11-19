import { useScale, Sprite, Text, setPosition } from "./shared";

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
  
  // Button state
  let active = true;
  let pressed = false;

  source.alpha = 1;
  source.width = width;
  source.height = height;

  setPosition(source, x, y);

  const setScale = useScale(source, width, height);

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

export { createButton, Button };
