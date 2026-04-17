import { Typography } from "@/src/components/Typography";
import { useTheme } from "@/src/context";
import { type TThemeValue } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";

type IconButtonProps = TouchableOpacityProps &
  (
    | { icon: React.ComponentProps<typeof Ionicons>["name"]; label?: never }
    | { label: string; icon?: never }
  );

export function IconButton({ icon, label, style, ...rest }: IconButtonProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.base, icon ? styles.circle : styles.pill, style]}
      {...rest}
    >
      {icon ? (
        <Ionicons name={icon} size={18} color={theme.colors.textPrimary} />
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
      backgroundColor: theme.colors.backgroundSecondary,
      alignItems: "center",
      justifyContent: "center",
    },
    pill: {
      borderRadius: theme.layout.borderRadius.full,
      paddingHorizontal: theme.layout.spacing.xl,
      paddingVertical: theme.layout.spacing.sm,
    },
    circle: {
      borderRadius: theme.layout.borderRadius.full,
      width: 40,
      height: 40,
    },
  });
