import { Text, View } from "react-native";

type PlanPriceProps = {
  price: string;
  period?: string;
  dark?: boolean;
};

export function PlanPrice({ price, period, dark }: PlanPriceProps) {
  const amountClass = dark ? "text-white-pure" : "text-primary";
  const periodClass = dark ? "text-on-primary-container" : "text-secondary";
  const isEuro = price.startsWith("\u20ac");
  const amount = isEuro ? price.slice(1) : price;

  return (
    <View className="mb-6 flex-row items-baseline gap-1">
      {isEuro ? (
        <View className="flex-row items-baseline gap-0.5">
          <Text className={`font-bodySemi text-lg leading-none ${amountClass}`}>{"\u20ac"}</Text>
          <Text className={`font-display text-3xl leading-none tabular-nums ${amountClass}`}>
            {amount}
          </Text>
        </View>
      ) : (
        <Text className={`font-display text-3xl ${amountClass}`}>{amount}</Text>
      )}
      {period ? <Text className={`font-body text-sm ${periodClass}`}>{period}</Text> : null}
    </View>
  );
}
