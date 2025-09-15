import { StyleSheet, TouchableOpacity, View } from "react-native";

import Carousel from "@/components/custom/Carousel";
import { Collapsible } from "@/components/custom/Collapsible";
import CustomView from "@/components/custom/CustomView";
import ParallaxScrollView from "@/components/custom/ParallaxScrollView";
import { ThemedText } from "@/components/themed/ThemedText";
import { Image } from "expo-image";

import Calculator from "@/components/custom/Calculator";
import CustomButton from "@/components/custom/CustomButton";
import { Colors } from "@/constants/Colors";
import React from "react";
import Animated from "react-native-reanimated";
import { data } from "../../config";

export default function HomeScreen() {
  const scrollRef = React.useRef<Animated.ScrollView>(null);
  const scrollToTop = () => {
    // scrollRef.current?.scrollTo({ y: 400, animated: true });
  };

  return (
    <ParallaxScrollView
      ref={scrollRef}
      header={
        <View style={[styles.headerContainer]}>
          <Image
            style={styles.headerImage}
            source={require("@/assets/images/react-logo.png")}
          />
          <View
            style={{
              width: "100%",
              height: "100%",
              paddingRight: 15,
              alignItems: "flex-end",
              justifyContent: "space-evenly",
            }}
          >
            <ThemedText type="title" style={{ fontSize: 24 }}>
              Pedro Luis De Leon Alejo
            </ThemedText>
            <TouchableOpacity>
              <ThemedText alignSelf="flex-end" iconName="chevron.right">
                Ver perfil
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      }
    >
      <CustomView padding>
        <Collapsible title="Completa tu perfil" subtitle="Completados 0/7">
          <CustomButton
            icons
            textType="normalSubtitle"
            title="Validacion biometrica"
            bgColor={Colors.default.background}
          />
          <CustomButton
            icons
            textType="normalSubtitle"
            title="Datos personales"
            bgColor={Colors.default.background}
          />
          <CustomButton
            icons
            textType="normalSubtitle"
            title="Datos laborales"
            bgColor={Colors.default.background}
          />
          <CustomButton
            icons
            textType="normalSubtitle"
            title="Perfil de inversionista"
            bgColor={Colors.default.background}
          />
          <CustomButton
            icons
            title="Boton 5"
            textType="normalSubtitle"
            bgColor={Colors.default.background}
          />
          <CustomButton
            icons
            title="Boton 6"
            textType="normalSubtitle"
            bgColor={Colors.default.background}
          />
          <CustomButton
            icons
            title="Boton 7"
            textType="normalSubtitle"
            bgColor={Colors.default.background}
          />
        </Collapsible>
      </CustomView>

      <CustomView padding>
        <Collapsible title="Calcula tus ingresos">
          <Calculator scrollToTop={scrollToTop} />
        </Collapsible>
      </CustomView>

      <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
        <ThemedText type="title">Carousel Lorem, ipsum dolor.</ThemedText>
      </View>

      <Carousel data={data}>
        <TouchableOpacity>
          <ThemedText
            style={{ padding: 10, alignSelf: "flex-end" }}
            iconName="chevron.right"
          >
            Ver mas
          </ThemedText>
        </TouchableOpacity>
      </Carousel>

      <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
        <ThemedText type="title">FAQ</ThemedText>
        <Collapsible
          type="subtitle"
          title="¿Qué riesgo tienen las inversiones?"
        >
          <ThemedText style={{ textAlign: "justify" }}>
            Las inversiones conllevan diferentes niveles de riesgo. Los fondos
            de renta fija son más conservadores, mientras que las acciones
            tienen mayor volatilidad pero también mayor potencial de crecimiento
            a largo plazo.
          </ThemedText>
        </Collapsible>
        <Collapsible
          type="subtitle"
          title="¿Qué riesgo tienen las inversiones?"
        >
          <ThemedText style={{ textAlign: "justify" }}>
            Las inversiones conllevan diferentes niveles de riesgo. Los fondos
            de renta fija son más conservadores, mientras que las acciones
            tienen mayor volatilidad pero también mayor potencial de crecimiento
            a largo plazo.
          </ThemedText>
        </Collapsible>
        <Collapsible
          type="subtitle"
          title="¿Qué riesgo tienen las inversiones?"
        >
          <ThemedText style={{ textAlign: "justify" }}>
            Las inversiones conllevan diferentes niveles de riesgo. Los fondos
            de renta fija son más conservadores, mientras que las acciones
            tienen mayor volatilidad pero también mayor potencial de crecimiento
            a largo plazo.
          </ThemedText>
        </Collapsible>
        <Collapsible
          type="subtitle"
          title="¿Qué riesgo tienen las inversiones?"
        >
          <ThemedText style={{ textAlign: "justify" }}>
            Las inversiones conllevan diferentes niveles de riesgo. Los fondos
            de renta fija son más conservadores, mientras que las acciones
            tienen mayor volatilidad pero también mayor potencial de crecimiento
            a largo plazo.
          </ThemedText>
        </Collapsible>
        <Collapsible
          type="subtitle"
          title="¿Qué riesgo tienen las inversiones?"
        >
          <ThemedText style={{ textAlign: "justify" }}>
            Las inversiones conllevan diferentes niveles de riesgo. Los fondos
            de renta fija son más conservadores, mientras que las acciones
            tienen mayor volatilidad pero también mayor potencial de crecimiento
            a largo plazo.
          </ThemedText>
        </Collapsible>
        <Collapsible
          type="subtitle"
          title="¿Qué riesgo tienen las inversiones?"
        >
          <ThemedText style={{ textAlign: "justify" }}>
            Las inversiones conllevan diferentes niveles de riesgo. Los fondos
            de renta fija son más conservadores, mientras que las acciones
            tienen mayor volatilidad pero también mayor potencial de crecimiento
            a largo plazo.
          </ThemedText>
        </Collapsible>
        <Collapsible
          type="subtitle"
          title="¿Qué riesgo tienen las inversiones?"
        >
          <ThemedText style={{ textAlign: "justify" }}>
            Las inversiones conllevan diferentes niveles de riesgo. Los fondos
            de renta fija son más conservadores, mientras que las acciones
            tienen mayor volatilidad pero también mayor potencial de crecimiento
            a largo plazo.
          </ThemedText>
        </Collapsible>
        <Collapsible
          type="subtitle"
          title="¿Qué riesgo tienen las inversiones?"
        >
          <ThemedText style={{ textAlign: "justify" }}>
            Las inversiones conllevan diferentes niveles de riesgo. Los fondos
            de renta fija son más conservadores, mientras que las acciones
            tienen mayor volatilidad pero también mayor potencial de crecimiento
            a largo plazo.
          </ThemedText>
        </Collapsible>
        <Collapsible
          type="subtitle"
          title="¿Qué riesgo tienen las inversiones?"
        >
          <ThemedText style={{ textAlign: "justify" }}>
            Las inversiones conllevan diferentes niveles de riesgo. Los fondos
            de renta fija son más conservadores, mientras que las acciones
            tienen mayor volatilidad pero también mayor potencial de crecimiento
            a largo plazo.
          </ThemedText>
        </Collapsible>
        <Collapsible
          type="subtitle"
          title="¿Qué riesgo tienen las inversiones?"
        >
          <ThemedText style={{ textAlign: "justify" }}>
            Las inversiones conllevan diferentes niveles de riesgo. Los fondos
            de renta fija son más conservadores, mientras que las acciones
            tienen mayor volatilidad pero también mayor potencial de crecimiento
            a largo plazo.
          </ThemedText>
        </Collapsible>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginHorizontal: 7,
    position: "absolute",
    left: -70,
    top: -70,
  },
});
