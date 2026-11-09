import { Platform } from "react-native";
import type { ImageSource } from "expo-image";

const WEB_HERO_PATH = "/images/hero.jpg";
const bundledHero = require("@/assets/hero.jpg");

export const HERO_DISPLAY_MAX_WIDTH_PX = 2048;

export function getHeroImageSource(): ImageSource {
  if (Platform.OS === "web") {
    return { uri: WEB_HERO_PATH };
  }
  return bundledHero;
}
