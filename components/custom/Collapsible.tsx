import { ThemedText } from "@/components/themed/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";

export function Collapsible({
  children,
  title,
  subtitle,
}: PropsWithChildren & { title: string; subtitle?: string }) {
  const theme = useColorScheme() ?? "light";
  const [isOpen, setIsOpen] = useState(true);
  const [contentHeight, setContentHeight] = useState(0);

  const animationValue = useRef(new Animated.Value(0)).current;
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  const toggleCollapsible = () => {
    setIsOpen((value) => !value);
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

  const opacity = animationValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
  });

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
    <View>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.heading}
        onPress={toggleCollapsible}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ThemedText type="title">{title}</ThemedText>
          <Animated.View
            style={{
              transform: [{ rotate: rotateInterpolate }],
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
          alignSelf="flex-end"
          style={{ paddingHorizontal: 10, paddingTop: 15 }}
        >
          {subtitle}
        </ThemedText>
      )}

      <Animated.View
        style={[
          styles.animatedContainer,
          {
            maxHeight: maxHeight,
            opacity: opacity,
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
  heading: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  animatedContainer: {
    overflow: "hidden",
  },
  content: {
    marginTop: 6,
  },
  hiddenContent: {
    zIndex: -1,
    opacity: 0,
    position: "absolute",
  },
});
