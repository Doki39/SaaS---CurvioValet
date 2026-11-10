import {
  DEMO_NOTIFY_EMAIL,
  getDemoFormAccessKey,
  WEB3FORMS_ENDPOINT,
  type DemoRequestFields,
} from "@/constants/demoForm";
import { BRAND } from "@/constants/landingContent";

export type DemoSubmitResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "network" | "rejected"; message?: string };

export async function submitDemoRequest(
  fields: DemoRequestFields
): Promise<DemoSubmitResult> {
  const accessKey = getDemoFormAccessKey();
  if (!accessKey) {
    return { ok: false, reason: "not_configured" };
  }

  const body = {
    access_key: accessKey,
    subject: `${BRAND} demo request — ${fields.propertyName}`,
    from_name: fields.name,
    email: fields.email,
    name: fields.name,
    property_name: fields.propertyName,
    phone: fields.phone || "—",
    room_count: fields.roomCount || "—",
    parking_spots: fields.parkingSpots || "—",
    selected_plan: fields.selectedPlan || "—",
    message: fields.message || "—",
    botcheck: false,
  };

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = (await res.json()) as { success?: boolean; message?: string };
    if (!res.ok || !data.success) {
      return {
        ok: false,
        reason: "rejected",
        message: data.message ?? "Unable to send request.",
      };
    }
    return { ok: true };
  } catch {
    return { ok: false, reason: "network" };
  }
}

export function demoMailtoFallback(fields: Partial<DemoRequestFields>): string {
  const lines = [
    `Name: ${fields.name ?? ""}`,
    `Email: ${fields.email ?? ""}`,
    `Property: ${fields.propertyName ?? ""}`,
    `Phone: ${fields.phone ?? ""}`,
    `Rooms: ${fields.roomCount ?? ""}`,
    `Parking spots: ${fields.parkingSpots ?? ""}`,
    `Selected plan: ${fields.selectedPlan ?? ""}`,
    "",
    fields.message ?? "",
  ];
  const params = new URLSearchParams({
    subject: `${BRAND} demo request`,
    body: lines.join("\n"),
  });
  return `mailto:${DEMO_NOTIFY_EMAIL}?${params.toString()}`;
}
