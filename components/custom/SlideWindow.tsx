import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import React, { ReactNode, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface SlideWindowProps {
  children: ReactNode;
  onClose?: () => void;
}

export default function SlideWindow({ children, onClose }: SlideWindowProps) {
  const scrollValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const slides = React.Children.toArray(children);
  const totalPages = slides.length;

  // ✅ Calcular ancho de cada indicador dinámicamente
  const containerWidth = width - 80; // Ancho total menos márgenes
  const indicatorSpacing = 5; // Espacio entre indicadores
  const totalSpacing = (totalPages - 1) * indicatorSpacing;
  const indicatorWidth = (containerWidth - totalSpacing) / totalPages;

  const translateX = scrollValue.interpolate({
    inputRange: [0, width * (totalPages - 1)],
    outputRange: [0, (indicatorWidth + indicatorSpacing) * (totalPages - 1)],
    extrapolate: "clamp",
  });

  // ✅ Función para ir a página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      scrollViewRef.current?.scrollTo({
        x: (newPage - 1) * width,
        animated: true,
      });
    }
  };

  // ✅ Función para ir a página siguiente
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      scrollViewRef.current?.scrollTo({
        x: (newPage - 1) * width,
        animated: true,
      });
    }
  };

  // ✅ Actualizar página actual cuando se desliza manualmente
  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(contentOffsetX / width) + 1;
    setCurrentPage(page);
  };

  return (
    <View style={[styles.container]}>
      {slides.length > 1 && (
        <View style={[styles.indicatorContainer, { width: containerWidth }]}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                {
                  width: indicatorWidth,
                  marginHorizontal: indicatorSpacing / 2,
                },
              ]}
            />
          ))}
          <Animated.View
            style={[
              styles.activeIndicator,
              {
                width: indicatorWidth,
                transform: [{ translateX }],
                marginHorizontal: indicatorSpacing / 2,
              },
            ]}
          />
        </View>
      )}

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled={slides.length > 1}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        scrollEnabled={slides.length > 1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollValue } } }],
          { useNativeDriver: false, listener: handleScroll }
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

      {/* ✅ Botones de navegación */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, { opacity: currentPage === 1 ? 0.3 : 1 }]}
          onPress={goToPreviousPage}
          disabled={currentPage === 1}
        >
          <IconSymbol
            name="chevron.left"
            size={50}
            color={Colors.default.whiteText}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navButton,
            { opacity: currentPage === totalPages ? 0.3 : 1 },
          ]}
          onPress={goToNextPage}
          disabled={currentPage === totalPages}
        >
          <IconSymbol
            size={50}
            name="chevron.right"
            color={Colors.default.whiteText}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.navButton, styles.closeButton]}
        onPress={onClose}
      >
        <IconSymbol name="close" size={25} color={Colors.default.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.default.background,
  },
  card: {
    padding: 10,
    width: width,
    height: "100%",
    paddingBottom: 80,
  },
  indicatorContainer: {
    margin: 40,
    flexDirection: "row",
    alignSelf: "center",
    position: "relative",
  },
  indicator: {
    height: 5,
    borderRadius: 5,
    backgroundColor: Colors.default.mutedText,
  },
  activeIndicator: {
    left: 0,
    height: 5,
    borderRadius: 5,
    position: "absolute",
    backgroundColor: Colors.default.buttonBackground,
  },
  navigationContainer: {
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 15,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  navButton: {
    borderWidth: 1,
    borderRadius: 100,
    alignItems: "center",
    marginHorizontal: 40,
    justifyContent: "center",
    borderColor: Colors.default.mutedText,
    backgroundColor: Colors.default.buttonBackground,
  },
  closeButton: {
    top: 10,
    right: -10,
    borderWidth: 0,
    position: "absolute",
    marginHorizontal: 20,
    backgroundColor: "none",
  },
  pageIndicator: {
    alignItems: "center",
  },
});
