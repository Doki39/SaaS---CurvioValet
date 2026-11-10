import { router } from "expo-router";
import { PLANS } from "@/constants/landingContent";

export type PlanId = (typeof PLANS)[number]["id"];

export function isPlanId(value: string | undefined): value is PlanId {
  if (!value) return false;
  return PLANS.some((plan) => plan.id === value);
}

export function planLabelForId(id: string | undefined): string | null {
  if (!isPlanId(id)) return null;
  return PLANS.find((plan) => plan.id === id)?.name ?? null;
}

export function goToDemo(planId?: PlanId) {
  if (planId) {
    router.push({ pathname: "/demo", params: { plan: planId } });
    return;
  }
  router.push("/demo");
}

export function goToPlans() {
  router.push("/plans");
}
