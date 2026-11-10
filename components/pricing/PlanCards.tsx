import { Text, View, useWindowDimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { PLANS } from "@/constants/landingContent";
import { type PlanId } from "@/lib/planNavigation";
import { GoldButton } from "@/components/ui/GoldButton";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { PlanPrice } from "@/components/ui/PlanPrice";

type PlanCardsProps = {
  onSelectPlan: (planId: PlanId) => void;
  variant?: "onDark" | "onLight";
};

export function PlanCards({ onSelectPlan, variant = "onDark" }: PlanCardsProps) {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const onLight = variant === "onLight";

  return (
    <View className={`gap-gutter ${isWide ? "flex-row items-stretch justify-center" : ""}`}>
      {PLANS.map((plan) => (
        <View
          key={plan.id}
          className={`rounded-xl border-2 p-8 ${
            onLight ? "border-outline-variant/50 bg-white-pure" : "bg-primary-container"
          } ${plan.popular ? "border-gold-light" : onLight ? "" : "border-outline-variant/50"} ${
            plan.popular && isWide ? "scale-105" : ""
          } ${isWide ? "w-[320px]" : ""}`}
        >
          {plan.popular ? (
            <Text className="mb-2 self-end rounded bg-gold-light px-3 py-1 font-bodySemi text-[10px] uppercase text-primary-container">
              Most popular
            </Text>
          ) : null}
          <Text
            className={`mb-2 font-bodySemi text-xs uppercase tracking-widest ${
              onLight ? "text-secondary" : "text-on-primary-container"
            }`}
          >
            {plan.name}
          </Text>
          <PlanPrice
            price={plan.price}
            period={plan.period}
            onDark={!onLight}
          />
          <View className="mb-8 gap-3">
            {plan.features.map((feat) => (
              <View key={feat} className="flex-row items-center gap-2">
                <MaterialIcons name="done" size={16} color="#D4AF37" />
                <Text className={`font-body text-sm ${onLight ? "text-primary" : "text-white-pure"}`}>
                  {feat}
                </Text>
              </View>
            ))}
          </View>
          {plan.popular ? (
            <GoldButton label={plan.cta} shimmer onPress={() => onSelectPlan(plan.id)} />
          ) : (
            <OutlineButton label={plan.cta} onPress={() => onSelectPlan(plan.id)} />
          )}
        </View>
      ))}
    </View>
  );
}
