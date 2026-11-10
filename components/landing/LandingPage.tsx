import { Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  AUDIENCES,
  BRAND,
  FAQ,
  FEATURES,
  FOOTER_PRODUCT_ITEMS,
  HERO,
  PROBLEMS,
  REQUEST_DEMO_CTA,
  STEPS,
  TAGLINE,
  WHY_POINTS,
} from "@/constants/landingContent";
import { getHeroImageSource } from "@/constants/heroImage";
import {
  BrandMark,
  HEADER_BAR_HEIGHT,
  HEADER_BAR_PADDING_Y,
  HEADER_BRAND_HEIGHT,
} from "@/components/ui/BrandMark";
import { GoldButton } from "@/components/ui/GoldButton";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { FaqItem } from "@/components/landing/FaqItem";
import { FeatureCapabilityCard } from "@/components/landing/FeatureCapabilityCard";
import { ProblemsVideo } from "@/components/landing/ProblemsVideo";
import { PlanCards } from "@/components/pricing/PlanCards";
import { goToDemo, goToPlans } from "@/lib/planNavigation";

const FEATURE_ICON: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  "photo-camera": "photo-camera",
  inventory: "inventory-2",
  "visibility-off": "visibility-off",
  "vpn-key": "vpn-key",
  assignment: "assignment",
  history: "history",
  apartment: "apartment",
  domain: "domain",
};

