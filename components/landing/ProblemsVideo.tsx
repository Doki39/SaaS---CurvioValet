import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { PROBLEMS_VIDEO, PROBLEMS_VIDEO_DRAFT } from "@/constants/landingContent";

export function ProblemsVideo() {
  return (
    <View className="w-full gap-2">
      <View className="aspect-video w-full items-center justify-center rounded-xl border border-gold-light/40 bg-primary-container px-4">
        <MaterialIcons name="play-circle-outline" size={48} color="#D4AF37" />
        <Text className="mt-2 text-center font-bodySemi text-sm text-white-pure">
          {PROBLEMS_VIDEO_DRAFT.workingTitle}
        </Text>
      </View>
      <Text className="text-center font-body text-[10px] leading-4 text-on-primary-container">
        {PROBLEMS_VIDEO.disclaimer}
      </Text>
    </View>
  );
}
