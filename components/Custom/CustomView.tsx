import React from "react";
import { StyleSheet, } from "react-native";
import { ThemedView } from "../Themed/ThemedView";

type CustomViewProps = {
  height: number;
  children: React.ReactNode;
};

const CustomView = ({ height = 100, children }: CustomViewProps) => {
  return (
    <ThemedView style={[styles.section, { height }]}>{children}</ThemedView>
  );
};

export default CustomView;

const styles = StyleSheet.create({
  section: {
    padding: 15,
    width: "100%",
    display: "flex",
    borderRadius: 10,
    backgroundColor: "#1D3D47",
    justifyContent: "space-between",
  },
});
