import React, { useCallback, useRef, useState } from "react";
import {
    Animated,
    GestureResponderEvent,
    PanResponder,
    PanResponderGestureState,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { ThemedText } from "../themed/ThemedText";

interface SliderProps {
  onValueChange?: (days: number) => void;
  initialValue?: number;
  width?: number;
}

const Slider: React.FC<SliderProps> = ({
  onValueChange,
  initialValue = 30,
  width = 280,
}) => {
  // Valores fijos de días
  const dayValues = [30, 60, 90, 180, 360];
  const dayLabels = ["30d", "60d", "90d", "180d", "360d"];

  const [selectedDays, setSelectedDays] = useState<number>(initialValue);
  const [selectedIndex, setSelectedIndex] = useState<number>(
    dayValues.indexOf(initialValue) >= 0 ? dayValues.indexOf(initialValue) : 0
  );

  const thumbSize = 26;
  const trackHeight = 6;
  const dotSize = 14;

  // Área deslizable (ancho del track menos el thumb)
  const sliderRange = width - thumbSize;

  // Color único para todos los elementos
  const primaryColor = "#007AFF";
  const inactiveColor = "#E5E5E7";

  // Animated values
  const pan = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  
  // ✅ Mantener valores actuales sin usar _value
  const currentPanValue = useRef(0);
  const panOffset = useRef(0);

  // ✅ Listener para actualizar el valor actual
  React.useEffect(() => {
    const listener = pan.addListener(({ value }) => {
      currentPanValue.current = value;
    });

    return () => pan.removeListener(listener);
  }, [pan]);

  // Calcular posición de cada punto en el track
  const getPointPosition = useCallback(
    (index: number): number => {
      return (index / (dayValues.length - 1)) * sliderRange;
    },
    [sliderRange, dayValues.length]
  );

  // Encontrar el índice más cercano basado en la posición del thumb
  const findClosestIndex = (position: number): number => {
    let closestIndex = 0;
    let minDistance = Math.abs(position - getPointPosition(0));

    for (let i = 1; i < dayValues.length; i++) {
      const pointPosition = getPointPosition(i);
      const distance = Math.abs(position - pointPosition);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    return closestIndex;
  };

  // Inicializar posición del thumb
  React.useEffect(() => {
    const initialPosition = getPointPosition(selectedIndex);
    pan.setValue(initialPosition);
    currentPanValue.current = initialPosition;
  }, [getPointPosition, pan, selectedIndex]);

  // PanResponder para manejar el deslizado
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        // ✅ Usar valores de referencia en lugar de _value y _offset
        panOffset.current = currentPanValue.current;
        pan.setOffset(panOffset.current);
        pan.setValue(0);

        // Animar escala del thumb
        Animated.spring(scale, {
          toValue: 1.2,
          useNativeDriver: false,
          tension: 300,
          friction: 8,
        }).start();
      },

      onPanResponderMove: (
        event: GestureResponderEvent,
        gesture: PanResponderGestureState
      ) => {
        // ✅ Usar panOffset.current en lugar de pan._offset
        const newPosition = Math.max(
          -panOffset.current,
          Math.min(sliderRange - panOffset.current, gesture.dx)
        );
        pan.setValue(newPosition);
      },

      onPanResponderRelease: () => {
        // Aplanar offset
        pan.flattenOffset();

        // Restaurar escala normal
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: false,
          tension: 300,
          friction: 8,
        }).start();

        // ✅ Usar currentPanValue.current en lugar de pan._value
        const currentPosition = currentPanValue.current;
        const closestIndex = findClosestIndex(currentPosition);
        const targetPosition = getPointPosition(closestIndex);

        // Animar hacia el punto más cercano
        Animated.spring(pan, {
          toValue: targetPosition,
          useNativeDriver: false,
          tension: 150,
          friction: 8,
        }).start();

        // Actualizar estado
        const newDays = dayValues[closestIndex];
        setSelectedDays(newDays);
        setSelectedIndex(closestIndex);

        if (onValueChange) {
          onValueChange(newDays);
        }

        // ✅ Actualizar referencias
        panOffset.current = 0;
      },
    })
  ).current;

  // Crear animación con límites para el thumb
  const thumbPosition = Animated.diffClamp(pan, 0, sliderRange);

  return (
    <View style={styles.container}>
      {/* Mostrar valor seleccionado */}
      <ThemedText type="title">{selectedDays} días</ThemedText>

      {/* Contenedor del slider */}
      <View style={[styles.sliderContainer, { width }]}>
        {/* Track principal */}
        <View style={[styles.trackContainer, { width: sliderRange }]}>
          <View
            style={[
              styles.track,
              {
                width: sliderRange,
                backgroundColor: inactiveColor,
                height: trackHeight,
              },
            ]}
          >
            {/* Track activo */}
            <Animated.View
              style={[
                styles.activeTrack,
                {
                  width: Animated.add(thumbPosition, thumbSize / 2),
                  backgroundColor: primaryColor,
                  height: trackHeight,
                },
              ]}
            />
          </View>

          {/* Puntos de selección alineados con el track */}
          {dayValues.map((days, index) => {
            const position = getPointPosition(index);
            const isSelected = index === selectedIndex;

            return (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    left: position - dotSize / 2,
                    backgroundColor: isSelected ? primaryColor : "#fff",
                    borderColor: isSelected ? primaryColor : inactiveColor,
                    width: dotSize,
                    height: dotSize,
                    borderRadius: dotSize / 2,
                  },
                ]}
              />
            );
          })}

          {/* Thumb deslizable */}
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.thumb,
              {
                left: Animated.subtract(thumbPosition, thumbSize / 2),
                backgroundColor: primaryColor,
                transform: [{ scale }],
                width: thumbSize,
                height: thumbSize,
                borderRadius: thumbSize / 2,
              },
            ]}
          />
        </View>

        {/* Labels debajo del track */}
        <View style={[styles.labelsContainer, { width: sliderRange }]}>
          {dayLabels.map((label, index) => {
            const position = getPointPosition(index);
            const isSelected = index === selectedIndex;

            return (
              <Text
                key={index}
                style={[
                  styles.label,
                  {
                    left: position - 15,
                    color: isSelected ? 'white' : "#424242ff",
                    fontWeight: isSelected ? "bold" : "normal",
                  },
                ]}
              >
                {label}
              </Text>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  sliderContainer: {
    alignItems: "center",
    paddingBottom: 10,
  },
  trackContainer: {
    height: 40,
    position: "relative",
    justifyContent: "center",
  },
  track: {
    borderRadius: 3,
  },
  activeTrack: {
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 3,
  },
  thumb: {
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    borderWidth: 3,
    borderColor: "#fff",
  },
  dot: {
    position: "absolute",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  labelsContainer: {
    position: "relative",
    marginTop: 15,
  },
  label: {
    position: "absolute",
    fontSize: 12,
    textAlign: "center",
    width: 30,
  },
});

export default Slider;
