import { StyleSheet, TouchableOpacity, View } from "react-native";

import CustomView from "@/components/Custom/CustomView";
import ParallaxScrollView from "@/components/Custom/ParallaxScrollView";
import { ThemedText } from "@/components/Themed/ThemedText";
import { ThemedView } from "@/components/Themed/ThemedView";
import { Image } from "expo-image";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      header={
        <View style={styles.headerContainer}>
          <Image
            source={require("@/assets/images/react-logo.png")}
            style={styles.headerImage}
          />
          <View style={{ height: "100%", justifyContent: "space-evenly" }}>
            <ThemedText type="title">Pedro Luis De Leon Alejo</ThemedText>
            <TouchableOpacity>
              <ThemedText alignSelf="flex-end" iconName="chevron.right">
                Ver perfil
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      }
    >
      <CustomView height={150}>
        <ThemedText type="title" style={{ textAlign: "center" }}>
          Completa tu perfil
        </ThemedText>
        <TouchableOpacity>
          <ThemedText
            type="subtitle"
            alignSelf="flex-end"
            iconName="chevron.right"
            style={{ textAlign: "center" }}
          >
            0/7 completados
          </ThemedText>
        </TouchableOpacity>
      </CustomView>

      <CustomView height={100}>
        <ThemedText type="title">Calculadora</ThemedText>
        <TouchableOpacity>
          <ThemedText
            type="subtitle"
            alignSelf="flex-end"
            iconName="chevron.right"
            style={{ textAlign: "center" }}
          >
            Ir a la calculadora
          </ThemedText>
        </TouchableOpacity>
      </CustomView>

      <ThemedView>
        <ThemedText type="title">Fondos</ThemedText>
      </ThemedView>

      <CustomView height={200}>
        <ThemedText type="title">Fondo 1</ThemedText>
      </CustomView>

      <CustomView height={200}>
        <ThemedText type="title">Fondo 2</ThemedText>
      </CustomView>

      <CustomView height={200}>
        <ThemedText type="title">Fondo 3</ThemedText>
      </CustomView>

      <ThemedView>
        <ThemedText alignSelf="flex-end">Ver mas...</ThemedText>
      </ThemedView>

      <ThemedView>
        <ThemedText type="title">FAQ</ThemedText>
      </ThemedView>
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
});
