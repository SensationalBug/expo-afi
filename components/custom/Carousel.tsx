import CarouselDescription from "@/app/(views)/carousel/CarouselDescription";
import CarouselFooter from "@/app/(views)/carousel/CarouselFooter";
import CarouselTitle from "@/app/(views)/carousel/CarouselTitle";
import { Colors } from "@/constants/Colors";
import React from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
import SlideWindow from "./SlideWindow";

const { width } = Dimensions.get("screen");

const itemWidth = width * 0.8;
const spacing = (width - itemWidth) / 2 - 12;
const endSpacing = spacing + 24;

type CarouselProps<T> = {
  data: T[];
};

export default function Carousel<T>({ data }: CarouselProps<T>) {
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
            description={item.descripcion}
            posiblesUsos={item.posiblesUsos}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          { paddingLeft: spacing, paddingRight: endSpacing },
        ]}
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
  description,
  posiblesUsos,
}: {
  index: number;
  scrollY: SharedValue<number>;
  title: string;
  subtitle: string;
  icon: IconSymbolName;
  description: string;
  posiblesUsos: string[];
}) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const itemScaleStyle = useAnimatedStyle(() => {
    const input = [
      (index - 1) * itemWidth,
      index * itemWidth,
      (index + 1) * itemWidth,
    ];
    const output = [0.9, 1, 0.9];
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
            color={Colors.default.icon}
            style={{ width: "40%" }}
          />
        </View>
        <View style={{ padding: 10 }}>
          <ThemedText type="normalSubtitle" style={{ textAlign: "justify" }}>
            {subtitle}
          </ThemedText>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <ThemedText style={{ padding: 10 }} alignSelf="flex-end">
            Ver mas {">"}
          </ThemedText>
        </TouchableOpacity>
      </CustomView>
      <Modal
        transparent
        visible={modalVisible}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setModalVisible(false)}
        style={{ backgroundColor: "red" }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.topArea} />
        </TouchableWithoutFeedback>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <SlideWindow isModal onClose={() => setModalVisible(false)} showButtons>
              <CarouselTitle title={title} subtitle={subtitle} icon={icon} />
              <CarouselDescription content={description} />
              <CarouselFooter content={posiblesUsos}/>
            </SlideWindow>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  topArea: {
    height: "30%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    height: "100%",
  },
  flex: {
    flex: 1,
  },
  item: {
    width: itemWidth,
    borderRadius: 10,
    height: itemWidth,
    marginBottom: 30,
    justifyContent: "space-between",
  },
  itemTitle: {
    width: "60%",
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
  },
});
