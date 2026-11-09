import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { PROBLEMS_VIDEO, PROBLEMS_VIDEO_DRAFT } from "@/constants/landingContent";

const videoStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
  display: "block" as const,
  backgroundColor: "#131b2e",
};

function VideoDisclaimer() {
  return (
    <Text className="px-1 text-center font-body text-[10px] leading-4 text-on-primary-container">
      {PROBLEMS_VIDEO.disclaimer}
    </Text>
  );
}

export function ProblemsVideo() {
  const { enabled, src, poster, ariaLabel } = PROBLEMS_VIDEO;

  if (enabled) {
    return (
      <View className="w-full gap-2">
        <View className="aspect-video w-full overflow-hidden rounded-xl border border-outline-variant/30 shadow-xl">
          <video
            src={src}
            poster={poster}
            controls
            playsInline
            preload="metadata"
            aria-label={ariaLabel}
            style={videoStyle}
          />
        </View>
        <VideoDisclaimer />
      </View>
    );
  }

  return (
    <View className="w-full gap-2">
    <View className="min-h-[34rem] w-full overflow-hidden rounded-xl border border-gold-light/40 bg-primary-container shadow-xl">
      <View className="w-full items-center gap-4 px-5 py-8">
        <View className="h-14 w-14 items-center justify-center rounded-full border-2 border-gold-light/60 bg-primary-container">
          <MaterialIcons name="play-arrow" size={36} color="#D4AF37" />
        </View>
        <Text className="text-center font-displaySemi text-lg text-white-pure">
          {PROBLEMS_VIDEO_DRAFT.workingTitle}
        </Text>
        <Text className="text-center font-body text-xs uppercase tracking-widest text-gold-light">
          Video draft · {PROBLEMS_VIDEO_DRAFT.length}
        </Text>
        <View className="mt-1 w-full max-w-md gap-3">
          {PROBLEMS_VIDEO_DRAFT.scenes.map((scene) => (
            <View key={scene.title} className="gap-1">
              <View className="flex-row gap-2">
                <Text className="w-[4.5rem] shrink-0 font-bodySemi text-[10px] leading-4 text-gold-light">
                  {scene.time}
                </Text>
                <Text className="flex-1 font-body text-xs leading-5 text-on-primary-container">
                  <Text className="font-bodySemi text-white-pure">{scene.title}: </Text>
                  {scene.script}
                </Text>
              </View>
              <Text className="pl-[4.5rem] font-body text-[10px] italic leading-4 text-on-primary-container/80">
                {scene.shot}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
    <VideoDisclaimer />
    </View>
  );
}
