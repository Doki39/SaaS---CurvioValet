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
    <View className="rounded-lg border border-outline-variant/30 bg-white-pure p-4">
      <Pressable onPress={() => setOpen((v) => !v)} className="flex-row items-center justify-between">
        <Text className="flex-1 pr-2 font-bodySemi text-base text-primary">{question}</Text>
        <MaterialIcons
          name={open ? "expand-less" : "expand-more"}
          size={24}
          color="#545f73"
        />
      </Pressable>
      {open ? <Text className="mt-4 font-body text-sm leading-5 text-secondary">{answer}</Text> : null}
    </View>
  );
}
