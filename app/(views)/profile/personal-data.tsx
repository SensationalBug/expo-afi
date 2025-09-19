import CustomInput from "@/components/custom/CustomInput";
import Loader from "@/components/custom/Loader";
import SlideWindow from "@/components/custom/SlideWindow";
import BiometricWindow from "@/components/profile/BiometricWindow";
import ContinueButton from "@/components/profile/ContinueButton";
import PersonalDataWindow from "@/components/profile/PersonalDataWindow";
import YesOrNot from "@/components/profile/YesOrNot";
import { ThemedText } from "@/components/themed/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import {
    GENDERDATA,
    INPUTDATA,
    MUNICIPIOSDATA,
    NACIONALIDADDATA,
    PAISESDATA,
    PROVINCIASDATA,
} from "@/utils/data";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

const PersonalDataView = () => {
  const [currentPage, setCurrentPage] = useState(1);

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
          title: "Datos personales",
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
        showIndicators={currentPage > 4 ? false : true}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      >
        <PersonalDataWindow
          childrenButton={
            <ContinueButton
              title="Continuar"
              onPress={() => setCurrentPage(currentPage + 1)}
            />
          }
        >
          <>
            <CustomInput
              title="Tipo de documento"
              data={INPUTDATA}
              inputType="dropdown"
              dropdownIcon="address-card"
            />
            <CustomInput title="Numero de documento" keyboardType="numeric" />
            <CustomInput title="Nombre completo" />
            <CustomInput
              title="Genero"
              data={GENDERDATA}
              inputType="dropdown"
              dropdownIcon="transgender"
            />
            <CustomInput
              title="Fecha de nacimiento"
              inputType="date"
              placeholder="Introduce tu fecha de nacimiento"
            />
          </>
        </PersonalDataWindow>

        <PersonalDataWindow
          title="Nacionalidad y residencia"
          childrenButton={
            <ContinueButton
              title="Continuar"
              onPress={() => setCurrentPage(currentPage + 1)}
            />
          }
        >
          <>
            <CustomInput
              title="Selecciona tu nacionalidad"
              data={NACIONALIDADDATA}
              inputType="dropdown"
            />
            <CustomInput
              title="Selecciona tu pais de residencia"
              data={PAISESDATA}
              inputType="dropdown"
            />
            <CustomInput title="Posee segunda nacionalidad?" />
          </>
        </PersonalDataWindow>

        <PersonalDataWindow
          title="Direccion"
          childrenButton={
            <ContinueButton
              title="Continuar"
              onPress={() => setCurrentPage(currentPage + 1)}
            />
          }
        >
          <>
            <CustomInput title="Pais" data={PAISESDATA} inputType="dropdown" />
            <CustomInput
              title="Provincia"
              data={PROVINCIASDATA}
              inputType="dropdown"
            />
            <CustomInput
              title="Municipio"
              data={MUNICIPIOSDATA}
              inputType="dropdown"
            />
            <CustomInput title="Sector" />
            <CustomInput title="Calle" />
            <CustomInput title="Numero de casa" />
          </>
        </PersonalDataWindow>
        <PersonalDataWindow
          childrenButton={
            <ContinueButton
              title="Continuar"
              onPress={() => setCurrentPage(currentPage + 1)}
            />
          }
        >
          <>
            <YesOrNot
              onPress={() => console.log("1")}
              title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, nobis?"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
                      blanditiis ratione vitae officia, quia voluptate reprehenderit facere
                      eos ea delectus."
            />
            <YesOrNot
              onPress={() => console.log("2")}
              title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, nobis?"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
        blanditiis ratione vitae officia, quia voluptate reprehenderit facere
        eos ea delectus."
            />
            <YesOrNot
              onPress={() => console.log("3")}
              title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, nobis?"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
        blanditiis ratione vitae officia, quia voluptate reprehenderit facere
        eos ea delectus."
            />
            <YesOrNot
              onPress={() => console.log("4")}
              title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, nobis?"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
        blanditiis ratione vitae officia, quia voluptate reprehenderit facere
        eos ea delectus."
            />
          </>
        </PersonalDataWindow>
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
    </>
  );
};

export default PersonalDataView;
