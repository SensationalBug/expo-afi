import { formatNumber } from "@/utils/formatCurrency";
import React from "react";
import { StyleProp, TextStyle, View } from "react-native";
import CustomButton from "../Custom/CustomButton";
import CustomInput from "../Custom/CustomInput";
import Slider from "../Custom/Slider";
import { ThemedText } from "../Themed/ThemedText";

type CustomTextProps = {
  text: string;
  fontSize?: number;
  style?: StyleProp<TextStyle>;
  alignSelf?: "flex-start" | "center" | "flex-end";
};

const CustomText = ({ text, fontSize, alignSelf, style }: CustomTextProps) => {
  return (
    <ThemedText
      alignSelf={alignSelf}
      style={[
        style,
        {
          fontSize,
          padding: 5,
          marginVertical: 5,
          textAlign: "justify",
          lineHeight: fontSize ? fontSize + 6 : 22,
        },
      ]}
    >
      {text}
    </ThemedText>
  );
};

const Calculator = ({ scrollToTop }: { scrollToTop?: () => void }) => {
  const [selectedCurrency, setSelectedCurrency] = React.useState("DOP");
  const [earningsData, setEarningsData] = React.useState({
    days: 30,
    inputValue: 0,
    interestRate: 0.05,
  });

  const calculateResult = (
    inputValue: number,
    days: number,
    interestRate: number
  ) => {
    if (inputValue <= 0 || days <= 0) return 0;
    return inputValue * Math.pow(1 + interestRate / 365, days);
  };

  const handleDaysChange = (days: number) => {
    setEarningsData((prev) => ({
      ...prev,
      days: days,
    }));

    return calculateResult(
      earningsData.inputValue,
      days,
      earningsData.interestRate
    );
  };

  const handleInputValue = (value: string) => {
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
    setEarningsData((prev) => ({
      ...prev,
      inputValue: numericValue,
    }));

    return calculateResult(
      numericValue,
      earningsData.days,
      earningsData.interestRate
    );
  };

  return (
    <View>
      <CustomText text="Selecciona el tipo de moneda" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CustomButton
          title="DOP"
          disabled={selectedCurrency === "DOP"}
          onPress={() => setSelectedCurrency("DOP")}
        />
        <CustomButton
          title="USD"
          disabled={selectedCurrency === "USD"}
          onPress={() => setSelectedCurrency("USD")}
        />
        <CustomButton
          title="EUR"
          disabled={selectedCurrency === "EUR"}
          onPress={() => setSelectedCurrency("EUR")}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <CustomText
          alignSelf="flex-start"
          text={`Moneda seleccionada: ${selectedCurrency}`}
        />
        <CustomInput
          placeholder={`${selectedCurrency}$${1}`}
          onChangeText={handleInputValue}
          scrollToTop={scrollToTop} 
        />
        <CustomText
          text="El monto minimo para depositos es de RD$1,000.00 o su equivalente en
          las demas monedas"
          fontSize={12}
        />
      </View>
      <View>
        <CustomText text="Seleccione el plazo en dias" />
        <Slider
          width={300}
          initialValue={earningsData.days}
          onValueChange={handleDaysChange}
        />
      </View>
      <View>
        <CustomText text="Resultado de la proyeccion" />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <CustomText
            text={`$${formatNumber(
              earningsData.inputValue *
                (1 + earningsData.interestRate / 365) ** earningsData.days
            )}`}
            fontSize={38}
          />
          <CustomText
            fontSize={16}
            text={selectedCurrency}
            style={{ backgroundColor: "#007AFF", borderRadius: 5 }}
          />
        </View>
      </View>
      <View>
        <CustomText
          fontSize={10}
          text={`La tasa corresponde a la mas baja ofrecida (${
            earningsData.interestRate * 100
          }%), para tener una proyeccion mas acercada favor completar el perfil y contactarse con uno de nuestros representantes.`}
        />
      </View>
    </View>
  );
};

export default Calculator;
