import { StyleSheet, TouchableOpacity, View } from "react-native";

import Carousel from "@/components/custom/Carousel";
import { Collapsible } from "@/components/custom/Collapsible";
import CustomView from "@/components/custom/CustomView";
import ParallaxScrollView from "@/components/custom/ParallaxScrollView";
import { ThemedText } from "@/components/themed/ThemedText";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import Calculator from "@/components/custom/Calculator";
import CustomButton from "@/components/custom/CustomButton";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import Animated from "react-native-reanimated";
import { data, faqData } from "../../utils/data";

export default function HomeScreen() {
  const scrollRef = React.useRef<Animated.ScrollView>(null);
  const scrollToTop = () => {
    // scrollRef.current?.scrollTo({ y: 400, animated: true });
  };

  const [openCollapsible, setOpenCollapsible] = React.useState<number | null>(
    null
  );
  const [shouldShowMini, setShouldShowMini] = React.useState(
    openCollapsible !== -2
  );
  const handleToggle = (index: number) => {
    setOpenCollapsible(openCollapsible === index ? null : index);
  };

  React.useEffect(() => {
    if (openCollapsible === -2) {
      // Si se abre, ocultar inmediatamente
      setShouldShowMini(false);
    } else {
      // Si se cierra, mostrar después de la animación (350ms)
      const timer = setTimeout(() => {
        setShouldShowMini(true);
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [openCollapsible]);

  return (
    <ParallaxScrollView
      ref={scrollRef}
      header={
        <View style={[styles.headerContainer]}>
          <FontAwesome5
            name="react"
            size={180}
            style={styles.headerImage}
            color={Colors.default.buttonBackground}
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
        <Collapsible
          isOpen={true}
          // isOpen={openCollapsible === -1}
          onToggle={() => handleToggle(-1)}
          title="Completa tu perfil"
          subtitle="Completados 0/7"
        >
          <CustomButton
            icons
            textType="normalSubtitle"
            title="Validacion biometrica"
            bgColor={Colors.default.background}
            onPress={() => router.push('/(views)/profile/biometric-view')}
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
            title="Asociar cuenta bancaria"
            textType="normalSubtitle"
            bgColor={Colors.default.background}
          />
          <CustomButton
            icons
            title="Expectativa de inversion"
            textType="normalSubtitle"
            bgColor={Colors.default.background}
          />
          <CustomButton
            icons
            title="Firmar contrato"
            textType="normalSubtitle"
            bgColor={Colors.default.background}
          />
        </Collapsible>
      </CustomView>

      <CustomView padding>
        <Collapsible
          isOpen={openCollapsible === -2}
          onToggle={() => handleToggle(-2)}
          title="Calcula tus ingresos"
          subtitle={
            shouldShowMini
              ? "Lorem ipsum dolor sit amet consectetur adipisicing elit."
              : ""
          }
          alignSelf="flex-start"
        >
          <Calculator scrollToTop={scrollToTop} />
        </Collapsible>
      </CustomView>

      <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
        <ThemedText type="title">Carousel Lorem, ipsum dolor.</ThemedText>
      </View>

      <Carousel data={data} />

      <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
        <ThemedText type="title">FAQ</ThemedText>
        {faqData.map((faq, index) => (
          <Collapsible
            key={faq.id}
            type="normalSubtitle"
            title={faq.title}
            isOpen={openCollapsible === faq.id}
            onToggle={() => handleToggle(faq.id)}
            style={styles.collapsible}
          >
            <ThemedText style={{ textAlign: "justify" }}>
              {faq.content}
            </ThemedText>
          </Collapsible>
        ))}
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
    borderRadius: 100,
    marginHorizontal: 7,
    position: "absolute",
    left: -70,
    top: -70,
  },
  collapsible: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.default.lightGray,
  },
});
