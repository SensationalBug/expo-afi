import React from "react";
import { DimensionValue, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../Themed/ThemedText";

type CustomButtonProps = {
  title: string;
  onPress?: () => void;
  color?: string;
  width?: DimensionValue;
  height?: DimensionValue;
  disabled?: boolean;
};

const CustomButton = ({
  title,
  onPress,
  color,
  width,
  height,
  disabled,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.button,
        {
          width,
          height,
          opacity: disabled ? 0.6 : 1,
          backgroundColor: color || "#007AFF",
        },
      ]}
      onPress={onPress}
    >
      <ThemedText>{title}</ThemedText>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginTop: 10,
    minHeight: 50,
    minWidth: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
