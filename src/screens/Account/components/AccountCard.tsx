import { Card, Typography } from "@/src/components";
import { useTheme } from "@/src/context";
import { type TThemeValue } from "@/src/theme";
import { type AccountResponse } from "@/src/types/api";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

const ROWS = [
  { label: "Type of account", key: "accountType" },
  { label: "Account No", key: "accountNumber" },
  { label: "Available Balance", key: "availableBalance" },
  { label: "Date added", key: "dateAdded" },
] satisfies { label: string; key: keyof AccountResponse }[];

export function AccountCard({ data }: { data: AccountResponse }) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Card style={styles.card}>
      {ROWS.map(({ label, key }) => (
        <View key={key} style={styles.cardRow}>
          <Typography variant="bodySmall" color="textSecondary">
            {label}
          </Typography>
          <Typography variant="bodySmall" color="textPrimary">
            {String(data[key])}
          </Typography>
        </View>
      ))}
    </Card>
  );
}

const createStyles = (theme: TThemeValue) =>
  StyleSheet.create({
    card: {
      paddingVertical: theme.layout.spacing.xl,
      gap: theme.layout.spacing.lg,
    },
    cardRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
