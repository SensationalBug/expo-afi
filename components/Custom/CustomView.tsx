import { BlurView } from "expo-blur";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type CustomViewProps = {
  height?: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  justifyContent?:
    | "space-between"
    | "space-evenly"
    | "center"
    | "flex-start"
    | "flex-end";
  padding?: boolean;
};

const CustomView = ({ children, style, padding }: CustomViewProps) => {
  return (
    <BlurView
      intensity={20}
      tint="light"
      style={[styles.glass, style, { padding: padding ? 10 : 0 }]}
    >
      <View style={styles.inner}>{children}</View>
    </BlurView>
  );
};

export default CustomView;

const styles = StyleSheet.create({
  section: {
    margin: 0,
    padding: 10,
    borderRadius: 10,
  },
  glass: {
    borderRadius: 10,
    overflow: "hidden",
  },
  inner: {
    paddingHorizontal: 10,
  },
});
