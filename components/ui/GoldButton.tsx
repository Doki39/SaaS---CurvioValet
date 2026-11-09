import { Pressable, Text, type PressableProps } from "react-native";

type GoldButtonProps = PressableProps & {
  label: string;
  shimmer?: boolean;
  className?: string;
};

export function GoldButton({ label, shimmer, className = "", ...props }: GoldButtonProps) {
  return (
    <Pressable
      className={`rounded-lg bg-gold-light py-4 px-6 active:opacity-90 ${shimmer ? "animate-shimmer" : ""} ${className}`}
      {...props}
    >
      <Text className="text-center font-bodyMedium text-[15px] text-primary-container">{label}</Text>
    </Pressable>
  );
}
