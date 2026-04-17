import { Typography } from "@/src/components/Typography";
import { useTheme } from "@/src/context";
import { typography, type TThemeValue } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  type KeyboardTypeOptions,
} from "react-native";

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  placeholder?: string;
  testID?: string;
}

export function Input({
  label,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  keyboardType,
  autoCapitalize = "none",
  placeholder,
  testID,
}: InputProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [hidden, setHidden] = useState(secureTextEntry);

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          error ? styles.containerError : styles.containerDefault,
        ]}
      >
        <View style={styles.inner}>
          <Typography variant="small" color="textSecondary">
            {label}
          </Typography>
          <TextInput
            testID={testID}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={hidden}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.textTertiary}
            style={styles.textInput}
          />
        </View>

        {secureTextEntry && (
          <TouchableOpacity onPress={() => setHidden((h) => !h)} hitSlop={8}>
            <Ionicons
              name={hidden ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={theme.colors.textTertiary}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Typography variant="small" color="systemError">
          {error}
        </Typography>
      )}
    </View>
  );
}

const createStyles = (theme: TThemeValue) =>
  StyleSheet.create({
    wrapper: {
      gap: theme.layout.spacing.xs,
    },
    container: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: theme.layout.borderRadius.sm,
      paddingHorizontal: theme.layout.spacing.lg,
      paddingVertical: theme.layout.spacing.md,
      backgroundColor: theme.colors.backgroundSecondary,
      gap: theme.layout.spacing.sm,
    },
    containerError: {
      borderColor: theme.colors.systemError,
    },
    containerDefault: {
      borderColor: "transparent",
    },
    inner: {
      flex: 1,
      gap: theme.layout.spacing.sm,
    },
    textInput: {
      ...typography.h3,
      color: theme.colors.textPrimary,
      padding: 0,
    },
  });
