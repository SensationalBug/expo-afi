import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { ThemedText } from "../themed/ThemedText";

type CustomTextProps = {
  text: string;
  fontSize?: number;
  style?: StyleProp<TextStyle>;
  alignSelf?: "flex-start" | "center" | "flex-end";
};

const CustomText = ({ text, fontSize, alignSelf, style }: CustomTextProps) => {
  return (
    <ThemedText
      alignSelf={alignSelf}
      style={[
        style,
        {
          fontSize,
          padding: 5,
          marginVertical: 5,
          textAlign: "justify",
          color: Colors.default.text,
          lineHeight: fontSize ? fontSize + 6 : 22,
        },
      ]}
    >
      {text}
    </ThemedText>
  );
};

export default CustomText;
