import { Colors } from "@/constants/Colors";
import React from "react";
import CustomButton from "../custom/CustomButton";

type ContinueButtonProps = {
  title: string;
  onPress?: () => void;
};

const ContinueButton = ({ title, onPress }: ContinueButtonProps) => {
  return (
    <CustomButton
      margin={0}
      height={60}
      title={title}
      textType="normalSubtitle"
      onPress={onPress}
      titleColor={Colors.default.whiteText}
    />
  );
};

export default ContinueButton;
