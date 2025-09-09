import { StyleSheet, Text, View, type TextProps } from "react-native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconSymbol, IconSymbolName } from "../ui/IconSymbol";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  iconName?: IconSymbolName;
  alignSelf?: "auto" | "flex-start" | "flex-end" | "center" | "stretch";
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  alignSelf,
  iconName,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const theme = useColorScheme() ?? "light";

  return (
    <View style={[styles.container, { alignSelf }]}>
      <Text
        style={[
          { color },
          type === "default" ? styles.default : undefined,
          type === "title" ? styles.title : undefined,
          type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
          type === "subtitle" ? styles.subtitle : undefined,
          style,
        ]}
        {...rest}
      />
      {iconName ? (
        <IconSymbol
          size={16}
          name={iconName}
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    lineHeight: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "bold",
  },
});
