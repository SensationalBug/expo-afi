import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { View } from "react-native";
import CustomButton from "../custom/CustomButton";
import { ThemedText } from "../themed/ThemedText";

type YesOrNotProps = {
  title: string;
  subtitle: string;
  onPress?: () => void;
};

const YesOrNot = ({ title, subtitle, onPress }: YesOrNotProps) => {
  const [answer, setAnswer] = useState(0);

  const toggleAnwer = () => {
    if (answer) {
      setAnswer(0);
    } else {
      setAnswer(1);
    }
    onPress?.();
  };

  return (
    <View style={{ marginHorizontal: 5 }}>
      <ThemedText type="title">{title}</ThemedText>
      <ThemedText type="normalSubtitle" style={{ textAlign: "justify" }}>
        {subtitle}
      </ThemedText>
      <View
        style={{
          marginVertical: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CustomButton
          opacity={1}
          disabled={answer ? true : false}
          margin={0}
          height={60}
          width={"45%"}
          title={"Si"}
          textType="normalSubtitle"
          onPress={toggleAnwer}
          titleColor={answer ? Colors.default.whiteText : Colors.default.text}
          bgColor={
            answer ? Colors.default.buttonBackground : Colors.default.background
          }
          style={{ borderWidth: 0.5, borderColor: Colors.default.gray }}
        />
        <CustomButton
          opacity={1}
          disabled={!answer ? true : false}
          margin={0}
          height={60}
          width={"45%"}
          title={"No"}
          textType="normalSubtitle"
          onPress={toggleAnwer}
          titleColor={answer ? Colors.default.text : Colors.default.whiteText}
          bgColor={
            answer ? Colors.default.background : Colors.default.buttonBackground
          }
          style={{ borderWidth: 0.5, borderColor: Colors.default.gray }}
        />
      </View>
    </View>
  );
};

export default YesOrNot;
