import { Colors } from "@/constants/Colors";
import React from "react";
import {
  DimensionValue,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "../themed/ThemedText";
import { IconSymbol } from "../ui/IconSymbol";

type CustomButtonProps = {
  title: string;
  onPress?: () => void;
  width?: DimensionValue;
  height?: DimensionValue;
  disabled?: boolean;
  textType?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "normalSubtitle";
  icons?: boolean;
  bgColor?: string;
};

const CustomButton = ({
  title,
  onPress,
  width,
  height,
  disabled,
  textType = "default",
  icons = false,
  bgColor,
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
          backgroundColor: bgColor || Colors.default.buttonBackground,
          justifyContent: icons ? "space-between" : "center",
        },
      ]}
      onPress={onPress}
    >
      <View
        style={{
          gap: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {icons && (
          <View
            style={[
              styles.leftIcon,
              { backgroundColor: Colors.default.mutedText },
            ]}
          >
            <IconSymbol
              size={20}
              name="circle.unchecked"
              color={Colors.default.icon}
            />
          </View>
        )}
        {/* <IconSymbol name="check" color={"red"} /> */}
        <ThemedText type={textType}>{title}</ThemedText>
      </View>
      {icons && (
        <IconSymbol size={16} name="chevron.right" color={"#ffffffb2"} />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    gap: 10,
    padding: 10,
    marginTop: 10,
    minHeight: 50,
    minWidth: 100,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  leftIcon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d6d6d663",
  },
});
