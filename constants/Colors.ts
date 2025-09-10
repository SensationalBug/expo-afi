/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: '#FFFFFF',
    gradient: ["#FFFFFF", "#ADD8E6"],
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    cardBackground: "#cbc8c8ff",
    border: "#E2E2E2",
    buttonBackground: tintColorLight,
    buttonText: "#FFFFFF",
    mutedText: "#9BA1A6",
  },
  dark: {
    text: "#ECEDEE",
    background: '#151718',
    gradient: ["#000000", "#00008B"],
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    cardBackground: "#2c3239ff",
    border: "#2A2C2E",
    buttonBackground: tintColorDark,
    buttonText: "#FFFFFF",
    mutedText: "#7D8286",
  },
};
