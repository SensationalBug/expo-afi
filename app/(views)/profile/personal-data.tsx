import CustomButton from "@/components/custom/CustomButton";
import CustomDatePicker from "@/components/custom/CustomDatePicker";
import CustomInput from "@/components/custom/CustomInput";
import SlideWindow from "@/components/custom/SlideWindow";
import { ThemedText } from "@/components/themed/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";

const PersonalDataView = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Este useEffect estara aqui solo para simular la validacion de los datos.
  useEffect(() => {
    if (currentPage === 5) {
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
      }, 4000);
    }
  }, [currentPage]);

  const INPUTDATA = [
    { label: "Cedula", value: "cedula" },
    { label: "Pasaporte", value: "pasaporte" },
  ];

  const GENDERDATA = [
    { label: "Cedula", value: "cedula" },
    { label: "Pasaporte", value: "pasaporte" },
  ];
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
        showIndicators={false}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      >
        <View style={{}}>
          <CustomInput
            title="Tipo de documento"
            inputType="dropdown"
            data={INPUTDATA}
          />
          <CustomInput title="Numero de documento" keyboardType="numeric" />
          <CustomInput title="Nombres" />
          <CustomInput title="Apellidos" />
          <CustomInput title="Genero" inputType="dropdown" data={GENDERDATA} />
          <CustomInput title="Fecha de nacimiento" />
          <View>
            <Button
              title="Seleccionar Fecha"
              onPress={() => setShowDatePicker(true)}
            />
            {selectedDate && (
              <Text style={{ marginTop: 20 }}>
                Fecha seleccionada: {selectedDate.getDate()}/
                {selectedDate.getMonth() + 1}/{selectedDate.getFullYear()}
              </Text>
            )}
            <CustomDatePicker
              visible={showDatePicker}
              onClose={() => setShowDatePicker(false)}
              onConfirm={(date) => {
                setSelectedDate(date);
                setShowDatePicker(false);
              }}
              initialDate={new Date()}
            />
          </View>
          <CustomButton
            height={60}
            title={"Continuar"}
            textType="subtitle"
            onPress={() => setCurrentPage(currentPage + 1)}
            titleColor={Colors.default.whiteText}
          />
        </View>
        <View>
          <ThemedText>KLK</ThemedText>
          <CustomButton
            height={60}
            title={"KLK"}
            textType="subtitle"
            onPress={() => setCurrentPage(currentPage + 1)}
            titleColor={Colors.default.whiteText}
          />
        </View>
        <View>
          <ThemedText>KLK</ThemedText>
          <CustomButton
            height={60}
            title={"KLK"}
            textType="subtitle"
            onPress={() => setCurrentPage(currentPage + 1)}
            titleColor={Colors.default.whiteText}
          />
        </View>
        <View>
          <ThemedText>KLK</ThemedText>
          <CustomButton
            height={60}
            title={"KLK"}
            textType="subtitle"
            onPress={() => setCurrentPage(currentPage + 1)}
            titleColor={Colors.default.whiteText}
          />
        </View>
        <View>
          <ThemedText>KLK</ThemedText>
          <CustomButton
            height={60}
            title={"KLK"}
            textType="subtitle"
            onPress={() => setCurrentPage(currentPage + 1)}
            titleColor={Colors.default.whiteText}
          />
        </View>
      </SlideWindow>
    </>
  );
};

export default PersonalDataView;
