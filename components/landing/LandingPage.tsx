import { useCallback } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  APP_URL,
  AUDIENCES,
  BRAND,
  FAQ,
  FEATURES,
  HERO,
  PLANS,
  PROBLEMS,
  REQUEST_DEMO_CTA,
  ROADMAP,
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
import { PlanPrice } from "@/components/ui/PlanPrice";
import { FaqItem } from "@/components/landing/FaqItem";

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

function openApp() {
  void Linking.openURL(APP_URL);
}

function openDemo() {
  void Linking.openURL(`mailto:hello@curviovalet.com?subject=${encodeURIComponent(`${BRAND} demo request`)}`);
}

export function LandingPage() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  const scrollToPricing = useCallback(() => {
    if (typeof document !== "undefined") {
      document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <View className="flex-1 bg-surface">
      <StatusBar style="dark" />
      <View
        className="absolute top-0 z-50 w-full border-b border-outline-variant/30 bg-surface/90"
        style={{
          paddingTop: HEADER_BAR_PADDING_Y,
          paddingBottom: HEADER_BAR_PADDING_Y,
        }}
      >
        <View
          className="mx-auto w-full max-w-layout-shell flex-row items-center justify-between px-margin-mobile"
          style={{ height: HEADER_BRAND_HEIGHT }}
        >
          <BrandMark align="start" size="header" />
          <Pressable
            onPress={openDemo}
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
            <View className="absolute inset-0 bg-surface/80" />
            <View
              className={`relative z-10 items-center justify-center px-margin-mobile pb-section-gap text-center ${
                isWide ? "min-h-[560px]" : "min-h-[480px]"
              }`}
              style={{ paddingTop: HEADER_BAR_HEIGHT }}
            >
              <Text className="mb-stack-md border-b border-gold-light pb-1 font-bodySemi text-xs uppercase tracking-widest text-gold-light">
                {HERO.eyebrow}
              </Text>
              <Text className="mb-stack-md text-center font-display text-4xl leading-tight text-primary">
                {HERO.title}
              </Text>
              <Text className="mb-stack-lg max-w-xl text-center font-body text-lg leading-7 text-secondary">
                {HERO.subtitle}
              </Text>
              <View className={`w-full gap-stack-md ${isWide ? "max-w-md flex-row" : ""}`}>
                <View className={isWide ? "flex-1" : "w-full"}>
                  <GoldButton label={REQUEST_DEMO_CTA} shimmer onPress={openDemo} />
                </View>
                <View className={isWide ? "flex-1" : "w-full"}>
                  <OutlineButton label="View Pricing" onPress={scrollToPricing} />
                </View>
              </View>
            </View>
          </View>

          <View className="bg-primary-container px-margin-mobile py-section-gap">
            <Text className="mb-stack-lg border-l-4 border-gold-light pl-4 font-displaySemi text-2xl text-white-pure">
              Beyond the Manual Log
            </Text>
            <View className="gap-stack-lg">
              {PROBLEMS.map((item) => (
                <View key={item.title} className="flex-row items-start gap-4">
                  <MaterialIcons name="warning" size={24} color="#ba1a1a" />
                  <View className="flex-1">
                    <Text className="mb-1 font-bodySemi text-base text-white-pure">{item.title}</Text>
                    <Text className="font-body text-sm leading-5 text-on-primary-container">{item.body}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View className="bg-surface-container-low px-margin-mobile py-section-gap">
            <View className="mx-auto max-w-md items-center">
              <MaterialIcons name="format-quote" size={40} color="#D4AF37" style={{ marginBottom: 16 }} />
              <Text className="mb-stack-md text-center font-displaySemi text-3xl text-primary">
                Respect the Surroundings
              </Text>
              <Text className="text-center font-body text-lg italic leading-7 text-secondary">
                &quot;We value your parking surroundings and want to avoid ugly markings. Instead of chalk
                numbers, painted spots, or temporary floor labels, we built a smarter way   using data you
                already capture at check-in. One photo, one digital record, and your team always knows where
                the car is.{" "}
                <Text className="font-bodySemi text-primary not-italic">Clean aesthetics outside. Complete clarity inside.</Text>
                &quot;
              </Text>
            </View>
          </View>

          <View className="px-margin-mobile py-section-gap">
            <Text className="mb-stack-lg text-center font-displaySemi text-2xl text-primary">
              Seamless Arrival Flow
            </Text>
            <View className={`gap-section-gap ${isWide ? "flex-row flex-wrap justify-center" : ""}`}>
              {STEPS.map((step) => (
                <View key={step.n} className={`items-center ${isWide ? "w-[280px]" : "w-full"}`}>
                  <View className="mb-4 h-12 w-12 items-center justify-center rounded-full bg-gold-light">
                    <Text className="font-bodySemi text-base text-primary-container">{step.n}</Text>
                  </View>
                  <Text className="mb-2 font-displaySemi text-2xl text-primary">{step.title}</Text>
                  <Text className="mb-6 text-center font-body text-base text-secondary">{step.body}</Text>
                  <View className="h-[480px] w-[240px] overflow-hidden rounded-[2rem] border-[6px] border-slate-muted bg-primary-container p-2 shadow-xl">
                    <Image
                      source={{ uri: step.image }}
                      className="h-full w-full rounded-[1.5rem]"
                      contentFit="cover"
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View className="bg-surface-container px-margin-mobile py-section-gap">
            <Text className="mb-stack-lg font-displaySemi text-2xl text-primary">Platform Capabilities</Text>
            <View className={`gap-4 ${isWide ? "flex-row flex-wrap" : ""}`}>
              {FEATURES.map((f) => (
                <View
                  key={f.title}
                  className={`glass-card gap-3 rounded-xl p-6 ${f.highlight ? "border-2 border-gold-light" : ""} ${
                    isWide ? "w-[calc(50%-0.5rem)]" : "w-full"
                  }`}
                >
                  <MaterialIcons name={FEATURE_ICON[f.icon]} size={28} color="#D4AF37" />
                  <Text className="font-bodySemi text-base text-primary">{f.title}</Text>
                  <Text className="font-body text-sm text-secondary">{f.body}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className="px-margin-mobile py-section-gap">
            <Text className="mb-stack-lg text-center font-displaySemi text-2xl text-primary">
              Built for the Entire Team
            </Text>
            <View className={`gap-gutter ${isWide ? "flex-row" : ""}`}>
              {AUDIENCES.map((a) => (
                <View
                  key={a.title}
                  className={`items-center rounded-xl border border-outline-variant/30 bg-white-pure p-6 shadow-sm ${isWide ? "flex-1" : ""}`}
                >
                  <Image source={{ uri: a.image }} className="mb-4 h-20 w-20 rounded-full" contentFit="cover" />
                  <Text className="mb-2 font-displaySemi text-2xl text-primary">{a.title}</Text>
                  <Text className="text-center font-body text-sm text-secondary">{a.body}</Text>
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
            <Text className="mb-stack-lg text-center font-displaySemi text-2xl text-primary">Investment Plans</Text>
            <View className={`gap-gutter ${isWide ? "flex-row items-stretch justify-center" : ""}`}>
              {PLANS.map((plan) => (
                <View
                  key={plan.id}
                  className={`rounded-xl p-8 ${
                    plan.dark
                      ? "border-2 border-gold-light bg-primary-container"
                      : "border border-outline-variant/50 bg-white-pure"
                  } ${plan.popular && isWide ? "scale-105" : ""} ${isWide ? "w-[320px]" : ""}`}
                >
                  {plan.popular ? (
                    <Text className="mb-2 self-end rounded bg-gold-light px-3 py-1 font-bodySemi text-[10px] uppercase text-primary-container">
                      Most popular
                    </Text>
                  ) : null}
                  <Text
                    className={`mb-2 font-bodySemi text-xs uppercase tracking-widest ${
                      plan.dark ? "text-on-primary-container" : "text-secondary"
                    }`}
                  >
                    {plan.name}
                  </Text>
                  <PlanPrice price={plan.price} period={plan.period} dark={plan.dark} />
                  <View className="mb-8 gap-3">
                    {plan.features.map((feat) => (
                      <View key={feat} className="flex-row items-center gap-2">
                        <MaterialIcons name="done" size={16} color="#D4AF37" />
                        <Text
                          className={`font-body text-sm ${plan.dark ? "text-white-pure" : "text-primary"}`}
                        >
                          {feat}
                        </Text>
                      </View>
                    ))}
                  </View>
                  {plan.dark ? (
                    <GoldButton label={plan.cta} shimmer onPress={openApp} />
                  ) : (
                    <OutlineButton label={plan.cta} onPress={plan.id === "enterprise" ? openDemo : openApp} />
                  )}
                </View>
              ))}
            </View>
          </View>

          <View className="px-margin-mobile py-section-gap">
            <Text className="mb-stack-lg text-center font-displaySemi text-2xl text-primary">Visionary Roadmap</Text>
            <View className="mx-auto max-w-xs gap-stack-lg">
              {ROADMAP.map((item, index) => (
                <View key={item.title} className={`flex-row gap-4 ${item.done ? "" : "opacity-50"}`}>
                  <View className="items-center">
                    <View
                      className={`h-2 w-2 rounded-full ${item.done ? "bg-gold-light" : "bg-outline-variant"}`}
                    />
                    {index < ROADMAP.length - 1 ? (
                      <View className="mt-1 h-full w-0.5 bg-outline-variant/30" />
                    ) : null}
                  </View>
                  <View className="pb-6">
                    <Text className="font-bodySemi text-xs text-gold-light">{item.when}</Text>
                    <Text className="font-bodySemi text-base text-primary">{item.title}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View className="bg-surface px-margin-mobile py-section-gap">
            <Text className="mb-8 text-center font-bodySemi text-xs uppercase tracking-widest text-secondary">
              Trusted by industry leaders
            </Text>
            <View className="mb-stack-lg flex-row flex-wrap justify-center gap-8 opacity-40">
              {["L'HOTEL", "PALACE", "GRAND", "RESORT"].map((name) => (
                <Text key={name} className="font-display text-2xl text-primary">
                  {name}
                </Text>
              ))}
            </View>
            <View className="rounded-xl border border-outline-variant/30 bg-white-pure p-8 shadow-sm">
              <Text className="mb-6 font-body italic text-base text-primary">
                &quot;{BRAND} transformed our arrival experience. The visual integrity of our driveway is
                preserved, and the team finally has complete clarity.&quot;
              </Text>
              <View className="flex-row items-center gap-4">
                <View className="h-12 w-12 rounded-full bg-surface-container" />
                <View>
                  <Text className="font-bodySemi text-primary">Marcus Thorne</Text>
                  <Text className="font-body text-xs text-secondary">General Manager, Grand Plaza</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="px-margin-mobile py-section-gap">
            <Text className="mb-stack-lg text-center font-displaySemi text-2xl text-primary">Common Questions</Text>
            <View className="gap-4">
              {FAQ.map((item) => (
                <FaqItem key={item.q} question={item.q} answer={item.a} defaultOpen={item.open} />
              ))}
            </View>
          </View>

          <View className="items-center px-margin-mobile py-section-gap">
            <Text className="mb-stack-md text-center font-display text-4xl text-primary">Ready to modernize?</Text>
            <Text className="mb-stack-lg text-center font-body text-base text-secondary">
              Join the world&apos;s most elegant hotels using {BRAND}.
            </Text>
            <View className="w-full max-w-md gap-4">
              <GoldButton label={REQUEST_DEMO_CTA} shimmer onPress={openDemo} />
              <Pressable onPress={openApp}>
                <Text className="py-4 text-center font-bodyMedium text-primary-container underline">
                  Open the app   {APP_URL.replace("https://", "")}
                </Text>
              </Pressable>
            </View>
          </View>

          <View className="w-full border-t border-on-primary-fixed-variant/50 bg-primary-container py-stack-lg">
            <View className="mx-auto w-full max-w-[1280px] gap-8 px-margin-mobile">
              <BrandMark size="lg" onDark />
              <View className="flex-row gap-8">
                <View className="flex-1 gap-4">
                  <Text className="font-bodySemi text-xs uppercase tracking-widest text-on-primary-container">
                    Platform
                  </Text>
                  <Pressable onPress={scrollToPricing}>
                    <Text className="font-body text-sm text-on-primary-container underline">Pricing</Text>
                  </Pressable>
                  <Pressable onPress={openApp}>
                    <Text className="font-body text-sm text-on-primary-container underline">Sign in</Text>
                  </Pressable>
                </View>
                <View className="flex-1 gap-4">
                  <Text className="font-bodySemi text-xs uppercase tracking-widest text-on-primary-container">
                    Product
                  </Text>
                  <Text className="font-body text-sm text-on-primary-container">Expo client + REST API</Text>
                  <Text className="font-body text-sm text-on-primary-container">{TAGLINE}</Text>
                </View>
              </View>
              <View className="border-t border-on-primary-fixed-variant/30 pt-8">
                <Text className="font-body text-sm text-on-primary-container">
                  � {new Date().getFullYear()} {BRAND}. {TAGLINE}.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
