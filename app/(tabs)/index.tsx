import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Carousel from "@/components/Custom/Carousel";
import { Collapsible } from "@/components/Custom/Collapsible";
import CustomView from "@/components/Custom/CustomView";
import ParallaxScrollView from "@/components/Custom/ParallaxScrollView";
import { ThemedText } from "@/components/Themed/ThemedText";
import { Image } from "expo-image";

import Calculator from "@/components/Views/Calculator";
import React from "react";
import Animated from "react-native-reanimated";
import { data } from "../../config";

export default function HomeScreen() {
  const scrollRef = React.useRef<Animated.ScrollView>(null);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 430, animated: true });
  };

  return (
    <ParallaxScrollView
      ref={scrollRef}
      header={
        <View style={styles.headerContainer}>
          <Image
            style={styles.headerImage}
            source={require("@/assets/images/react-logo.png")}
          />
          <View style={{ height: "100%", justifyContent: "space-evenly" }}>
            <Text style={{ fontSize: 24, color: "white" }}>
              Pedro Luis De Leon Alejo
            </Text>
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
        <ThemedText type="subtitle" style={{ textAlign: "center" }}>
          Completa tu perfil
        </ThemedText>
        <TouchableOpacity>
          <ThemedText
            alignSelf="flex-end"
            iconName="chevron.right"
            style={{ textAlign: "center", paddingVertical: 10 }}
          >
            0/7 completados
          </ThemedText>
        </TouchableOpacity>
        <ThemedText type="subtitle" style={{ textAlign: "center" }}>
          Siguiente paso:
        </ThemedText>
        <TouchableOpacity>
          <ThemedText
            alignSelf="flex-end"
            iconName="chevron.right"
            style={{ textAlign: "center", paddingVertical: 10 }}
          >
            Validacion Biometrica
          </ThemedText>
        </TouchableOpacity>
      </CustomView>

      <CustomView padding>
        <Collapsible title="Calcula tus ingresos">
          <Calculator scrollToTop={scrollToTop} />
        </Collapsible>
      </CustomView>

      <ThemedText type="title">CArousel Lorem, ipsum dolor.</ThemedText>

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

      <ThemedText type="title" style={{ marginTop: 50 }}>
        FAQ
      </ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
      <ThemedText type="title">FAQ</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginHorizontal: 7,
    backgroundColor: "red",
  },
  moreButton: {
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-end",
    backgroundColor: "#1D3D47",
  },
});
