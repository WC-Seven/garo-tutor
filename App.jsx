import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { AppNavigator } from "./src/navigation/AppNavigator";
import { theme } from "./src/theme/theme";

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
    card: theme.colors.surface,
    text: theme.colors.text,
    primary: theme.colors.primary,
    border: theme.colors.border,
  },
};

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style="dark" />
      <AppNavigator />
    </NavigationContainer>
  );
}
