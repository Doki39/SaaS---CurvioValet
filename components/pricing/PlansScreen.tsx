import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { BrandMark } from "@/components/ui/BrandMark";
import { PlanCards } from "@/components/pricing/PlanCards";
import { goToDemo, type PlanId } from "@/lib/planNavigation";

const pageSurfaceStyle = { backgroundColor: "#f8f9fa" as const };
const webPageStyle = Platform.OS === "web" ? { ...pageSurfaceStyle, minHeight: "100%" as const } : pageSurfaceStyle;

export function PlansScreen() {
  const selectPlan = (planId: PlanId) => {
    goToDemo(planId);
  };

  return (
    <View className="flex-1 bg-surface" style={webPageStyle}>
      <StatusBar style="dark" />
      <ScrollView className="flex-1 bg-surface" contentContainerClassName="pb-stack-lg" style={webPageStyle}>
        <View className="border-b border-outline-variant/30 px-margin-mobile py-4">
          <Pressable
            onPress={() => router.back()}
            className="mb-4 flex-row items-center gap-1 self-start active:opacity-70"
          >
            <MaterialIcons name="arrow-back" size={22} color="#545f73" />
            <Text className="font-bodyMedium text-sm text-secondary">Back</Text>
          </Pressable>
          <BrandMark align="start" size="header" />
        </View>

        <View className="mx-auto w-full max-w-layout-shell gap-2 px-margin-mobile py-stack-lg">
          <Text className="text-center font-displaySemi text-3xl text-primary">Investment Plans</Text>
          <Text className="mb-6 text-center font-body text-base leading-6 text-secondary">
            Choose a plan to continue with your demo request.
          </Text>
          <PlanCards onSelectPlan={selectPlan} variant="onLight" />
        </View>
      </ScrollView>
    </View>
  );
}
