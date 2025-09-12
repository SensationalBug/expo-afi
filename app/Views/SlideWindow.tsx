import React, { ReactNode, useRef } from "react";
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

interface SlideWindowProps {
  children: ReactNode;
}

export default function SlideWindow({ children }: SlideWindowProps) {
  const scrollValue = useRef(new Animated.Value(0)).current;
  const slides = React.Children.toArray(children);

  const translateX = scrollValue.interpolate({
    inputRange: [0, width],
    outputRange: [0, 60],
  });

  const inputRange = [0];
  const scaleOutputRange = [1];

  if (slides.length > 1) {
    slides.forEach(
      (_, i) =>
        i !== 0 && inputRange.push(...[(width * (2 * i - 1)) / 2, width * i])
    );
    slides.forEach((_, i) => i !== 0 && scaleOutputRange.push(...[0, 1]));
  } else {
    inputRange.push(width);
    scaleOutputRange.push(1);
  }

  const scaleX = scrollValue.interpolate({
    inputRange,
    outputRange: scaleOutputRange,
  });

  return (
    <View style={[styles.container, { backgroundColor: "black" }]}>
      {slides.length > 1 && (
        <View style={styles.indicatorConatiner} pointerEvents="none">
          {slides.map((_, index) => (
            <Indicator key={index} />
          ))}
          <Animated.View
            style={[
              styles.activeIndicator,
              {
                position: "absolute",
                transform: [{ translateX }, { scaleX }],
              },
            ]}
          />
        </View>
      )}
      <ScrollView
        horizontal
        pagingEnabled={slides.length > 1}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        scrollEnabled={slides.length > 1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollValue } } }],
          { useNativeDriver: false }
        )}
      >
        {slides.map((child, index) => (
          <View
            style={[styles.card, { backgroundColor: "transparent" }]}
            key={index}
          >
            {child}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function Indicator() {
  return <View style={styles.indicator} />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 10,
    width: width,
    height: "100%",
  },
  indicatorConatiner: {
    margin: 20,
    flexDirection: "row",
    alignSelf: "center",
  },
  indicator: {
    height: 5,
    width: 50,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "#79797973",
  },
  activeIndicator: {
    height: 5,
    width: 50,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "#007AFF",
  },
});
