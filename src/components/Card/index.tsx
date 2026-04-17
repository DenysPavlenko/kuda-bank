import { useTheme } from "@/src/context";
import { TBorderRadiusKey, type TThemeValue } from "@/src/theme";
import { useMemo, type ReactNode } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";

interface CardProps {
  children: ReactNode;
  radius?: TBorderRadiusKey;
  style?: ViewStyle;
}

export function Card({ children, radius = "md", style }: CardProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme, radius), [theme, radius]);

  return <View style={[styles.card, style]}>{children}</View>;
}

const createStyles = (theme: TThemeValue, radius: CardProps["radius"] = "md") =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.backgroundSecondary,
      borderRadius: theme.layout.borderRadius[radius],
      padding: theme.layout.spacing.lg,
    },
  });
