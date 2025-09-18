import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomButton from "../custom/CustomButton";
import { ThemedText } from "../themed/ThemedText";
import { IconSymbol } from "../ui/IconSymbol";

type BiometricWindowProps = {
  title: string;
  subtitle: string;
  onPress?: () => void;
  buttonText?: string;
  icon?: string;
  photo?: string;
  uriUpdater?: (
    fieldName: "profilePhoto" | "CedFrontPhoto" | "CedBackPhoto",
    value: string
  ) => void;
  photoField?: "profilePhoto" | "CedFrontPhoto" | "CedBackPhoto";
  type?: "material" | "fontAwesome";
};

const BiometricWindow = ({
  title,
  subtitle,
  onPress,
  buttonText = "",
  icon,
  photo,
  photoField,
  uriUpdater,
  type,
}: BiometricWindowProps) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        {icon ? (
          <IconSymbol name={icon} style={styles.icon} type={type} />
        ) : photo ? (
          <View>
            <Image
              source={
                photo?.toString().split("/")[1] === "data"
                  ? { uri: `file:///${photo}` }
                  : photo
              }
              style={styles.image}
            />
            <TouchableOpacity
              onPress={() =>
                uriUpdater?.(
                  photoField as
                    | "profilePhoto"
                    | "CedFrontPhoto"
                    | "CedBackPhoto",
                  ""
                )
              }
              style={{ position: "absolute", top: 0, right: 0, margin: 10 }}
            >
              <IconSymbol name="delete" size={30} color="white" />
            </TouchableOpacity>
          </View>
        ) : null}
        <ThemedText type="title" style={styles.title}>
          {title}
        </ThemedText>
        <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          height={60}
          title={buttonText}
          textType="subtitle"
          onPress={onPress}
          titleColor={Colors.default.whiteText}
        />
      </View>
    </View>
  );
};

export default BiometricWindow;

const styles = StyleSheet.create({
  titleContainer: {
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    padding: 10,
    fontSize: 180,
    borderRadius: 100,
    color: Colors.default.icon,
    backgroundColor: Colors.default.lightGray,
  },
  image: {
    width: 300,
    height: 350,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: Colors.default.background,
  },
  title: {
    fontSize: 32,
    fontWeight: 400,
    marginVertical: 20,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: Colors.default.mutedText,
  },
  buttonContainer: {
    height: "20%",
    justifyContent: "center",
  },
});
