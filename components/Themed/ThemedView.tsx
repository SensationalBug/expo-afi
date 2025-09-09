import { useThemeColor } from '@/hooks/useThemeColor';
import { Platform, StatusBar, View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  safeTop?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  safeTop = true,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const paddingTop = safeTop
    ? Platform.OS === 'android'
      ? StatusBar.currentHeight || 0
      : 0
    : 0;

  return <View style={[{ flex: 1, backgroundColor, paddingTop }, style]} {...otherProps} />;
}
