import { Linking, Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  BRAND,
  FOOTER_APP_STORE,
  FOOTER_NAV_COLUMNS,
  TAGLINE,
  type FooterNavLink,
} from "@/constants/landingContent";
import { goToDemo, scrollToSection } from "@/lib/planNavigation";

type SiteFooterProps = {
  isWide: boolean;
};

function handleFooterLink(link: FooterNavLink) {
  if ("href" in link) {
    void Linking.openURL(link.href);
    return;
  }
  switch (link.action) {
    case "capabilities":
      scrollToSection("capabilities");
      break;
    case "pricing":
      scrollToSection("pricing");
      break;
    case "faq":
      scrollToSection("faq");
      break;
    case "demo":
      goToDemo();
      break;
  }
}

function StoreBadge({
  label,
  icon,
  url,
}: {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  url: string;
}) {
  return (
    <Pressable
      onPress={() => void Linking.openURL(url)}
      className="flex-row items-center gap-2 rounded-lg border border-outline-variant/60 bg-surface-container-high px-3 py-2 active:opacity-80"
    >
      <MaterialIcons name={icon} size={22} color="#f8f9fa" />
      <Text className="font-bodyMedium text-xs text-white-pure">{label}</Text>
    </Pressable>
  );
}

export function SiteFooter({ isWide }: SiteFooterProps) {
  const { appStoreUrl, playStoreUrl } = FOOTER_APP_STORE;
  const showStores = Boolean(appStoreUrl || playStoreUrl);
  const year = new Date().getFullYear();

  return (
    <View className="w-full border-t border-on-primary-fixed-variant/50 bg-[#141820] py-stack-lg">
      <View className="mx-auto w-full max-w-[1280px] gap-10 px-margin-mobile">
        <View className={isWide ? "flex-row gap-12" : "gap-10"}>
          {FOOTER_NAV_COLUMNS.map((column) => (
            <View key={column.title} className={isWide ? "min-w-[140px] flex-1 gap-3" : "gap-3"}>
              <Text className="font-bodySemi text-base text-white-pure">{column.title}</Text>
              {column.links?.map((link) => (
                <Pressable key={link.label} onPress={() => handleFooterLink(link)} className="self-start active:opacity-70">
                  <Text className="font-body text-sm text-on-primary-container/90">{link.label}</Text>
                </Pressable>
              ))}
              {column.highlights?.map((item) => (
                <Text key={item} className="font-body text-sm text-on-primary-container/75">
                  {item}
                </Text>
              ))}
            </View>
          ))}
        </View>

        <View
          className={`gap-4 border-t border-on-primary-fixed-variant/25 pt-8 ${
            isWide && showStores ? "flex-row items-center justify-between" : ""
          }`}
        >
          <Text className="font-body text-sm text-on-primary-container/80">
            © {year} {BRAND}. {TAGLINE}.
          </Text>
          {showStores ? (
            <View className={`flex-row flex-wrap gap-3 ${isWide ? "" : ""}`}>
              {appStoreUrl ? (
                <StoreBadge label="Download on the App Store" icon="apple" url={appStoreUrl} />
              ) : null}
              {playStoreUrl ? <StoreBadge label="Get it on Google Play" icon="android" url={playStoreUrl} /> : null}
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}
