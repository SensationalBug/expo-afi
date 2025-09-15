import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type CustomViewProps = {
  height?: number;
  padding?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const CustomView = ({ children, style, padding }: CustomViewProps) => {
  return (
    <View
      style={[
        styles.glass,
        style,
        {
          padding: padding ? 10 : 0,
          backgroundColor: Colors.default.background,
        },
      ]}
    >
      {children}
    </View>
  );
};

export default CustomView;

const styles = StyleSheet.create({
  glass: {
    borderRadius: 10,
    overflow: "hidden",
    paddingHorizontal: 5,
    marginHorizontal: 15,
    marginVertical: 5,
    elevation: 10,
    shadowColor: Colors.default.mutedText,
    boxShadow: Colors.default.boxShadow,
  },
});
