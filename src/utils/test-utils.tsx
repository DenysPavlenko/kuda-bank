import { ThemeProvider } from "@/src/context/ThemeContext";
import { render, type RenderOptions } from "@testing-library/react-native";
import { act, type ReactElement, type ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

function AllProviders({ children }: { children: ReactNode }) {
  return (
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 390, height: 844 },
        insets: { top: 0, left: 0, bottom: 0, right: 0 },
      }}
    >
      <ThemeProvider>{children}</ThemeProvider>
    </SafeAreaProvider>
  );
}

export async function renderWithProviders(
  ui: ReactElement,
  options?: RenderOptions,
) {
  const result = render(ui, { wrapper: AllProviders, ...options });
  await act(async () => {}); // flushes ThemeProvider's async storage effect
  return result;
}
