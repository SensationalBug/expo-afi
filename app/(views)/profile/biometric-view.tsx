import CustomButton from "@/components/custom/CustomButton";
import SlideWindow from "@/components/custom/SlideWindow";
import ProfileWindow from "@/components/profile/ProfileWindow";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import FaceValidationScreen from "@/hooks/FaceValidation";
import { router, Stack } from "expo-router";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

const BiometricView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFaceValidation, setShowFaceValidation] = useState(false);
  const [photoUri, setPhotoUri] = useState<string>("");
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: "center",
          title: "Verifica tu identidad",
          headerTintColor: Colors.default.text,
          headerTitleStyle: { color: Colors.default.text },
          headerStyle: { backgroundColor: Colors.default.background },
          headerLeft: () => (
            // Aqui luego colocar un alert que pregunte si quieres salir dle proceso
            <TouchableOpacity onPress={() => router.back()}>
              <IconSymbol name="close" size={24} color={Colors.default.text} />
            </TouchableOpacity>
          ),
        }}
      />
      <SlideWindow
        enableSwipe={false}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      >
        <ProfileWindow
          title="Verificacion Biometrica"
          subtitle="Para mejorar la seguridad y verificar tu identidad, te guiaremos a
              traves de una rapida configuracion biometrica"
          onPress={() => setCurrentPage(currentPage + 1)}
          buttonText="Comenzar"
          icon={!photoUri ? "face" : undefined}
          photo={photoUri}
        />
        <ProfileWindow
          title="Toma una foto de tu rostro"
          subtitle="Asegurate de tener buena iluminacion, quitate gafas o sombreros y y centra el rostro en el centro del ovalo"
          onPress={() => setShowFaceValidation(true)}
          // onPress={() => setCurrentPage(currentPage + 1)}
          buttonText="Tomar Foto"
        />
        <View>
          <Text>BiometricView</Text>
        </View>
        <View>
          <Text>BiometricView</Text>
        </View>
        <View>
          <Text>BiometricView</Text>
        </View>
        <View>
          <Text>BiometricView</Text>
        </View>
        <View>
          <CustomButton
            titleColor={Colors.default.whiteText}
            title="Continuar"
            onPress={() => {}}
          />
        </View>
      </SlideWindow>

      <Modal
        animationType="slide"
        visible={showFaceValidation}
        onRequestClose={() => setShowFaceValidation(false)}
      >
        <FaceValidationScreen
          setPhotoUri={setPhotoUri}
          onClose={() => setShowFaceValidation(false)}
        />
      </Modal>
    </>
  );
};

export default BiometricView;
