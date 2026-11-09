import { View, useWindowDimensions, type ImageStyle } from "react-native";
import { Image } from "expo-image";

export type BrandLogoVariant = "main" | "tagline";

type BrandMarkProps = {
  size?: "header" | "sm" | "md" | "lg";
  variant?: BrandLogoVariant;
  onDark?: boolean;
  align?: "start" | "center";
};

const LOGO_MAIN = require("@/assets/curviovalet-logo-main.png");
const LOGO_TAGLINE = require("@/assets/curviovalet-logo-tagline.png");

const HEIGHT: Record<NonNullable<BrandMarkProps["size"]>, number> = {
  header: 64,
  sm: 56,
  md: 76,
  lg: 100,
};

const WIDTH_RATIO: Record<BrandLogoVariant, number> = {
  main: 3.85,
  tagline: 4.8,
};

export function BrandMark({
  size,
  variant = "main",
  onDark,
  align = "center",
}: BrandMarkProps) {
  const { width } = useWindowDimensions();
  const resolved =
    size ?? (width >= 900 ? "lg" : width >= 480 ? "md" : "sm");
  const height = HEIGHT[resolved];
  const source = variant === "tagline" ? LOGO_TAGLINE : LOGO_MAIN;

  const imageStyle: ImageStyle = {
    height,
    width: height * WIDTH_RATIO[variant],
    opacity: onDark ? 0.95 : 1,
  };

  return (
    <View
      className={
        align === "start"
          ? "shrink-0 self-center items-start"
          : "items-center justify-center"
      }
    >
      <Image
        source={source}
        accessibilityLabel="CurvioValet"
        contentFit="contain"
        style={imageStyle}
      />
    </View>
  );
}
