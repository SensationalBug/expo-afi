import { Colors } from "@/constants/Colors";
import React, { ReactNode } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { ThemedText } from "../themed/ThemedText";
import { IconSymbol, IconSymbolName } from "../ui/IconSymbol";
import CustomView from "./CustomView";

const { width } = Dimensions.get("screen");

const parentPadding = 20;
const availableWidth = width - parentPadding * 2;
const itemWidth = availableWidth * 0.8;
const spacing = (availableWidth - itemWidth) / 2;

type CarouselProps<T> = {
  data: T[];
  children?: ReactNode;
};

export default function Carousel<T>({ data, children }: CarouselProps<T>) {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.x;
  });

  return (
    <View style={styles.flex}>
      <Animated.FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }: any) => (
          <Item
            index={index}
            icon={item.icon}
            scrollY={scrollY}
            title={item.title}
            subtitle={item.subtitle}
          >
            {children}
          </Item>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[{ paddingHorizontal: spacing }]}
        snapToInterval={itemWidth}
        onScroll={scrollHandler}
        decelerationRate="fast"
      />
    </View>
  );
}

function Item({
  index,
  scrollY,
  title,
  subtitle,
  icon,
  children,
}: {
  index: number;
  scrollY: SharedValue<number>;
  title: string;
  subtitle: string;
  icon: IconSymbolName;
  children: ReactNode;
}) {
  const theme = useColorScheme() ?? "light";
  const itemScaleStyle = useAnimatedStyle(() => {
    const input = [
      (index - 1) * itemWidth,
      index * itemWidth,
      (index + 1) * itemWidth,
    ];
    const output = [0.8, 1, 0.8];
    const clamp = {
      extrapolateLeft: "clamp" as const,
      extrapolateRight: "clamp" as const,
    };
    return {
      transform: [{ scale: interpolate(scrollY.value, input, output, clamp) }],
    };
  });

  return (
    <Animated.View style={[styles.item, itemScaleStyle]}>
      <CustomView style={styles.item}>
        <View
          style={{ flexDirection: "row", alignItems: "flex-end", padding: 10 }}
        >
          <Text
            style={[
              styles.itemTitle,
              {
                color: Colors.default.text,
              },
            ]}
          >
            {title}
          </Text>
          <IconSymbol
            size={100}
            name={icon}
            color={"white"}
            style={{ width: "40%" }}
          />
        </View>
        <View style={{ padding: 10 }}>
          <ThemedText type="normalSubtitle" style={{ textAlign: "justify" }}>
            {subtitle}
          </ThemedText>
        </View>
        {children}
      </CustomView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  item: {
    width: itemWidth,
    borderRadius: 10,
    height:itemWidth,
    justifyContent: "space-between",
  },
  itemTitle: {
    width: "60%",
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
  },
});
