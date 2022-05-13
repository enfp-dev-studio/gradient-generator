import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const windowSizeAtom = atomWithStorage<{
  width: number;
  height: number;
}>("size", {
  width: 640,
  height: 480,
});

export const changeSizeAtom = atom(
  () => "",
  (get, set, { width, height }: { width: number; height: number }) => {
    // console.log(width, height);
    set(windowSizeAtom, () => {
      return {
        width,
        height,
      };
    });
  }
);

export const colorsAtom = atomWithStorage("colors", [
  "#b62f57",
  "#dc00ff",
  "#ffc100",
]);

export const addColorToAtom = atom(
  () => "",
  (get, set, { color }: { color: string }) => {
    set(colorsAtom, () => {
      const colors = get(colorsAtom);
      return [...colors, color];
    });
  }
);

export const removeColorToAtom = atom(
  () => "",
  (get, set, { color }: { color: string }) => {
    set(colorsAtom, () => {
      return get(colorsAtom).filter((e) => {
        return e === color;
      });
    });
  }
);

export const changeColorToAtom = atom(
  () => "",
  (get, set, { color, index }: { color: string; index: number }) => {
    set(colorsAtom, () => {
      let colors = get(colorsAtom);
      colors[index] = color;
      return colors;
    });
  }
);
