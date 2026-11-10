import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { PLANS } from "@/constants/landingContent";
import {
  FREE_DEMO_PLAN_ID,
  planLabelForId,
  type DemoFormPlanId,
} from "@/lib/planNavigation";

type PlanSelectFieldProps = {
  value: DemoFormPlanId;
  onChange: (planId: DemoFormPlanId) => void;
  fieldClass: string;
  fieldStyle?: { backgroundColor: string; color: string };
};

function paidPlanLabel(plan: (typeof PLANS)[number]) {
  const period = plan.period ? ` ${plan.period}` : "";
  return `${plan.name} ${plan.price}${period}`;
}

export function PlanSelectField({ value, onChange, fieldClass, fieldStyle }: PlanSelectFieldProps) {
  const [open, setOpen] = useState(false);

  const triggerLabel = planLabelForId(value) ?? "Select a plan";
  const paidPlan = value !== FREE_DEMO_PLAN_ID ? PLANS.find((plan) => plan.id === value) : null;

  return (
    <View className="gap-1">
      <Pressable
        onPress={() => setOpen((v) => !v)}
        className={`${fieldClass} flex-row items-center justify-between`}
        style={fieldStyle}
      >
        <Text className="font-body text-base text-white-pure">
          {paidPlan ? paidPlanLabel(paidPlan) : triggerLabel}
        </Text>
        <MaterialIcons name={open ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={22} color="#9aa3b8" />
      </Pressable>
      {open ? (
        <View className="w-full overflow-hidden rounded border border-outline-variant/50 bg-surface-container-high">
          <Pressable
            onPress={() => {
              onChange(FREE_DEMO_PLAN_ID);
              setOpen(false);
            }}
            className={`border-b border-outline-variant/30 px-4 py-3 active:bg-surface-container-low ${
              value === FREE_DEMO_PLAN_ID ? "bg-surface-container-low" : ""
            }`}
          >
            <Text className="font-bodySemi text-sm text-white-pure">Free demo</Text>
            <Text className="font-body text-xs text-secondary">Schedule a product walkthrough</Text>
          </Pressable>
          {PLANS.map((plan) => (
            <Pressable
              key={plan.id}
              onPress={() => {
                onChange(plan.id);
                setOpen(false);
              }}
              className={`border-b border-outline-variant/20 px-4 py-3 active:bg-surface-container-low ${
                value === plan.id ? "bg-surface-container-low" : ""
              }`}
            >
              <Text className="font-bodySemi text-sm text-white-pure">{plan.name}</Text>
              <Text className="font-body text-xs text-secondary">
                {plan.price}
                {plan.period}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}
