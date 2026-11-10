import { Text, View } from "react-native";

type PlanPriceProps = {
  price: string;
  period: string;
  onDark?: boolean;
};

export function PlanPrice({ price, period, onDark = true }: PlanPriceProps) {
  return (
    <View className="mb-6 flex-row items-baseline gap-1">
      <Text className={`font-display text-4xl ${onDark ? "text-white-pure" : "text-primary"}`}>
        {price}
      </Text>
      {period ? (
        <Text className={`font-body text-sm ${onDark ? "text-on-primary-container" : "text-secondary"}`}>
          {period}
        </Text>
      ) : null}
    </View>
  );
}
