import { Avatar, Card, IconButton, Typography } from "@/src/components";
import { useTheme } from "@/src/context";
import { type TThemeValue } from "@/src/theme";
import { type Transaction } from "@/src/types/api";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

export function TransactionsCard({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Card>
      <View style={styles.header}>
        <Typography variant="captionBig">Recent Transactions</Typography>
        <IconButton
          bgColor="buttonTertiary"
          size={20}
          icon="chevron-forward-outline"
        />
      </View>
      <View style={styles.list}>
        {transactions.map((tx, i) => {
          const isPositive = tx.amount > 0;
          return (
            <View key={i} style={styles.txRow}>
              <View style={styles.txInfo}>
                <Avatar name={tx.name} size={40} />
                <View>
                  <Typography variant="captionBig" color="textPrimary">
                    {tx.name}
                  </Typography>
                  <Typography variant="small" color="textSecondary">
                    {tx.bank} · {tx.time}
                  </Typography>
                </View>
              </View>
              <Typography
                variant="bodySmall"
                color={isPositive ? "systemSuccess" : "textPrimary"}
              >
                {isPositive ? "+" : ""}
                {tx.amount.toLocaleString()}
              </Typography>
            </View>
          );
        })}
      </View>
    </Card>
  );
}

const createStyles = (theme: TThemeValue) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: {
      marginTop: theme.layout.spacing.xl,
      marginBottom: theme.layout.spacing.md,
    },
    list: {
      gap: theme.layout.spacing.xl,
      paddingVertical: theme.layout.spacing.lg,
    },
    txRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    txInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.layout.spacing.md,
    },
  });
