import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

interface SlideWindowProps {
  children: ReactNode;
  onClose?: () => void;
  showButtons?: boolean;
  isModal?: boolean;
  currentPage?: number; // ✅ Control externo de página
  onPageChange?: (page: number) => void; // ✅ Callback cuando cambia la página
  enableSwipe?: boolean; // ✅ Habilitar/deshabilitar swipe
  showIndicators?: boolean; // ✅ Mostrar/ocultar indicadores
}

export default function SlideWindow({
  children,
  onClose,
  showButtons,
  isModal = false,
  currentPage: externalCurrentPage,
  onPageChange,
  enableSwipe = true, // ✅ Por defecto habilitado
  showIndicators = true, // ✅ Por defecto mostrar
}: SlideWindowProps) {
  const scrollValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);

  // ✅ Usar página externa si se proporciona, sino usar interna
  const currentPage = externalCurrentPage ?? internalCurrentPage;

  const slides = React.Children.toArray(children);
  const totalPages = slides.length;

  // ✅ Calcular ancho de cada indicador dinámicamente
  const containerWidth = width - 80;
  const indicatorSpacing = 5;
  const totalSpacing = (totalPages - 1) * indicatorSpacing;
  const indicatorWidth = (containerWidth - totalSpacing) / totalPages;

  const translateX = scrollValue.interpolate({
    inputRange: [0, width * (totalPages - 1)],
    outputRange: [0, (indicatorWidth + indicatorSpacing) * (totalPages - 1)],
    extrapolate: "clamp",
  });

  // ✅ Efecto para sincronizar página externa con scroll
  useEffect(() => {
    if (externalCurrentPage && externalCurrentPage !== internalCurrentPage) {
      setInternalCurrentPage(externalCurrentPage);
      scrollViewRef.current?.scrollTo({
        x: (externalCurrentPage - 1) * width,
        animated: true,
      });
    }
  }, [externalCurrentPage, internalCurrentPage]);

  // ✅ Función para ir a página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      changePage(newPage);
    }
  };

  // ✅ Función para ir a página siguiente
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      changePage(newPage);
    }
  };

  // ✅ Función centralizada para cambiar página
  const changePage = (newPage: number) => {
    if (!externalCurrentPage) {
      // Solo actualizar estado interno si no hay control externo
      setInternalCurrentPage(newPage);
    }
    
    scrollViewRef.current?.scrollTo({
      x: (newPage - 1) * width,
      animated: true,
    });

    // ✅ Notificar cambio al padre
    onPageChange?.(newPage);
  };

  // ✅ Ir a página específica (función pública)
  // const goToPage = (page: number) => {
  //   if (page >= 1 && page <= totalPages) {
  //     changePage(page);
  //   }
  // };

  // ✅ Actualizar página actual cuando se desliza manualmente
  const handleScroll = (event: any) => {
    if (!enableSwipe) return; // ✅ No procesar si swipe está deshabilitado

    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(contentOffsetX / width) + 1;
    
    if (!externalCurrentPage) {
      setInternalCurrentPage(page);
    }
    
    onPageChange?.(page);
  };

  const Container = isModal ? View : SafeAreaView;

  return (
    <Container style={[styles.container]}>
      {/* ✅ Indicadores condicionales */}
      {slides.length > 1 && showIndicators && (
        <View
          style={[
            styles.indicatorContainer,
            { width: containerWidth, marginTop: !isModal ? 0 : 20 },
          ]}
        >
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
        pagingEnabled={slides.length > 1 && enableSwipe} // ✅ Paginación condicional
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        scrollEnabled={slides.length > 1 && enableSwipe} // ✅ Scroll condicional
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollValue } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
      >
        {slides.map((child, index) => (
          <View style={[styles.card]} key={index}>
            {child}
          </View>
        ))}
      </ScrollView>

      {/* ✅ Botones de navegación */}
      {showButtons ? (
        <>
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={[
                styles.navButton,
                { opacity: currentPage === 1 ? 0.3 : 1 },
              ]}
              onPress={goToPreviousPage}
              disabled={currentPage === 1}
            >
              <IconSymbol
                name="chevron.left"
                size={40}
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
                size={40}
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
        </>
      ) : null}
    </Container>
  );
}

// ✅ Exportar el tipo para usar en componentes padre
export type SlideWindowRef = {
  goToPage: (page: number) => void;
  getCurrentPage: () => number;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.default.background,
  },
  card: {
    width: width,
    height: "100%",
    paddingHorizontal: 10,
  },
  indicatorContainer: {
    marginBottom: 20,
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
    borderRadius: 100,
    alignItems: "center",
    marginHorizontal: 40,
    justifyContent: "center",
    backgroundColor: Colors.default.buttonBackground,
  },
  closeButton: {
    top: 10,
    right: -10,
    borderWidth: 0,
    position: "absolute",
    marginHorizontal: 20,
    backgroundColor: "transparent",
  },
  pageIndicator: {
    alignItems: "center",
  },
});
