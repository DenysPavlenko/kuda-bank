import { Typography } from "@/src/components/Typography";
import { useTheme } from "@/src/context";
import { type TColorKey, type TThemeValue } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";

type IconButtonProps = TouchableOpacityProps & {
  bgColor?: TColorKey;
  size?: number;
} & (
    | { icon: React.ComponentProps<typeof Ionicons>["name"]; label?: never }
    | { label: string; icon?: never }
  );

export function IconButton({
  icon,
  label,
  bgColor = "backgroundSecondary",
  size = 40,
  style,
  ...rest
}: IconButtonProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const resolvedBg = theme.colors[bgColor];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.base,
        icon
          ? { width: size, height: size, borderRadius: size / 2 }
          : styles.pill,
        { backgroundColor: resolvedBg },
        style,
      ]}
      {...rest}
    >
      {icon ? (
        <Ionicons
          name={icon}
          size={size * 0.45}
          color={theme.colors.textPrimary}
        />
      ) : (
        <Typography variant="bodySmall" color="textPrimary">
          {label}
        </Typography>
      )}
    </TouchableOpacity>
  );
}

const createStyles = (theme: TThemeValue) =>
  StyleSheet.create({
    base: {
      alignItems: "center",
      justifyContent: "center",
    },
    pill: {
      borderRadius: theme.layout.borderRadius.full,
      paddingHorizontal: theme.layout.spacing.xl,
      paddingVertical: theme.layout.spacing.sm,
    },
  });
