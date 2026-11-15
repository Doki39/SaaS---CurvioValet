import { router } from "expo-router";
import { PLANS } from "@/constants/landingContent";

export const FREE_DEMO_PLAN_ID = "free-demo";

export type PlanId = (typeof PLANS)[number]["id"];
export type DemoFormPlanId = PlanId | typeof FREE_DEMO_PLAN_ID;

export function isPlanId(value: string | undefined): value is PlanId {
  if (!value) return false;
  return PLANS.some((plan) => plan.id === value);
}

export function isDemoFormPlanId(value: string | undefined): value is DemoFormPlanId {
  if (!value) return false;
  if (value === FREE_DEMO_PLAN_ID) return true;
  return isPlanId(value);
}

export function planLabelForId(id: string | undefined): string | null {
  if (id === FREE_DEMO_PLAN_ID) return "Free demo";
  if (!isPlanId(id)) return null;
  return PLANS.find((plan) => plan.id === id)?.name ?? null;
}

export function goToDemo(planId?: PlanId) {
  const selected = planId ?? FREE_DEMO_PLAN_ID;
  router.push({ pathname: "/demo", params: { plan: selected } });
}

export function goToHome() {
  router.replace("/");
}