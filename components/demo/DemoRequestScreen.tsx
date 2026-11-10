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
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { BRAND, REQUEST_DEMO_CTA } from "@/constants/landingContent";
import { getDemoFormAccessKey } from "@/constants/demoForm";
import { BrandMark } from "@/components/ui/BrandMark";
import { GoldButton } from "@/components/ui/GoldButton";
import { demoMailtoFallback, submitDemoRequest } from "@/lib/submitDemoRequest";
import { goToPlans, planLabelForId } from "@/lib/planNavigation";

type FieldKey =
  | "name"
  | "email"
  | "propertyName"
  | "phone"
  | "roomCount"
  | "parkingSpots"
  | "message";

const fieldClass =
  "rounded border border-outline-variant/50 bg-white-pure px-4 py-3 font-body text-base text-primary";

const pageSurfaceStyle = { backgroundColor: "#f8f9fa" as const };
const webPageStyle = Platform.OS === "web" ? { ...pageSurfaceStyle, minHeight: "100%" as const } : pageSurfaceStyle;
const fieldStyle =
  Platform.OS === "web" ? { backgroundColor: "#FFFFFF", color: "#000000" } : undefined;

function paramValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export function DemoRequestScreen() {
  const { plan: planParam } = useLocalSearchParams<{ plan?: string | string[] }>();
  const selectedPlanLabel = planLabelForId(paramValue(planParam)) ?? "";

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
  }, [name, email, propertyName, phone, roomCount, parkingSpots, selectedPlanLabel, message]);

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
        <StatusBar style="dark" />
        <View className="flex-1 items-center justify-center px-margin-mobile">
          <MaterialIcons name="check-circle" size={56} color="#D4AF37" />
          <Text className="mb-2 mt-6 text-center font-displaySemi text-2xl text-primary">
            Request received
          </Text>
          <Text className="mb-8 max-w-md text-center font-body text-base leading-6 text-secondary">
            Thanks for your interest in {BRAND}. We will reach out shortly at {email}.
          </Text>
          <GoldButton label="Back to home" onPress={() => router.replace("/")} className="w-full max-w-sm" />
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
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1 bg-surface"
        contentContainerClassName="grow bg-surface pb-stack-lg"
        keyboardShouldPersistTaps="handled"
        style={webPageStyle}
      >
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

        <View className="mx-auto w-full max-w-lg gap-6 px-margin-mobile py-stack-lg">
          <View>
            <Text className="mb-2 font-displaySemi text-3xl text-primary">{REQUEST_DEMO_CTA}</Text>
            <Text className="font-body text-base leading-6 text-secondary">
              Tell us about your property and we will schedule a walkthrough of {BRAND}.
            </Text>
          </View>

          <View className="flex-row flex-wrap items-center justify-between gap-2 rounded border border-outline-variant/50 bg-surface-container-low px-4 py-3">
            <Text className="font-body text-sm text-secondary">
              {selectedPlanLabel ? (
                <>
                  Selected plan:{" "}
                  <Text className="font-bodySemi text-primary">{selectedPlanLabel}</Text>
                </>
              ) : (
                "No plan selected yet."
              )}
            </Text>
            <Pressable onPress={goToPlans} className="active:opacity-70">
              <Text className="font-bodyMedium text-sm text-gold-light underline">
                {selectedPlanLabel ? "Change plan" : "Browse plans"}
              </Text>
            </Pressable>
          </View>

          {!configured ? (
            <View className="rounded border border-gold-light/50 bg-surface-container-low px-4 py-3">
              <Text className="font-body text-sm leading-5 text-secondary">
                Online delivery is not configured yet; submitting will open your email client as a fallback.
                Add EXPO_PUBLIC_WEB3FORMS_ACCESS_KEY in .env to send directly to our inbox.
              </Text>
            </View>
          ) : null}

          <View className="gap-4">
            <Field label="Full name" required>
              <TextInput
                value={values.name}
                onChangeText={setters.name}
                className={fieldClass}
                style={fieldStyle}
                placeholder="Jordan Smith"
                placeholderTextColor="#7c839b"
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
                placeholderTextColor="#7c839b"
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
                placeholderTextColor="#7c839b"
              />
            </Field>
            <Field label="Phone">
              <TextInput
                value={values.phone}
                onChangeText={setters.phone}
                className={fieldClass}
                style={fieldStyle}
                placeholder="+385 91 234 5678"
                placeholderTextColor="#7c839b"
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
                placeholderTextColor="#7c839b"
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
                placeholderTextColor="#7c839b"
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
                placeholderTextColor="#7c839b"
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
              <ActivityIndicator color="#131b2e" />
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
      <Text className="font-bodySemi text-sm text-primary">
        {label}
        {required ? <Text className="text-error"> *</Text> : null}
      </Text>
      {children}
    </View>
  );
}
