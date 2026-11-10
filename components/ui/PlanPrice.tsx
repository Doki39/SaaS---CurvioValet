import { Text, View } from "react-native";

type PlanPriceProps = {
  price: string;
  period: string;
};

export function PlanPrice({ price, period }: PlanPriceProps) {
  return (
    <View className="mb-6 flex-row items-baseline gap-1">
      <Text className="font-display text-4xl text-white-pure">{price}</Text>
      {period ? (
        <Text className="font-body text-sm text-on-primary-container">{period}</Text>
      ) : null}
    </View>
  );
}
