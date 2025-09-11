// CustomInput.tsx
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
      keyboardType="numeric"
      placeholder={placeholder}
      onChangeText={onChangeText}
      placeholderTextColor="gray"
      onFocus={handleFocus}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    minHeight: 50,
    fontSize: 16,
    width: "95%",
    color: "white",
  },
});
