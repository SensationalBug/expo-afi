// CustomInput.tsx
import { Colors } from "@/constants/Colors";
import React, { useRef } from "react";
import { StyleSheet, TextInput } from "react-native";

type CustomInputProps = {
  placeholder?: string;
  onChangeText?: (value: string) => void;
  scrollToTop?: () => void;
};

const CustomInput = ({
  placeholder,
  onChangeText,
  scrollToTop,
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
      style={styles.input}
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
