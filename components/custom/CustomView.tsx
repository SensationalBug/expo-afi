import { BlurView } from "expo-blur";
import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

type CustomViewProps = {
  height?: number;
  padding?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const CustomView = ({ children, style, padding }: CustomViewProps) => {
  return (
    <BlurView
      tint="light"
      intensity={20}
      style={[styles.glass, style, { padding: padding ? 10 : 0 }]}
    >
      {children}
    </BlurView>
  );
};

export default CustomView;

const styles = StyleSheet.create({
  glass: {
    borderRadius: 10,
    overflow: "hidden",
    paddingHorizontal: 10,
  },
});
