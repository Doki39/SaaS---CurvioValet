import { Pressable, Text, type PressableProps } from "react-native";

type OutlineButtonProps = PressableProps & {
  label: string;
  className?: string;
  filledOnHover?: boolean;
};

export function OutlineButton({ label, className = "", ...props }: OutlineButtonProps) {
  return (
    <Pressable
      className={`rounded-lg border border-primary-container py-4 px-6 active:bg-primary-container ${className}`}
      {...props}
    >
      <Text className="text-center font-bodyMedium text-[15px] text-primary-container">{label}</Text>
    </Pressable>
  );
}
