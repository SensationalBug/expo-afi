import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

const random = () => parseInt(Math.random() * 255);
const randomColor = () => `rgb(${random()},${random()},${random()})`;
const Dim = 180;

const Loader = () => {
  const color1 = useRef(randomColor()).current;
  const color2 = useRef(randomColor()).current;
  const color3 = useRef(randomColor()).current;
  const color4 = useRef(randomColor()).current;
  const color5 = useRef(randomColor()).current;

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [animation]);

  const angle = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["0deg", "72deg", "360deg"],
  });
  const angle0 = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["0deg", "144deg", "360deg"],
  });
  const angle1 = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["0deg", "216deg", "360deg"],
  });
  const angle2 = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["0deg", "288deg", "360deg"],
  });
  const angle3 = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["0deg", "360deg", "360deg"],
  });
  const outerAngle = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "720deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{ width: Dim, height: Dim, transform: [{ rotate: outerAngle }] }}
      >
        <Animated.View
          style={{ ...styles.item, transform: [{ rotate: angle3 }] }}
        >
          <View style={{ ...styles.innerItem, backgroundColor: color1 }} />
        </Animated.View>
        <Animated.View
          style={{ ...styles.item, transform: [{ rotate: angle2 }] }}
        >
          <View style={{ ...styles.innerItem, backgroundColor: color2 }} />
        </Animated.View>
        <Animated.View
          style={{ ...styles.item, transform: [{ rotate: angle1 }] }}
        >
          <View style={{ ...styles.innerItem, backgroundColor: color3 }} />
        </Animated.View>
        <Animated.View
          style={{ ...styles.item, transform: [{ rotate: angle0 }] }}
        >
          <View style={{ ...styles.innerItem, backgroundColor: color4 }} />
        </Animated.View>
        <Animated.View
          style={{ ...styles.item, transform: [{ rotate: angle }] }}
        >
          <View style={{ ...styles.innerItem, backgroundColor: color5 }} />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  item: {
    width: Dim,
    height: Dim,
    borderWidth: 0,
    backgroundColor: "transparent",
    position: "absolute",
    justifyContent: "center",
  },
  innerItem: {
    height: 30,
    width: 30,
    borderRadius: 10,
  },
});

export default Loader;
