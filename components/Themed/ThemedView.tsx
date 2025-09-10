import { useThemeColor } from '@/hooks/useThemeColor';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, StatusBar, View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  lightColor?: string | string[];
  darkColor?: string | string[];
  safeTop?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  safeTop = true,
  ...otherProps
}: ThemedViewProps) {
  const background = useThemeColor(
    { light: lightColor, dark: darkColor },
    'gradient'
  );

  const paddingTop = safeTop
    ? Platform.OS === 'android'
      ? StatusBar.currentHeight || 0
      : 0
    : 0;

  if (Array.isArray(background)) {
    return (
      <LinearGradient
        colors={background}
        style={[{ flex: 1, paddingTop }, style]}
        {...otherProps}
      />
    );
  }

  return (
    <View
      style={[{ flex: 1, backgroundColor: background, paddingTop }, style]}
      {...otherProps}
    />
  );
}