export function LandingPage() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  return (
    <View className="flex-1 bg-surface">
      <StatusBar style="light" />
      <View
        className="absolute top-0 z-50 w-full border-b border-outline-variant/50 bg-primary-container/90"
        style={{
          paddingTop: HEADER_BAR_PADDING_Y,
          paddingBottom: HEADER_BAR_PADDING_Y,
        }}
      >
        <View
          className="mx-auto w-full max-w-layout-shell flex-row items-center justify-between px-margin-mobile"
          style={{ height: HEADER_BRAND_HEIGHT }}
        >
          <BrandMark align="start" size="header" onDark />
          <Pressable
            onPress={() => goToDemo()}
            className="shrink-0 flex-row items-center justify-center rounded bg-gold-light px-4 py-2.5 active:opacity-90"
          >
            <Text className="font-bodyMedium text-sm leading-none text-primary-container">
              {REQUEST_DEMO_CTA}
            </Text>
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="pb-stack-lg" showsVerticalScrollIndicator={false}>
        <View>
          <View className="relative w-full overflow-hidden">
            <Image
              source={getHeroImageSource()}
              className="absolute inset-0 h-full w-full"
              contentFit="cover"
              contentPosition="center"
              priority="high"
              cachePolicy="memory-disk"
            />
            <View className="absolute inset-0 bg-primary-container/70" />
            <View
              className={`relative z-10 items-center justify-center px-margin-mobile pb-section-gap text-center ${
                isWide ? "min-h-[560px]" : "min-h-[480px]"
              }`}
              style={{ paddingTop: HEADER_BAR_HEIGHT }}
            >
              <Text className="mb-stack-md border-b border-gold-light pb-1 font-bodySemi text-xs uppercase tracking-widest text-gold-light">
                {HERO.eyebrow}
              </Text>
              <Text className="mb-stack-md text-center font-display text-4xl leading-tight text-white-pure">
                {HERO.title}
              </Text>
              <Text className="mb-stack-lg max-w-xl text-center font-body text-lg leading-7 text-on-primary-container">
                {HERO.subtitle}
              </Text>
              <View className={`w-full gap-stack-md ${isWide ? "max-w-md flex-row" : ""}`}>
                <View className={isWide ? "flex-1" : "w-full"}>
                  <GoldButton label={REQUEST_DEMO_CTA} shimmer onPress={() => goToDemo()} />
                </View>
                <View className={isWide ? "flex-1" : "w-full"}>
                  <OutlineButton label="View Pricing" onPress={goToPlans} />
                </View>
              </View>
            </View>
          </View>

          <View className="bg-primary-container px-margin-mobile py-section-gap">
            <View
              className={`mx-auto w-full max-w-layout-shell gap-gutter ${
                isWide ? "flex-row items-start" : ""
              }`}
            >
              <View className="min-w-0 flex-1">
                <Text className="mb-stack-lg font-displaySemi text-2xl text-white-pure">
                  Beyond the Manual Log
                </Text>
                <View className="gap-stack-lg">
                  {PROBLEMS.map((item) => (
                    <View key={item.title} className="flex-row items-start gap-4">
                      <MaterialIcons name="warning" size={24} color="#ba1a1a" />
                      <View className="min-w-0 flex-1">
                        <Text className="mb-1 font-bodySemi text-base text-white-pure">{item.title}</Text>
                        <Text className="font-body text-sm leading-5 text-on-primary-container">{item.body}</Text>
                      </View>
                    </View>
                  ))}
                </View>
                <Text className="mb-stack-md mt-stack-lg font-displaySemi text-xl text-white-pure">
                  Seamless Arrival Flow
                </Text>
                <View className="gap-stack-md">
                  {STEPS.map((step) => (
                    <View key={step.n} className="flex-row items-start gap-4">
                      <View className="h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-light">
                        <Text className="font-bodySemi text-sm text-primary-container">{step.n}</Text>
                      </View>
                      <View className="min-w-0 flex-1">
                        <Text className="mb-1 font-bodySemi text-base text-white-pure">{step.title}</Text>
                        <Text className="font-body text-sm leading-5 text-on-primary-container">{step.body}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
              <View className={isWide ? "w-[48%] shrink-0" : "mt-gutter w-full"}>
                <ProblemsVideo />
              </View>
            </View>
          </View>

          <View className="bg-surface-container-low px-margin-mobile py-section-gap">
            <View className="mx-auto max-w-md items-center">
              <MaterialIcons name="format-quote" size={40} color="#D4AF37" style={{ marginBottom: 16 }} />
              <Text className="mb-stack-md text-center font-displaySemi text-3xl text-white-pure">
                Respect the Surroundings
              </Text>
              <Text className="text-center font-body text-lg italic leading-7 text-on-primary-container">
                &quot;We value your parking surroundings and want to avoid ugly markings. Instead of chalk
                numbers, painted spots, or temporary floor labels, we built a smarter way   using data you
                already capture at check-in. One photo, one digital record, and your team always knows where
                the car is.{" "}
                <Text className="font-bodySemi text-white-pure not-italic">Clean aesthetics outside. Complete clarity inside.</Text>
                &quot;
              </Text>
            </View>
          </View>

          <View className="bg-surface-container px-margin-mobile py-section-gap">
            <Text className="mb-stack-lg font-displaySemi text-2xl text-white-pure">Platform Capabilities</Text>
            <View className={`gap-4 ${isWide ? "flex-row flex-wrap" : ""}`}>
              {FEATURES.map((f) => (
                <FeatureCapabilityCard
                  key={f.title}
                  icon={FEATURE_ICON[f.icon]}
                  title={f.title}
                  body={f.body}
                  widthClass={isWide ? "w-[calc(50%-0.5rem)]" : "w-full"}
                />
              ))}
            </View>
          </View>

          <View className="px-margin-mobile py-section-gap">
            <Text className="mb-stack-lg text-center font-displaySemi text-2xl text-white-pure">
              Built for the Entire Team
            </Text>
            <View className={`gap-gutter ${isWide ? "flex-row" : ""}`}>
              {AUDIENCES.map((a) => (
                <View
                  key={a.title}
                  className={`items-center rounded-xl border border-outline-variant/50 bg-surface-container p-6 ${isWide ? "flex-1" : ""}`}
                >
                  <Image source={{ uri: a.image }} className="mb-4 h-20 w-20 rounded-full" contentFit="cover" />
                  <Text className="mb-2 font-displaySemi text-2xl text-white-pure">{a.title}</Text>
                  <Text className="text-center font-body text-sm text-on-primary-container">{a.body}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className="bg-primary-container px-margin-mobile py-section-gap">
            <Text className="mb-stack-lg font-displaySemi text-2xl text-white-pure">Why {BRAND}?</Text>
            <View className="gap-4">
              {WHY_POINTS.map((line) => (
                <View key={line} className="flex-row items-center gap-3">
                  <MaterialIcons name="check-circle" size={22} color="#D4AF37" />
                  <Text className="font-body text-base text-white-pure">{line}</Text>
                </View>
              ))}
            </View>
          </View>

          <View nativeID="pricing" className="bg-surface-container-high px-margin-mobile py-section-gap">
            <Text className="mb-stack-lg text-center font-displaySemi text-2xl text-white-pure">Investment Plans</Text>
            <PlanCards onSelectPlan={goToDemo} variant="onDark" />
          </View>

          <View className="px-margin-mobile py-section-gap">
            <Text className="mb-stack-lg text-center font-displaySemi text-2xl text-white-pure">Common Questions</Text>
            <View className="gap-4">
              {FAQ.map((item) => (
                <FaqItem key={item.q} question={item.q} answer={item.a} defaultOpen={item.open} />
              ))}
            </View>
          </View>

          <View className="items-center px-margin-mobile py-section-gap">
            <Text className="mb-stack-md text-center font-display text-4xl text-white-pure">Ready to modernize?</Text>
            <Text className="mb-stack-lg text-center font-body text-base text-on-primary-container">
              Join the world&apos;s most elegant hotels using {BRAND}.
            </Text>
            <View className="w-full max-w-md gap-4">
              <GoldButton label={REQUEST_DEMO_CTA} shimmer onPress={() => goToDemo()} />
            </View>
          </View>

          <View className="w-full border-t border-on-primary-fixed-variant/50 bg-primary-container py-stack-lg">
            <View className="mx-auto w-full max-w-[1280px] gap-8 px-margin-mobile">
              <View className="flex-row gap-8">
                <View className="flex-1 gap-4">
                  <Text className="font-bodySemi text-xs uppercase tracking-widest text-on-primary-container">
                    Platform
                  </Text>
                  <Pressable onPress={goToPlans}>
                    <Text className="font-body text-sm text-on-primary-container underline">Pricing</Text>
                  </Pressable>
                </View>
                <View className="flex-1 gap-4">
                  <Text className="font-bodySemi text-xs uppercase tracking-widest text-on-primary-container">
                    Product
                  </Text>
                  {FOOTER_PRODUCT_ITEMS.map((item) => (
                    <Text key={item} className="font-body text-sm text-on-primary-container">
                      {item}
                    </Text>
                  ))}
                </View>
              </View>
              <View className="border-t border-on-primary-fixed-variant/30 pt-8">
                <Text className="font-body text-sm text-on-primary-container">
                  Copyright {new Date().getFullYear()} {BRAND}. {TAGLINE}.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
