import "../global.css";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display";
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [loaded] = useFonts({
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!loaded) {
    return (
      <View className="flex-1 items-center justify-center bg-primary-container">
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#131b2e" } }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="demo" />
    </Stack>
  );
}
