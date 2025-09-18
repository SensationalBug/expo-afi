// CustomInput.tsx
import { Colors } from "@/constants/Colors";
import React, { useRef, useState } from "react";
import {
  KeyboardType,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ThemedText } from "../themed/ThemedText";
import { IconSymbol } from "../ui/IconSymbol";

type CustomInputProps = {
  placeholder?: string;
  onChangeText?: (value: string) => void;
  style?: StyleProp<TextStyle>;
  title?: string;
  keyboardType?: KeyboardType;
  inputType?: "default" | "dropdown";
  data?: { label: string; value: string }[];
};

const CustomInput = ({
  placeholder,
  onChangeText,
  style,
  title,
  keyboardType = "default",
  inputType = "default",
  data = [],
}: CustomInputProps) => {
  const inputRef = useRef<TextInput>(null);
  const [value, setValue] = useState(null);

  return (
    <>
      {title && <ThemedText style={{ marginVertical: 10 }}>{title}</ThemedText>}
      {inputType === "default" ? (
        <TextInput
          ref={inputRef}
          style={[styles.input, style]}
          keyboardType={keyboardType}
          placeholder={placeholder}
          onChangeText={onChangeText}
          placeholderTextColor={Colors.default.mutedText}
        />
      ) : (
        <Dropdown
          style={styles.input}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Selecciona una opcion"
          value={value}
          onChange={(item) => {
            setValue(item.value);
          }}
          renderLeftIcon={() => (
            <IconSymbol
              style={styles.icon}
              type="fontAwesome"
              name="address-card"
              size={20}
            />
          )}
        />
      )}
    </>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    fontSize: 16,
    width: "100%",
    minHeight: 50,
    borderWidth: 1,
    borderRadius: 10,
    color: Colors.default.text,
    borderColor: Colors.default.mutedText,
  },
  icon: {
    marginHorizontal: 10,
    color: Colors.default.text,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
