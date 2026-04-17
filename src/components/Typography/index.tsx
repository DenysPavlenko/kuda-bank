import { useTheme } from "@/src/context";
import {
  typography,
  type TColorKey,
  type TTypographyVariant,
} from "@/src/theme";
import { Text, type TextProps, type TextStyle } from "react-native";

export interface TypographyProps extends TextProps {
  variant?: TTypographyVariant;
  color?: TColorKey;
  align?: TextStyle["textAlign"];
}

export function Typography({
  variant = "body",
  color = "textPrimary",
  align = "left",
  style,
  children,
  ...rest
}: TypographyProps) {
  const { theme } = useTheme();

  return (
    <Text
      style={[
        {
          ...typography[variant],
          color: theme.colors[color],
          textAlign: align,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
