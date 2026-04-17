import { useTheme } from "@/src/context";
import { type TThemeValue } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface CheckboxProps {
  value: boolean;
  onChange: (value: boolean) => void;
  testID?: string;
}

export function Checkbox({ value, onChange, testID }: CheckboxProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity
      testID={testID}
      activeOpacity={0.7}
      onPress={() => onChange(!value)}
      style={[styles.box, value && styles.checked]}
    >
      {value && (
        <Ionicons
          name="checkmark"
          size={12}
          color={theme.colors.buttonPrimaryContents}
        />
      )}
    </TouchableOpacity>
  );
}

const createStyles = (theme: TThemeValue) =>
  StyleSheet.create({
    box: {
      width: 18,
      height: 18,
      borderRadius: theme.layout.borderRadius.sm / 2,
      borderWidth: 1.5,
      borderColor: theme.colors.systemSecondary,
      alignItems: "center",
      justifyContent: "center",
    },
    checked: {
      backgroundColor: theme.colors.systemPrimary,
      borderColor: theme.colors.systemPrimary,
    },
  });
