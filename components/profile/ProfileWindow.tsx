import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import CustomButton from "../custom/CustomButton";
import { ThemedText } from "../themed/ThemedText";
import { IconSymbol } from "../ui/IconSymbol";

type ProfileWindowProps = {
  title: string;
  subtitle: string;
  onPress?: () => void;
  buttonText?: string;
  icon?: string;
  photo?: string;
};

const ProfileWindow = ({
  title,
  subtitle,
  onPress,
  buttonText = "",
  icon,
  photo,
}: ProfileWindowProps) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        {icon ? (
          <IconSymbol name={icon} style={styles.icon} />
        ) : photo ? (
          <Image source={{ uri: `file://${photo}` }} style={styles.image} />
        ) : (
          <Image source={require('@/assets/images/person.png')} style={styles.image} />
        )}
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

export default ProfileWindow;

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
    borderRadius: 40,
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
