import { ThemedText } from "@/components/themed/ThemedText";
import React from "react";
import { View } from "react-native";

const CarouselDescription = ({ content }: { content: string }) => {
  return (
    <View>
      <ThemedText type="title">Que es?</ThemedText>

      <ThemedText type="normalSubtitle" style={{ fontSize: 25 }}>
        {content}
      </ThemedText>
    </View>
  );
};

export default CarouselDescription;
