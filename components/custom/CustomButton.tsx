import { Colors } from "@/constants/Colors";
import React from "react";
import {
  DimensionValue,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { ThemedText } from "../themed/ThemedText";
import { IconSymbol } from "../ui/IconSymbol";

type CustomButtonProps = {
  title: string;
  titleColor?: string;
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
  style?: StyleProp<ViewStyle>;
  margin?: number;
  opacity?: number;
};

const CustomButton = ({
  title,
  titleColor = Colors.default.text,
  onPress,
  width,
  height,
  disabled,
  textType = "default",
  icons = false,
  bgColor,
  style,
  margin = 10,
  opacity,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        style,
        styles.button,
        {
          width,
          height,
          margin,
          opacity: opacity || (disabled ? 0.6 : 1),
          justifyContent: icons ? "space-between" : "center",
          backgroundColor: bgColor || Colors.default.buttonBackground,
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
              { backgroundColor: Colors.default.lightGray },
            ]}
          >
            <IconSymbol
              size={20}
              name="circle.unchecked"
              color={Colors.default.icon}
            />
            {/* <IconSymbol name="check" color={Colors.default.icon} /> */}
          </View>
        )}
        <ThemedText type={textType} style={{ color: titleColor }}>
          {title}
        </ThemedText>
      </View>
      {icons && (
        <IconSymbol
          size={16}
          name="chevron.right"
          color={Colors.default.icon}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    minWidth: 80,
    elevation: 5,
    minHeight: 40,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    boxShadow: Colors.default.boxShadow,
    shadowColor: Colors.default.mutedText,
  },
  leftIcon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
