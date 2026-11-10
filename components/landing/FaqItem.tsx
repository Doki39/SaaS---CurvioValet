import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type FaqItemProps = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export function FaqItem({ question, answer, defaultOpen = false }: FaqItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <View className="rounded-lg border border-outline-variant/50 bg-surface-container p-4">
      <Pressable onPress={() => setOpen((v) => !v)} className="flex-row items-center justify-between">
        <Text className="flex-1 pr-2 font-bodySemi text-base text-white-pure">{question}</Text>
        <MaterialIcons
          name={open ? "expand-less" : "expand-more"}
          size={24}
          color="#9aa3b8"
        />
      </Pressable>
      {open ? <Text className="mt-4 font-body text-sm leading-5 text-on-primary-container">{answer}</Text> : null}
    </View>
  );
}
