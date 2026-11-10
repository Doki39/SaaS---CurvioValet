import { useCallback, useState, type ReactNode } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { BRAND, REQUEST_DEMO_CTA } from "@/constants/landingContent";
import { getDemoFormAccessKey } from "@/constants/demoForm";
import { BrandMark } from "@/components/ui/BrandMark";
import { GoldButton } from "@/components/ui/GoldButton";
import { demoMailtoFallback, submitDemoRequest } from "@/lib/submitDemoRequest";
import {
  FREE_DEMO_PLAN_ID,
  goToHome,
  isDemoFormPlanId,
  planLabelForId,
  type DemoFormPlanId,
} from "@/lib/planNavigation";
import { PlanSelectField } from "@/components/demo/PlanSelectField";

type FieldKey =
  | "name"
  | "email"
  | "propertyName"
  | "phone"
  | "roomCount"
  | "parkingSpots"
  | "message";

const fieldClass =
  "rounded border border-outline-variant/50 bg-surface-container-high px-4 py-3 font-body text-base text-white-pure";

const SURFACE_DARK = "#131b2e";
const webPageStyle =
  Platform.OS === "web" ? ({ minHeight: "100%", backgroundColor: SURFACE_DARK } as const) : { backgroundColor: SURFACE_DARK };
const fieldStyle =
  Platform.OS === "web" ? { backgroundColor: "#252d4a", color: "#FFFFFF" } : { backgroundColor: "#252d4a", color: "#FFFFFF" };
const placeholderColor = "#9aa3b8";

function paramValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export function DemoRequestScreen() {
  const { plan: planParam } = useLocalSearchParams<{ plan?: string | string[] }>();
  const initialPlan = paramValue(planParam);
  const [planId, setPlanId] = useState<DemoFormPlanId>(
    isDemoFormPlanId(initialPlan) ? initialPlan : FREE_DEMO_PLAN_ID
  );
  const selectedPlanLabel = planLabelForId(planId) ?? "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [phone, setPhone] = useState("");
  const [roomCount, setRoomCount] = useState("");
  const [parkingSpots, setParkingSpots] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const configured = getDemoFormAccessKey().length > 0;

  const handleSubmit = useCallback(async () => {
    setError(null);
    if (!name.trim() || !email.trim() || !propertyName.trim()) {
      setError("Please enter your name, email, and property name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid work email.");
      return;
    }

    setSubmitting(true);
    const fields = {
      name: name.trim(),
      email: email.trim(),
      propertyName: propertyName.trim(),
      phone: phone.trim(),
      roomCount: roomCount.trim(),
      parkingSpots: parkingSpots.trim(),
      selectedPlan: selectedPlanLabel,
      message: message.trim(),
    };
    const result = await submitDemoRequest(fields);
    setSubmitting(false);

    if (result.ok) {
      setSent(true);
      return;
    }

    if (result.reason === "not_configured") {
      void Linking.openURL(demoMailtoFallback(fields));
      return;
    }

    setError(result.message ?? "Something went wrong. Please try again.");
  }, [name, email, propertyName, phone, roomCount, parkingSpots, planId, selectedPlanLabel, message]);

  const setters: Record<FieldKey, (v: string) => void> = {
    name: setName,
    email: setEmail,
    propertyName: setPropertyName,
    phone: setPhone,
    roomCount: setRoomCount,
    parkingSpots: setParkingSpots,
    message: setMessage,
  };

  const values: Record<FieldKey, string> = {
    name,
    email,
    propertyName,
    phone,
    roomCount,
    parkingSpots,
    message,
  };

  if (sent) {
    return (
      <View className="flex-1 bg-surface" style={webPageStyle}>
        <StatusBar style="light" />
        <View className="flex-1 items-center justify-center px-margin-mobile">
          <MaterialIcons name="check-circle" size={56} color="#D4AF37" />
          <Text className="mb-2 mt-6 text-center font-displaySemi text-2xl text-white-pure">
            Request received
          </Text>
          <Text className="mb-8 max-w-md text-center font-body text-base leading-6 text-on-primary-container">
            Thanks for your interest in {BRAND}. We will reach out shortly at {email}.
          </Text>
          <GoldButton label="Back to home" onPress={goToHome} className="w-full max-w-sm" />
        </View>
      </View>
    );
  }

  const rootClass = "flex-1 bg-surface";

  return (
    <KeyboardAvoidingView
      className={rootClass}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={webPageStyle}
    >
      <StatusBar style="light" />
      <ScrollView
        className="flex-1 bg-surface"
        contentContainerClassName="grow bg-surface pb-stack-lg"
        keyboardShouldPersistTaps="handled"
        style={webPageStyle}
      >
        <View className="border-b border-outline-variant/30 px-margin-mobile py-4">
          <View className="flex-row items-center justify-between gap-3">
            <Pressable
              onPress={goToHome}
              className="shrink flex-row items-center gap-1 active:opacity-70"
            >
              <MaterialIcons name="arrow-back" size={22} color="#a8b0c4" />
              <Text className="font-bodyMedium text-sm text-on-primary-container">Back</Text>
            </Pressable>
            <BrandMark align="end" size="header" onDark />
          </View>
        </View>

        <View className="mx-auto w-full max-w-lg gap-6 px-margin-mobile py-stack-lg">
          <View>
            <Text className="mb-2 font-displaySemi text-3xl text-white-pure">{REQUEST_DEMO_CTA}</Text>
            <Text className="font-body text-base leading-6 text-on-primary-container">
              Tell us about your property and we will schedule a walkthrough of {BRAND}.
            </Text>
          </View>

          {!configured ? (
            <View className="rounded border border-gold-light/50 bg-surface-container-low px-4 py-3">
              <Text className="font-body text-sm leading-5 text-on-primary-container">
                Online delivery is not configured yet; submitting will open your email client as a fallback.
                Add EXPO_PUBLIC_WEB3FORMS_ACCESS_KEY in .env to send directly to our inbox.
              </Text>
            </View>
          ) : null}

          <View className="gap-4">
            <Field label="Plan">
              <PlanSelectField
                value={planId}
                onChange={setPlanId}
                fieldClass={fieldClass}
                fieldStyle={fieldStyle}
              />
            </Field>
            <Field label="Full name" required>
              <TextInput
                value={values.name}
                onChangeText={setters.name}
                className={fieldClass}
                style={fieldStyle}
                placeholder="Jordan Smith"
                placeholderTextColor={placeholderColor}
                autoComplete="name"
              />
            </Field>
            <Field label="Work email" required>
              <TextInput
                value={values.email}
                onChangeText={setters.email}
                className={fieldClass}
                style={fieldStyle}
                placeholder="you@hotel.com"
                placeholderTextColor={placeholderColor}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </Field>
            <Field label="Hotel / property name" required>
              <TextInput
                value={values.propertyName}
                onChangeText={setters.propertyName}
                className={fieldClass}
                style={fieldStyle}
                placeholder="Grand Plaza Hotel"
                placeholderTextColor={placeholderColor}
              />
            </Field>
            <Field label="Phone">
              <TextInput
                value={values.phone}
                onChangeText={setters.phone}
                className={fieldClass}
                style={fieldStyle}
                placeholder="+385 91 234 5678"
                placeholderTextColor={placeholderColor}
                keyboardType="phone-pad"
              />
            </Field>
            <Field label="Number of rooms">
              <TextInput
                value={values.roomCount}
                onChangeText={setters.roomCount}
                className={fieldClass}
                style={fieldStyle}
                placeholder="e.g. 120"
                placeholderTextColor={placeholderColor}
                keyboardType="numeric"
              />
            </Field>
            <Field label="Parking spots">
              <TextInput
                value={values.parkingSpots}
                onChangeText={setters.parkingSpots}
                className={fieldClass}
                style={fieldStyle}
                placeholder="e.g. 45"
                placeholderTextColor={placeholderColor}
                keyboardType="numeric"
              />
            </Field>
            <Field label="Notes">
              <TextInput
                value={values.message}
                onChangeText={setters.message}
                className={`${fieldClass} min-h-[120px]`}
                style={fieldStyle}
                placeholder="PMS, valet team size, timelines..."
                placeholderTextColor={placeholderColor}
                multiline
                textAlignVertical="top"
              />
            </Field>
          </View>

          {error ? (
            <Text className="font-bodyMedium text-sm text-error">{error}</Text>
          ) : null}

          {submitting ? (
            <View className="items-center py-4">
              <ActivityIndicator color="#D4AF37" />
            </View>
          ) : (
            <GoldButton label="Send request" shimmer onPress={() => void handleSubmit()} />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <View className="gap-2">
      <Text className="font-bodySemi text-sm text-white-pure">
        {label}
        {required ? <Text className="text-error"> *</Text> : null}
      </Text>
      {children}
    </View>
  );
}
