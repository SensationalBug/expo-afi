import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import React, { useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

// --------- Variables que controlan el rectángulo guía ---------
const RECTANGLE_WIDTH = 320; // ancho del rectángulo
const RECTANGLE_HEIGHT = 200; // alto del rectángulo
const RECTANGLE_TOP = 170; // distancia desde el top de la pantalla
// --------------------------------------------------------------

export default function CedulaPhotoScreen({
  onClose,
  uriUpdater,
  cedPhoto,
}: {
  onClose?: () => void;
  uriUpdater?: (
    fieldName: "CedFrontPhoto" | "CedBackPhoto" | "profilePhoto",
    value: string
  ) => void;
  cedPhoto?: "front" | "back";
}) {
  const device = useCameraDevice("back"); // Se recomienda usar cámara trasera para documentos
  const { hasPermission, requestPermission } = useCameraPermission();
  const cameraRef = useRef<Camera>(null);

  const windowWidth = Dimensions.get("window").width;

  const rectangleLeft = (windowWidth - RECTANGLE_WIDTH) / 2;

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto();
      const photoUri = photo.path;
      uriUpdater?.(
        cedPhoto === "front" ? "CedFrontPhoto" : "CedBackPhoto",
        photoUri
      ); // El nombre del campo depende de tu lógica
      onClose?.();
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          Se requieren permisos de cámara para continuar
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Conceder permisos</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>No se encontró cámara</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        ref={cameraRef}
      />

      {/* Overlay con rectángulo guía */}
      <View style={styles.overlay}>
        {/* Guía rectangular */}
        <View
          style={[
            styles.rectangleGuide,
            {
              width: RECTANGLE_WIDTH,
              height: RECTANGLE_HEIGHT,
              top: RECTANGLE_TOP,
              left: rectangleLeft,
              borderColor: Colors.default.active,
            },
          ]}
        />

        <View style={styles.bottomArea}>
          <Text style={styles.instruction}>
            Coloca la cédula dentro del rectángulo y toma la foto
          </Text>

          <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
            <View style={styles.captureInner} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={onClose}
        style={{ position: "absolute", top: 40, left: 15 }}
      >
        <IconSymbol name="close" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-end",
  },
  rectangleGuide: {
    position: "absolute",
    borderWidth: 3,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  bottomArea: {
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 50,
    width: "100%",
  },
  instruction: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
    fontWeight: "500",
    marginBottom: 16,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.default.buttonBackground,
  },
  permissionText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    backgroundColor: Colors.default.buttonBackground,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});
