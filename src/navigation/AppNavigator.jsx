import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ChatScreen } from "../screens/ChatScreen";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import { theme } from "../theme/theme";

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          color: theme.colors.text,
          fontWeight: "700",
        },
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ title: "Seu perfil" }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ title: "Tutor de ingles" }}
      />
    </Stack.Navigator>
  );
}
