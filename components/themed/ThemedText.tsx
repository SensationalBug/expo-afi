import { StyleSheet, Text, type TextProps } from "react-native";

import { Colors } from "@/constants/Colors";
import { IconSymbolName } from "../ui/IconSymbol";

export type ThemedTextProps = TextProps & {
  iconName?: IconSymbolName;
  alignSelf?: "auto" | "flex-start" | "flex-end" | "center" | "stretch";
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "normalSubtitle";
};

export function ThemedText({
  style,
  type = "default",
  alignSelf,
  iconName,
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        { color: Colors.default.text, alignSelf },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "normalSubtitle" ? styles.normalSubtitle : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
  },
  defaultSemiBold: {
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  normalSubtitle: {
    fontSize: 20,
  },
});
