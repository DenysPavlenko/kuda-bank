import { ThemeProvider } from "@/src/context/ThemeContext";
import { useTheme } from "@/src/hooks";
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
  const { theme, isLoading } = useTheme();

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const loaded = fontsLoaded && !isLoading;

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
          <ThemeProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </ThemeProvider>
        </NavigationThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
