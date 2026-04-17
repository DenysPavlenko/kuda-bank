import {
  borderRadius,
  darkColors,
  lightColors,
  size,
  spacing,
  type TTheme,
  type TThemeValue,
} from "@/src/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useColorScheme } from "react-native";

const THEME_STORAGE_KEY = "app_theme_override";

export const ThemeContext = createContext<TTheme | null>(null);

const layout: TThemeValue["layout"] = { spacing, borderRadius, size };

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [override, setOverride] = useState<"light" | "dark" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY).then((stored) => {
      if (stored === "light" || stored === "dark") {
        setOverride(stored);
      }
      setIsLoading(false);
    });
  }, []);

  const isDark = (override ?? systemScheme) === "dark";

  const toggleTheme = useCallback(() => {
    setOverride((prev) => {
      const current = prev ?? systemScheme;
      const next = current === "dark" ? "light" : "dark";
      AsyncStorage.setItem(THEME_STORAGE_KEY, next);
      return next;
    });
  }, [systemScheme]);

  const value = useMemo<TTheme>(
    () => ({
      theme: {
        mode: isDark ? "dark" : "light",
        statusBar: isDark ? "light" : "dark",
        colors: isDark ? darkColors : lightColors,
        layout,
        toggleTheme,
      },
      isLoading,
    }),
    [isDark, isLoading, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): TTheme {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
