import { StyleSheet, Text, View, type TextProps } from "react-native";

import { Colors } from "@/constants/Colors";
import { IconSymbol, IconSymbolName } from "../ui/IconSymbol";

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
    <View style={[styles.container, { alignSelf }]}>
      <Text
        style={[
          { color: Colors.default.text },
          type === "default" ? styles.default : undefined,
          type === "title" ? styles.title : undefined,
          type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
          type === "subtitle" ? styles.subtitle : undefined,
          type === "normalSubtitle" ? styles.normalSubtitle : undefined,
          style,
        ]}
        {...rest}
      />
      {iconName ? (
        <IconSymbol size={16} name={iconName} color={Colors.default.text} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
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
