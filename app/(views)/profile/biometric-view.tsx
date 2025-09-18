import Loader from "@/components/custom/Loader";
import SlideWindow from "@/components/custom/SlideWindow";
import BiometricWindow from "@/components/profile/BiometricWindow";
import { ThemedText } from "@/components/themed/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import CedulaPhotoScreen from "@/hooks/CedValidation";
import FaceValidationScreen from "@/hooks/FaceValidation";
import { updateState } from "@/utils/updateState";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";

const BiometricView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showCamera, setShowCamera] = useState({
    faceValidation: false,
    cedFrontValidation: false,
    cedBackValidation: false,
  });
  const [photoUri, setPhotoUri] = useState({
    profilePhoto: "",
    CedFrontPhoto: "",
    CedBackPhoto: "",
  });

  const uriUpdater = (fieldName: string, value: any) => {
    setPhotoUri((prevState: any) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  // Este useEffect estara aqui solo para simular la validacion de los datos.
  useEffect(() => {
    if (currentPage === 5) {
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
      }, 4000);
    }
  }, [currentPage]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: currentPage < 5 ? true : false,
          headerShadowVisible: false,
          headerTitleAlign: "center",
          title: "Verifica tu identidad",
          headerTintColor: Colors.default.text,
          headerTitleStyle: { color: Colors.default.text },
          headerStyle: { backgroundColor: Colors.default.background },
          headerLeft: () =>
            // Aqui luego colocar un alert que pregunte si quieres salir dle proceso
            currentPage > 1 && (
              <TouchableOpacity onPress={() => setCurrentPage(currentPage - 1)}>
                <IconSymbol
                  name="chevron.left"
                  size={24}
                  color={Colors.default.text}
                />
              </TouchableOpacity>
            ),
          headerRight: () => (
            // Aqui luego colocar un alert que pregunte si quieres salir dle proceso
            <TouchableOpacity onPress={() => router.back()}>
              <IconSymbol name="close" size={24} color={Colors.default.text} />
            </TouchableOpacity>
          ),
        }}
      />
      <SlideWindow
        enableSwipe={false}
        showIndicators={false}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      >
        <BiometricWindow
          title="Verificacion Biometrica"
          subtitle="Para mejorar la seguridad y verificar tu identidad, te guiaremos a
              traves de una rapida configuracion biometrica"
          onPress={() => setCurrentPage(currentPage + 1)}
          buttonText="Comenzar"
          icon="face"
        />
        <BiometricWindow
          title="Toma una foto de tu rostro"
          subtitle="Asegurate de tener buena iluminacion, quitate gafas o sombreros y y centra el rostro en el centro del ovalo"
          onPress={() =>
            photoUri.profilePhoto
              ? setCurrentPage(currentPage + 1)
              : updateState(setShowCamera, "faceValidation", true)
          }
          buttonText={photoUri.profilePhoto ? "Continuar" : "Tomar foto"}
          photo={photoUri.profilePhoto || require("@/assets/images/person.png")}
          uriUpdater={uriUpdater}
          photoField="profilePhoto"
        />
        <BiometricWindow
          title="Toma una foto del frente de tu documento"
          subtitle="Asegurate de que el documento este dentro del marco, sin reflejos ni partes borrosas"
          onPress={() =>
            photoUri.CedFrontPhoto
              ? setCurrentPage(currentPage + 1)
              : updateState(setShowCamera, "cedFrontValidation", true)
          }
          buttonText={photoUri.CedFrontPhoto ? "Continuar" : "Tomar foto"}
          photo={photoUri.CedFrontPhoto || require(`@/assets/images/dni.png`)}
          uriUpdater={uriUpdater}
          photoField="CedFrontPhoto"
        />
        <BiometricWindow
          title="Toma una foto del reverso de tu documento"
          subtitle="Asegurate de que el documento este dentro del marco, sin reflejos ni partes borrosas"
          onPress={() =>
            photoUri.CedBackPhoto
              ? setCurrentPage(currentPage + 1)
              : updateState(setShowCamera, "cedBackValidation", true)
          }
          buttonText={photoUri.CedBackPhoto ? "Continuar" : "Tomar foto"}
          photo={photoUri.CedBackPhoto || require(`@/assets/images/dni.jpg`)}
          uriUpdater={uriUpdater}
          photoField="CedBackPhoto"
        />
        <View
          style={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
          <ThemedText type="title" style={{ marginVertical: 10 }}>
            Validando tus datos...
          </ThemedText>
          <ThemedText type="normalSubtitle" style={{ textAlign: "center" }}>
            Esto tomara solo un momento. No cierres la aplicacion
          </ThemedText>
        </View>
        <BiometricWindow
          title="Verificacion exitosa"
          subtitle="Tu identidad ha sido verificada con extio. Ahora puedes continuar con el proceso de completar tu perfil"
          onPress={() => router.back()}
          buttonText="Continuar a la pantalla principal"
          icon="check"
        />
      </SlideWindow>

      <Modal
        animationType="slide"
        visible={showCamera.faceValidation}
        onRequestClose={() =>
          updateState(setShowCamera, "faceValidation", false)
        }
      >
        <FaceValidationScreen
          uriUpdater={uriUpdater}
          onClose={() => updateState(setShowCamera, "faceValidation", false)}
        />
      </Modal>
      <Modal
        animationType="slide"
        visible={showCamera.cedFrontValidation}
        onRequestClose={() =>
          updateState(setShowCamera, "cedFrontValidation", false)
        }
      >
        <CedulaPhotoScreen
          cedPhoto="front"
          uriUpdater={uriUpdater}
          onClose={() =>
            updateState(setShowCamera, "cedFrontValidation", false)
          }
        />
      </Modal>
      <Modal
        animationType="slide"
        visible={showCamera.cedBackValidation}
        onRequestClose={() =>
          updateState(setShowCamera, "cedBackValidation", false)
        }
      >
        <CedulaPhotoScreen
          cedPhoto="back"
          uriUpdater={uriUpdater}
          onClose={() => updateState(setShowCamera, "cedBackValidation", false)}
        />
      </Modal>
    </>
  );
};

export default BiometricView;
