// CustomInput.tsx
import { Colors } from "@/constants/Colors";
import React, { useRef, useState } from "react";
import {
  KeyboardType,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ThemedText } from "../themed/ThemedText";
import { IconSymbol } from "../ui/IconSymbol";
import CustomDatePicker from "./CustomDatePicker";

type CustomInputProps = {
  placeholder?: string;
  onChangeText?: (value: string) => void;
  style?: StyleProp<any>;
  title?: string;
  keyboardType?: KeyboardType;
  inputType?: "default" | "dropdown" | "date";
  data?: { label: string; value: string }[];
  dropdownIcon?: string;
};

const CustomInput = ({
  placeholder,
  onChangeText,
  style,
  title,
  keyboardType = "default",
  inputType = "default",
  data = [],
  dropdownIcon = "",
}: CustomInputProps) => {
  const inputRef = useRef<TextInput>(null);
  const [value, setValue] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <>
      {title && <ThemedText style={{ marginVertical: 5 }}>{title}</ThemedText>}
      {inputType === "default" ? (
        <TextInput
          ref={inputRef}
          style={[styles.input, style, { marginVertical: title ? 5 : 20 }]}
          keyboardType={keyboardType}
          placeholder={placeholder}
          onChangeText={onChangeText}
          placeholderTextColor={Colors.default.mutedText}
        />
      ) : null}

      {inputType === "dropdown" ? (
        <Dropdown
          style={[styles.input, style, { marginVertical: title ? 5 : 20 }]}
          itemContainerStyle={{ backgroundColor: Colors.default.background }}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
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
              name={dropdownIcon}
              size={20}
            />
          )}
          renderItem={(item) => (
            <View
              style={[
                styles.item,
                item.value === value ? styles.selectedItem : null,
              ]}
            >
              <ThemedText
                style={
                  item.value === value ? styles.selectedText : styles.itemText
                }
              >
                {item.label}
              </ThemedText>
            </View>
          )}
        />
      ) : null}

      {inputType === "date" ? (
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={[
            styles.input,
            style,
            styles.datePickerContainer,
            { marginVertical: title ? 5 : 20 },
          ]}
        >
          {!selectedDate && (
            <ThemedText style={styles.placeholderStyle}>
              {placeholder}
            </ThemedText>
          )}
          {selectedDate && (
            <ThemedText style={styles.selectedTextStyle}>
              {selectedDate.getDate()}/{selectedDate.getMonth() + 1}/
              {selectedDate.getFullYear()}
            </ThemedText>
          )}
          <IconSymbol style={styles.icon} name="calendar" size={20} />
          <CustomDatePicker
            visible={showDatePicker}
            onClose={() => setShowDatePicker(false)}
            onConfirm={(date) => {
              setSelectedDate(date);
              setShowDatePicker(false);
            }}
            initialDate={new Date()}
          />
        </TouchableOpacity>
      ) : null}
    </>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    fontSize: 16,
    width: "99%",
    minHeight: 50,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    color: Colors.default.text,
    borderColor: Colors.default.gray,
    backgroundColor: Colors.default.whiteText,
  },
  datePickerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    marginHorizontal: 10,
    color: Colors.default.mutedText,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.default.mutedText,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },

  item: {
    padding: 15,
    borderRadius: 10,
  },
  selectedItem: {
    backgroundColor: Colors.default.accent,
  },
  itemText: {
    color: Colors.default.text,
  },
  selectedText: {
    color: Colors.default.whiteText,
    fontWeight: "bold",
  },
});
