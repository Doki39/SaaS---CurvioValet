import { View, useWindowDimensions, type ImageStyle } from "react-native";
import { Image } from "expo-image";

export type BrandLogoVariant = "main" | "tagline";

type BrandMarkProps = {
  size?: "header" | "sm" | "md" | "lg";
  height?: number;
  variant?: BrandLogoVariant;
  onDark?: boolean;
  align?: "start" | "center";
};

const LOGO_MAIN = require("@/assets/curviovalet-logo-main.png");
const LOGO_TAGLINE = require("@/assets/curviovalet-logo-tagline.png");

export const HEADER_BRAND_HEIGHT = 96;
export const HEADER_BAR_PADDING_Y = 16;
export const HEADER_BAR_HEIGHT = HEADER_BRAND_HEIGHT + HEADER_BAR_PADDING_Y * 2;

const HEIGHT: Record<NonNullable<BrandMarkProps["size"]>, number> = {
  header: HEADER_BRAND_HEIGHT,
  sm: 56,
  md: 76,
  lg: 100,
};

const WIDTH_RATIO: Record<BrandLogoVariant, number> = {
  main: 1.56,
  tagline: 1.56,
};

export function BrandMark({
  size,
  height: heightOverride,
  variant = "main",
  onDark,
  align = "center",
}: BrandMarkProps) {
  const { width } = useWindowDimensions();
  const resolved =
    size ?? (width >= 900 ? "lg" : width >= 480 ? "md" : "sm");
  const height = heightOverride ?? HEIGHT[resolved];
  const source = variant === "tagline" ? LOGO_TAGLINE : LOGO_MAIN;

  const isHeader = size === "header" || (size === undefined && resolved === "header");
  const imageStyle: ImageStyle = {
    height,
    width: height * WIDTH_RATIO[variant],
    opacity: onDark ? 0.95 : 1,
    ...(isHeader ? { marginVertical: 0 } : {}),
  };

  return (
    <View
      className={
        align === "start"
          ? "shrink-0 justify-center"
          : "items-center justify-center"
      }
    >
      <Image
        source={source}
        accessibilityLabel="CurvioValet"
        contentFit="contain"
        contentPosition="center"
        style={imageStyle}
      />
    </View>
  );
}
