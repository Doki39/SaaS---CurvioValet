import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { PROBLEMS_VIDEO } from "@/constants/landingContent";
import { videoSourceAvailable } from "@/lib/videoSourceAvailable";
import {
  ProblemsVideoDisclaimer,
  ProblemsVideoPlaceholder,
} from "@/components/landing/ProblemsVideoPlaceholder";

const videoStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
  display: "block" as const,
  backgroundColor: "#131b2e",
};

type LoadState = "checking" | "ready" | "missing";

export function ProblemsVideo() {
  const { enabled, src, poster, ariaLabel, placeholderTitle, placeholderCaption } = PROBLEMS_VIDEO;
  const [loadState, setLoadState] = useState<LoadState>(enabled ? "checking" : "missing");
  const [playbackFailed, setPlaybackFailed] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setLoadState("missing");
      return;
    }
    let cancelled = false;
    setLoadState("checking");
    setPlaybackFailed(false);
    void videoSourceAvailable(src).then((available) => {
      if (!cancelled) {
        setLoadState(available ? "ready" : "missing");
      }
    });
    return () => {
      cancelled = true;
    };
  }, [enabled, src]);

  const showPlaceholder = !enabled || loadState === "missing" || playbackFailed;

  if (loadState === "checking" && enabled) {
    return (
      <View className="w-full gap-2">
        <View className="aspect-video w-full items-center justify-center rounded-xl border border-outline-variant/30 bg-primary-container">
          <ActivityIndicator color="#D4AF37" />
        </View>
        <ProblemsVideoDisclaimer />
      </View>
    );
  }

  if (showPlaceholder) {
    return (
      <ProblemsVideoPlaceholder
        title={placeholderTitle}
        caption={placeholderCaption}
      />
    );
  }

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
          onError={() => setPlaybackFailed(true)}
        />
      </View>
      <ProblemsVideoDisclaimer />
    </View>
  );
}
