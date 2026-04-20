import { AppProvider, useAppContext, useTheme } from "@/src/context";
import { ThemeProvider } from "@/src/context/ThemeContext";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import {
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
  Theme,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.setOptions({
  fade: true,
});

SplashScreen.preventAutoHideAsync();

const AppContent = () => {
  const { theme, isLoading: isThemeLoading } = useTheme();
  const { isAuth, isLoading, isOnboarded } = useAppContext();

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const loaded = fontsLoaded && !isThemeLoading && !isLoading;

  const navigationTheme: Theme = useMemo(
    () => ({
      ...DefaultTheme,
      dark: theme.mode === "dark",
      colors: {
        ...DefaultTheme.colors,
        background: theme.colors.backgroundPrimary,
      },
    }),
    [theme],
  );

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style={theme.statusBar} />
      <SafeAreaProvider>
        <NavigationThemeProvider value={navigationTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={!isOnboarded}>
              <Stack.Screen name="(onboarding)" />
            </Stack.Protected>
            <Stack.Protected guard={isOnboarded && !isAuth}>
              <Stack.Screen name="(auth)" />
            </Stack.Protected>
          </Stack>
        </NavigationThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default function RootLayout() {
  return (
    <AppProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AppProvider>
  );
}
