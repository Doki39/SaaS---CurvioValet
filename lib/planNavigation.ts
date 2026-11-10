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

const SCROLL_PRICING_KEY = "curviovalet-scroll-pricing";

export function goToHome() {
  router.replace("/");
}

export function scrollToSection(sectionId: string) {
  if (typeof document !== "undefined") {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToPricingSection() {
  scrollToSection("pricing");
}

export function goToHomePricing() {
  if (typeof sessionStorage !== "undefined") {
    sessionStorage.setItem(SCROLL_PRICING_KEY, "1");
  }
  router.replace("/");
}

export function consumeScrollToPricingFlag(): boolean {
  if (typeof sessionStorage === "undefined") return false;
  if (sessionStorage.getItem(SCROLL_PRICING_KEY) !== "1") return false;
  sessionStorage.removeItem(SCROLL_PRICING_KEY);
  return true;
}
