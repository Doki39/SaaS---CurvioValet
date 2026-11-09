import { Platform, View, useWindowDimensions, type ImageStyle } from "react-native";
import { Image } from "expo-image";

type BrandMarkProps = {
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
};

const LOGO = require("@/assets/curviovalet-logo.jpg");

const HEIGHT: Record<NonNullable<BrandMarkProps["size"]>, number> = {
  sm: 52,
  md: 72,
  lg: 96,
};

const WIDTH_RATIO = 4.8;

export function BrandMark({ size, onDark }: BrandMarkProps) {
  const { width } = useWindowDimensions();
  const resolved =
    size ?? (width >= 900 ? "lg" : width >= 480 ? "md" : "sm");
  const height = HEIGHT[resolved];

  const imageStyle: ImageStyle = {
    height,
    width: height * WIDTH_RATIO,
    opacity: onDark ? 0.9 : 0.97,
    ...(Platform.OS === "web" && !onDark ? { mixBlendMode: "multiply" as const } : {}),
  };

  return (
    <View
      className={
        onDark
          ? "justify-center rounded-lg bg-white/[0.04] px-2 py-1"
          : "justify-center"
      }
    >
      <Image
        source={LOGO}
        accessibilityLabel="CurvioValet — hotel operation software"
        contentFit="contain"
        style={imageStyle}
      />
    </View>
  );
}
