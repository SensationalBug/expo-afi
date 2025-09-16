import { ThemedText } from "@/components/themed/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import React from "react";
import { View } from "react-native";

const CarouselFooter = ({ content }: { content: string[] }) => {
  return (
    <View>
      <ThemedText type="title">Posibles usos:</ThemedText>
      {content.map((uso, index) => (
        <View key={index} style={{ flexDirection: "row", paddingVertical: 10 }}>
          <IconSymbol
            name={"check"}
            size={24}
            color={Colors.default.icon}
            style={{ marginRight: 5 }}
          />
          <ThemedText style={{ width: "90%" }} type="normalSubtitle">
            {uso}
          </ThemedText>
        </View>
      ))}
    </View>
  );
};

export default CarouselFooter;
