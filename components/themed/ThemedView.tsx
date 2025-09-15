import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Platform, StatusBar, View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  safeTop?: boolean;
  useGradient?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  safeTop = true,
  useGradient = false,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = Colors.default.background;

  const paddingTop = safeTop
    ? Platform.OS === "android"
      ? StatusBar.currentHeight || 0
      : 0
    : 0;

  if (Platform.OS === "android") {
    StatusBar.setBarStyle("dark-content", true); // Texto oscuro para fondo claro
    StatusBar.setBackgroundColor("transparent", true); // Fondo de la barra
    StatusBar.setTranslucent(false); // No translúcida
  }

  if (useGradient) {
    return (
      <>
        {Platform.OS === "ios" && (
          <StatusBar
            barStyle="dark-content"
            backgroundColor={Colors.default.background}
          />
        )}
        <LinearGradient
          colors={Colors.default.gradient as any}
          style={[{ flex: 1, paddingTop }, style]}
          {...otherProps}
        />
      </>
    );
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={"red"}
        translucent={false}
      />
      <View
        style={[{ flex: 1, backgroundColor, paddingTop }, style]}
        {...otherProps}
      />
    </>
  );
}
