import { ThemedText } from "@/components/themed/ThemedText";
import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";

type CarouselTitleProps = {
  title: string;
  subtitle?: string;
  icon?: IconSymbolName;
};

const iconWidth = 500;

const CarouselTitle = ({ title, subtitle, icon }: CarouselTitleProps) => {
  return (
    <View>
      <IconSymbol
        size={iconWidth}
        name={`${icon}`}
        style={styles.icon}
        color={Colors.default.icon}
      />
      <ThemedText type="title" style={{ fontSize: 50 }}>
        {title}
      </ThemedText>
      <ThemedText type="normalSubtitle" style={{ fontSize: 40 }}>
        {subtitle}
      </ThemedText>
    </View>
  );
};

export default CarouselTitle;

const styles = StyleSheet.create({
  icon: {
    top: -50,
    right: -200,
    width: iconWidth,
    position: "absolute",
  },
});
