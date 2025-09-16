// CustomInput.tsx
import { Colors } from "@/constants/Colors";
import React, { useRef } from "react";
import { StyleProp, StyleSheet, TextInput, TextStyle } from "react-native";

type CustomInputProps = {
  placeholder?: string;
  onChangeText?: (value: string) => void;
  scrollToTop?: () => void;
  style?: StyleProp<TextStyle>;
};

const CustomInput = ({
  placeholder,
  onChangeText,
  scrollToTop,
  style,
}: CustomInputProps) => {
  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    if (scrollToTop) {
      inputRef.current?.measureInWindow((x, y, width, height) => {
        scrollToTop();
      });
    }
  };

  return (
    <TextInput
      ref={inputRef}
      style={[styles.input, style]}
      onFocus={handleFocus}
      keyboardType="numeric"
      placeholder={placeholder}
      onChangeText={onChangeText}
      placeholderTextColor={Colors.default.mutedText}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    borderColor: Colors.default.mutedText,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    minHeight: 50,
    fontSize: 16,
    width: "95%",
    color: Colors.default.text,
  },
});
