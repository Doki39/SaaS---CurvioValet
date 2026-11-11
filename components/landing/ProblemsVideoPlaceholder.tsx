import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { PROBLEMS_VIDEO } from "@/constants/landingContent";

type ProblemsVideoPlaceholderProps = {
  title: string;
  caption?: string;
};

export function ProblemsVideoDisclaimer() {
  return (
    <Text className="px-1 text-center font-body text-[10px] leading-4 text-on-primary-container">
      {PROBLEMS_VIDEO.disclaimer}
    </Text>
  );
}

export function ProblemsVideoPlaceholder({ title, caption }: ProblemsVideoPlaceholderProps) {
  return (
    <View className="w-full gap-2">
      <View className="min-h-[12rem] w-full items-center justify-center gap-3 rounded-xl border border-gold-light/40 bg-primary-container px-6 py-12">
        <View className="h-14 w-14 items-center justify-center rounded-full border-2 border-gold-light/60 bg-primary-container">
          <MaterialIcons name="play-arrow" size={36} color="#D4AF37" />
        </View>
        <Text className="text-center font-displaySemi text-lg text-white-pure">{title}</Text>
        {caption ? (
          <Text className="max-w-sm text-center font-body text-sm leading-5 text-on-primary-container">
            {caption}
          </Text>
        ) : null}
      </View>
      <ProblemsVideoDisclaimer />
    </View>
  );
}
