export const DEMO_NOTIFY_EMAIL = "hello@curviovalet.com";

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export function getDemoFormAccessKey(): string {
  return process.env.EXPO_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ?? "";
}

export type DemoRequestFields = {
  name: string;
  email: string;
  propertyName: string;
  phone: string;
  roomCount: string;
  parkingSpots: string;
  selectedPlan: string;
  message: string;
};
