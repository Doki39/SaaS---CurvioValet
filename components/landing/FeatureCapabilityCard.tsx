import { Pressable, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type FeatureCapabilityCardProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  body: string;
  widthClass: string;
};

export function FeatureCapabilityCard({ icon, title, body, widthClass }: FeatureCapabilityCardProps) {
  return (
    <Pressable
      className={`capability-card glass-card gap-3 rounded-xl border-2 border-outline-variant/30 p-6 active:border-gold-light ${widthClass}`}
    >
      <MaterialIcons name={icon} size={28} color="#D4AF37" />
      <Text className="font-bodySemi text-base text-white-pure">{title}</Text>
      <Text className="font-body text-sm text-on-primary-container">{body}</Text>
    </Pressable>
  );
}
