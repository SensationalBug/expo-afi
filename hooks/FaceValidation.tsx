import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Camera,
  runAsync,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from "react-native-vision-camera";
import {
  Face,
  FaceDetectionOptions,
  useFaceDetector,
} from "react-native-vision-camera-face-detector";
import { Worklets } from "react-native-worklets-core";

// "profilePhoto" |"CedFrontPhoto"|"CedBackPhoto"
export default function FaceValidationScreen({
  onClose,
  uriUpdater,
}: {
  onClose?: () => void;
  uriUpdater?: (
    fieldName: "profilePhoto" | "CedFrontPhoto" | "CedBackPhoto",
    value: string
  ) => void;
}) {
  const device = useCameraDevice("front");
  const { hasPermission, requestPermission } = useCameraPermission();
  const cameraRef = useRef<Camera>(null);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [faceInsideOval, setFaceInsideOval] = useState(false);
  const [proximity, setProximity] = useState(0); // proximidad: 0 lejos, 1 cerca

  const minArea = 10000; // Ajusta según pruebas del área
  const maxArea = 45000;

  const ovalBounds = {
    x: (windowWidth - 280) / 2,
    y: 100,
    width: 280,
    height: 380,
  };

  const isFaceCenterInsideOval = (faceBounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => {
    const centerX = faceBounds.x + faceBounds.width / 2;
    const centerY = faceBounds.y + faceBounds.height / 2;

    const c_x = ovalBounds.x + ovalBounds.width / 2;
    const c_y = ovalBounds.y + ovalBounds.height / 2;

    const r_x = ovalBounds.width / 2;
    const r_y = ovalBounds.height / 2;

    const normX = (centerX - c_x) / r_x;
    const normY = (centerY - c_y) / r_y;

    return normX * normX + normY * normY <= 1;
  };

  const onFacesDetected = (
    faces: Face[],
    frameWidth: number,
    frameHeight: number
  ) => {
    let inside = false;
    let prox = 0;

    const scaleX = windowWidth / frameWidth;
    const scaleY = windowHeight / frameHeight;

    for (const face of faces) {
      const mirroredX = frameWidth - (face.bounds.x + face.bounds.width);

      const mirroredY = frameHeight - (face.bounds.y + face.bounds.height);
      const adjustedBounds = {
        x: mirroredX * scaleX,
        y: mirroredY * scaleY,
        width: face.bounds.width * scaleX,
        height: face.bounds.height * scaleY,
      };

      const insideOval = isFaceCenterInsideOval(adjustedBounds);

      if (!insideOval) {
        continue; // Ignorar caras fuera del óvalo
      }

      inside = true;

      const area = adjustedBounds.width * adjustedBounds.height;

      prox = (area - minArea) / (maxArea - minArea);
      if (prox > 1) prox = 1;
      if (prox < 0) prox = 0;

      break; // Solo una cara válida
    }

    setFaceInsideOval(inside);
    setProximity(prox);
  };

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const faceDetectionOptions = useRef<FaceDetectionOptions>({
    performanceMode: "fast",
    landmarkMode: "none",
    contourMode: "none",
    classificationMode: "none",
    minFaceSize: 0.1,
    trackingEnabled: false,
    windowWidth: windowWidth,
    windowHeight: windowHeight,
    autoMode: true,
  }).current;

  const { detectFaces, stopListeners } = useFaceDetector(faceDetectionOptions);
  useEffect(() => {
    return () => stopListeners();
  }, [stopListeners]);

  const handleDetectedFaces = useCallback(
    Worklets.createRunOnJS(onFacesDetected),
    []
  );

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";
      runAsync(frame, () => {
        "worklet";
        const faces = detectFaces(frame);
        const frameWidth = frame.width;
        const frameHeight = frame.height;
        handleDetectedFaces(faces, frameWidth, frameHeight);
      });
    },
    [handleDetectedFaces]
  );

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto();
      uriUpdater?.("profilePhoto", photo.path);
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
        <Text style={styles.permissionText}>No se encontró cámara frontal</Text>
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
        frameProcessor={frameProcessor}
      />

      <View style={styles.overlay}>
        <View style={styles.topArea} />

        <View style={styles.middleArea}>
          <View style={styles.leftSide} />
          <View
            style={[
              styles.ovalGuide,
              {
                borderColor: faceInsideOval ? Colors.default.active : "red",
              },
            ]}
          />
          <View style={styles.rightSide} />
        </View>

        <View style={styles.bottomArea}>
          <Text style={styles.instruction}>
            Posiciona tu rostro dentro del óvalo
          </Text>

          <TouchableOpacity
            onPress={takePicture}
            style={[
              styles.captureButton,
              proximity < 1 && styles.captureButtonDisabled,
            ]}
            disabled={proximity < 1}
          >
            <View style={styles.captureInner} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.proximityContainer}>
        <View
          style={[styles.proximityFill, { width: `${proximity * 100}%` }]}
        />
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
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  topArea: {
    flex: 1,
  },
  middleArea: {
    flexDirection: "row",
    height: 400,
    alignItems: "center",
  },
  leftSide: {
    flex: 1,
  },
  rightSide: {
    flex: 1,
  },
  ovalGuide: {
    width: 280,
    height: 380,
    borderRadius: 140,
    borderWidth: 3,
    backgroundColor: "transparent",
  },
  bottomArea: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 50,
  },
  instruction: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
    fontWeight: "500",
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
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  captureButtonDisabled: {
    opacity: 0.5,
    backgroundColor: Colors.default.mutedText,
  },
  proximityContainer: {
    height: 8,
    width: 280,
    backgroundColor: Colors.default.lightGray,
    borderRadius: 4,
    marginTop: 50,
    overflow: "hidden",
    alignSelf: "center",
  },
  proximityFill: {
    height: 8,
    backgroundColor: Colors.default.accent,
    borderRadius: 4,
    width: "0%",
  },
});
