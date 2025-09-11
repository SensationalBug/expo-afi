import {
  PropsWithChildren,
  ReactElement,
  forwardRef,
  useImperativeHandle,
} from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/Themed/ThemedView";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";

const HEADER_HEIGHT = 140;

type Props = PropsWithChildren<{
  header: ReactElement;
  headerBackgroundColor?: { dark: string; light: string };
}>;

const ParallaxScrollView = forwardRef<Animated.ScrollView, Props>(
  ({ children, header, headerBackgroundColor = "red" as any }, ref) => {
    const colorScheme = useColorScheme() ?? "light";
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);
    const bottom = useBottomTabOverflow();

    // Exponer métodos del scroll interno
    useImperativeHandle(
      ref,
      () =>
        ({
          scrollTo: (options: {
            x?: number;
            y?: number;
            animated?: boolean;
          }) => {
            scrollRef.current?.scrollTo(options);
          },
          scrollToEnd: (options?: { animated?: boolean }) => {
            scrollRef.current?.scrollToEnd(options);
          },
          getScrollResponder: () => scrollRef.current?.getScrollResponder?.(),
        } as any)
    );

    const headerAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: interpolate(
              scrollOffset.value,
              [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
              [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * -0.75]
            ),
          },
          {
            scale: interpolate(
              scrollOffset.value,
              [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
              [2, 1, 1]
            ),
          },
        ],
      };
    });

    return (
      <ThemedView style={styles.container}>
        <Animated.ScrollView
          ref={scrollRef}
          scrollEventThrottle={16}
          scrollIndicatorInsets={{ bottom }}
          contentContainerStyle={{ paddingBottom: bottom }}
        >
          <Animated.View
            style={[
              styles.header,
              { backgroundColor: headerBackgroundColor[colorScheme] },
              headerAnimatedStyle,
            ]}
          >
            {header}
          </Animated.View>
          <ThemedView style={styles.content}>{children}</ThemedView>
        </Animated.ScrollView>
      </ThemedView>
    );
  }
);

// Agregar displayName para mejor debugging
ParallaxScrollView.displayName = "ParallaxScrollView";

export default ParallaxScrollView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  header: {
    overflow: "hidden",
    height: HEADER_HEIGHT,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    gap: 16,
    padding: 20,
    overflow: "hidden",
  },
});
