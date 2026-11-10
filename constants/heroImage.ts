import type { ImageSource } from "expo-image";

const bundledHero = require("@/assets/hero.jpg");

export function getHeroImageSource(): ImageSource {
  return bundledHero;
}
