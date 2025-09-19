import React, { useEffect, useRef } from "react";
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  KeyboardEvent,
  Platform,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../themed/ThemedText";

type PersonalDataWindowProps = {
  children: React.ReactNode;
  childrenButton: React.ReactNode;
  title?: string;
};

const PersonalDataWindow = ({
  children,
  childrenButton,
  title,
}: PersonalDataWindowProps) => {
  const keyboardHeight = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const height = useWindowDimensions().height;

  useEffect(() => {
    const onKeyboardShow = (e: KeyboardEvent) => {
      Animated.timing(keyboardHeight, {
        toValue: e.endCoordinates.height,
        duration: 250,
        useNativeDriver: false,
      }).start();
    };
    const onKeyboardHide = () => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    };

    const showSub = Keyboard.addListener("keyboardDidShow", onKeyboardShow);
    const hideSub = Keyboard.addListener("keyboardDidHide", onKeyboardHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [keyboardHeight]);

  return (
    <View
      style={{
        paddingBottom: insets.bottom,
        height: height - (insets.bottom * 2) - insets.top,
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={"padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          {title && (
            <ThemedText type="title" style={{ marginVertical: 10 }}>
              {title}
            </ThemedText>
          )}
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 40,
            }}
          >
            {children}
          </ScrollView>
          <Animated.View style={{ paddingTop: 20, marginBottom: 20 }}>
            {childrenButton}
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PersonalDataWindow;
