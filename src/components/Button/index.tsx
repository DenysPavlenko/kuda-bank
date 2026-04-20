import { Typography } from "@/src/components/Typography";
import { useTheme } from "@/src/context";
import { type TColorKey, type TThemeValue } from "@/src/theme";
import { useMemo } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
  type ViewStyle,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "tertiary";

interface ButtonProps extends Omit<TouchableOpacityProps, "style"> {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  style?: ViewStyle;
}

const contentsMap: Record<ButtonVariant, TColorKey> = {
  primary: "buttonPrimaryContents",
  secondary: "buttonSecondaryContents",
  tertiary: "buttonTertiaryContents",
};

export const BUTTON_HEIGHT = 56;

export function Button({
  label,
  variant = "primary",
  loading = false,
  disabled = false,
  style,
  ...rest
}: ButtonProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      style={[
        styles.base,
        styles[variant],
        isDisabled && styles.disabled,
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={theme.colors[contentsMap[variant]]}
          testID="button-spinner"
        />
      ) : (
        <Typography variant="buttonText" color={contentsMap[variant]}>
          {label}
        </Typography>
      )}
    </TouchableOpacity>
  );
}

const createStyles = (theme: TThemeValue) =>
  StyleSheet.create({
    base: {
      height: BUTTON_HEIGHT,
      borderRadius: theme.layout.borderRadius.full,
      alignItems: "center",
      justifyContent: "center",
    },
    primary: {
      backgroundColor: theme.colors.buttonPrimary,
    },
    secondary: {
      backgroundColor: theme.colors.buttonSecondary,
    },
    tertiary: {
      backgroundColor: theme.colors.buttonTertiary,
    },
    disabled: {
      opacity: 0.5,
    },
  });
