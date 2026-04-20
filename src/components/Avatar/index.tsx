import { useTheme } from "@/src/context";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Typography } from "../Typography";

interface AvatarProps {
  name: string;
  size?: number;
}

export function Avatar({ name, size = 64 }: AvatarProps) {
  const { theme } = useTheme();
  const styles = useMemo(
    () =>
      createStyles(
        theme.colors.backgroundPrimary,
        theme.colors.titlePrimary,
        size,
      ),
    [theme, size],
  );

  return (
    <View style={styles.circle} testID="avatar">
      <Typography variant="bodySmall" color="systemPrimary">
        {name.charAt(0).toUpperCase()}
      </Typography>
    </View>
  );
}

const createStyles = (bg: string, fg: string, size: number) =>
  StyleSheet.create({
    circle: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: bg,
      alignItems: "center",
      justifyContent: "center",
    },
  });
