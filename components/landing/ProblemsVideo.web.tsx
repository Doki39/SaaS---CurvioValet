import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { PROBLEMS_VIDEO } from "@/constants/landingContent";
import { encodePublicAssetUrl, videoSourceAvailable } from "@/lib/videoSourceAvailable";
import {
  ProblemsVideoDisclaimer,
  ProblemsVideoPlaceholder,
} from "@/components/landing/ProblemsVideoPlaceholder";

const shellClass =
  "w-full items-center overflow-hidden rounded-xl border border-outline-variant/30 bg-primary-container shadow-xl";

const videoStyle = {
  width: "100%",
  height: "100%",
  objectFit: "contain" as const,
  display: "block" as const,
  backgroundColor: "#131b2e",
};

type LoadState = "checking" | "ready" | "missing";

function videoFrameStyle(aspectRatio: number) {
  return {
    width: "100%" as const,
    aspectRatio,
    alignSelf: "center" as const,
  };
}

export function ProblemsVideo() {
  const { enabled, src, poster, ariaLabel, placeholderTitle, previewTitle, previewSubtitle, muted } =
    PROBLEMS_VIDEO;
  const [loadState, setLoadState] = useState<LoadState>(enabled ? "checking" : "missing");
  const [playbackFailed, setPlaybackFailed] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const [hasPlayed, setHasPlayed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoUrl = encodePublicAssetUrl(src);

  useEffect(() => {
    if (!enabled) {
      setLoadState("missing");
      return;
    }
    let cancelled = false;
    setLoadState("checking");
    setPlaybackFailed(false);
    setHasPlayed(false);
    void videoSourceAvailable(src).then((available) => {
      if (!cancelled) {
        setLoadState(available ? "ready" : "missing");
      }
    });
    return () => {
      cancelled = true;
    };
  }, [enabled, src]);

  const handleMetadata = (event: SyntheticEvent<HTMLVideoElement>) => {
    const { videoWidth, videoHeight } = event.currentTarget;
    if (videoWidth > 0 && videoHeight > 0) {
      setAspectRatio(videoWidth / videoHeight);
    }
  };

  const startPlayback = () => {
    const el = videoRef.current;
    if (!el) return;
    void el.play();
  };

  const handleEnded = () => {
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    setHasPlayed(false);
  };

  const showPlaceholder = !enabled || loadState === "missing" || playbackFailed;

  if (loadState === "checking" && enabled) {
    return (
      <View className="w-full gap-2">
        <View className={`${shellClass} min-h-[12rem] justify-center py-12`}>
          <ActivityIndicator color="#D4AF37" />
        </View>
        <ProblemsVideoDisclaimer />
      </View>
    );
  }

  if (showPlaceholder) {
    return <ProblemsVideoPlaceholder title={placeholderTitle} />;
  }

  return (
    <View className="w-full gap-2">
      <View className={shellClass}>
        <View className="relative max-h-[72vh] w-full" style={videoFrameStyle(aspectRatio)}>
          <video
            ref={videoRef}
            src={videoUrl}
            poster={poster}
            controls
            playsInline
            muted={muted}
            preload="metadata"
            aria-label={ariaLabel}
            style={videoStyle}
            onLoadedMetadata={handleMetadata}
            onPlay={() => setHasPlayed(true)}
            onEnded={handleEnded}
            onError={() => setPlaybackFailed(true)}
          />
          {!hasPlayed ? (
            <Pressable
              onPress={startPlayback}
              accessibilityRole="button"
              accessibilityLabel="Play product walkthrough video"
              className="absolute inset-0 z-10 items-center justify-center gap-3 bg-primary-container px-6"
            >
              <View className="h-14 w-14 items-center justify-center rounded-full border-2 border-gold-light/60">
                <MaterialIcons name="play-arrow" size={36} color="#D4AF37" />
              </View>
              <Text className="text-center font-displaySemi text-lg text-white-pure">{previewTitle}</Text>
              <Text className="max-w-xs text-center font-body text-sm leading-5 text-on-primary-container">
                {previewSubtitle}
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>
      <ProblemsVideoDisclaimer />
    </View>
  );
}
