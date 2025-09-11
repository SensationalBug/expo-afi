import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/Themed/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const theme = useColorScheme() ?? "light";
  const [isOpen, setIsOpen] = useState(true);
  const [contentHeight, setContentHeight] = useState(0);

  // Referencias para las animaciones
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const heightAnimation = useRef(new Animated.Value(40)).current;
  const opacityAnimation = useRef(new Animated.Value(0)).current;

  const toggleCollapsible = () => {
    setIsOpen((value) => !value);
  };

  useEffect(() => {
    if (isOpen && contentHeight > 0) {
      const targetHeight = contentHeight + 50;

      Animated.parallel([
        Animated.timing(rotateAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(heightAnimation, {
          toValue: targetHeight,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnimation, {
          toValue: 1,
          duration: 300,
          delay: 100,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(rotateAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(heightAnimation, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [
    isOpen,
    contentHeight,
    rotateAnimation,
    heightAnimation,
    opacityAnimation,
  ]);

  // Interpolaciones
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
            color={theme === "light" ? Colors.light.text : Colors.dark.text}
          />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.animatedContainer,
          {
            height: heightAnimation,
            opacity: opacityAnimation,
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
    gap: 6,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
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
