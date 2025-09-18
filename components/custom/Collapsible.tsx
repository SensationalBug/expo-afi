import { ThemedText } from "@/components/themed/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

export function Collapsible({
  children,
  title,
  subtitle,
  type = "title",
  style,
  isOpen,
  onToggle,
  alignSelf = "flex-end",
}: PropsWithChildren & {
  title: string;
  subtitle?: string;
  type?: "title" | "default" | "subtitle" | "normalSubtitle";
  style?: StyleProp<ViewStyle>;
  isOpen: boolean;
  alignSelf?: "flex-start" | "center" | "flex-end";
  onToggle?: () => void;
}) {
  // const [isOpen, setIsOpen] = useState(true);
  const [contentHeight, setContentHeight] = useState(0);

  const animationValue = useRef(new Animated.Value(0)).current;
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  const toggleCollapsible = () => {
    if (onToggle) {
      onToggle();
    }
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(rotateAnimation, {
        toValue: isOpen ? 1 : 0,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(animationValue, {
        toValue: isOpen ? 1 : 0,
        duration: 350,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isOpen, animationValue, rotateAnimation]);

  const maxHeight = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight + 50],
    extrapolate: "clamp",
  });

  // const opacity = animationValue.interpolate({
  //   inputRange: [0, 0.5, 1],
  //   outputRange: [0, 0.5, 1],
  // });

  const rotateInterpolate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  const onContentLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    if (height > 0 && contentHeight !== height) {
      setContentHeight(height);
    }
  };

  return (
    <View style={[{ margin: 4 }, style]}>
      <TouchableOpacity activeOpacity={0.5} onPress={toggleCollapsible}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ThemedText
            type={type}
            style={{
              width: "90%",
            }}
          >
            {title}
          </ThemedText>
          <Animated.View
            style={{
              transform: [{ rotate: rotateInterpolate }],
              width: "10%",
            }}
          >
            <IconSymbol
              size={30}
              weight="medium"
              name="chevron.right"
              color={Colors.default.icon}
            />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {subtitle && (
        <ThemedText
          alignSelf={alignSelf}
          style={{
            width: "100%",
            paddingTop: 15,
          }}
        >
          {subtitle}
        </ThemedText>
      )}

      <Animated.View
        style={[
          styles.animatedContainer,
          {
            maxHeight: maxHeight,
            // opacity: opacity,
            paddingVertical: isOpen ? 5 : 0,
          },
        ]}
      >
        <View style={styles.content} onLayout={onContentLayout}>
          {children}
        </View>
      </Animated.View>

      {contentHeight === 0 && (
        <View
          style={[styles.content, styles.hiddenContent]}
          onLayout={onContentLayout}
        >
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    overflow: "hidden",
  },
  content: {
    marginTop: 6,
    overflow: "hidden",
  },
  hiddenContent: {
    zIndex: -1,
    opacity: 0,
    position: "absolute",
  },
});
