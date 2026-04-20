import { Button, Header, IconButton, Typography } from "@/src/components";
import { useAppContext, useTheme } from "@/src/context";
import { type TThemeValue } from "@/src/theme";
import { useMemo } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AccountCard } from "./components/AccountCard";
import { TransactionsCard } from "./components/TransactionsCard";
import { useAccount } from "./hooks/useAccount";

export const AccountScreen = () => {
  const { theme } = useTheme();
  const { toggleTheme, mode } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { data, loading, error } = useAccount();
  const { signOut, signOutToOnboarding } = useAppContext();

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator testID="account-spinner" />
        </View>
      );
    }

    if (error) {
      return (
        <Typography
          variant="body"
          color="systemError"
          align="center"
          style={styles.error}
        >
          {error}
        </Typography>
      );
    }

    if (data) {
      return (
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/logo.png")}
              resizeMode="contain"
            />
            <Typography
              variant="captionBig"
              align="center"
              color="titleSecondary"
            >
              Kuda Bank
            </Typography>
          </View>
          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.info}>
              <AccountCard data={data} />
              <TransactionsCard transactions={data.transactions} />
            </View>
          </ScrollView>
        </View>
      );
    }

    return null;
  };

  // For testing purposes only
  const renderDevActions = () => {
    return (
      <View style={styles.devActions}>
        <Button
          disabled={loading}
          label="Signout"
          onPress={signOut}
          style={styles.devButton}
        />
        <Button
          disabled={loading}
          label="To onboarding"
          onPress={signOutToOnboarding}
          style={styles.devButton}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      <Header
        hideBackButton
        title="My Account"
        rightContent={
          <IconButton
            icon={mode === "light" ? "sunny" : "moon"}
            onPress={toggleTheme}
          />
        }
      />
      {renderContent()}
      {renderDevActions()}
    </SafeAreaView>
  );
};

const createStyles = (theme: TThemeValue) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    loading: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    error: {
      padding: theme.layout.spacing.xl,
    },
    content: {
      flex: 1,
      paddingTop: theme.layout.spacing.xl,
    },
    logoContainer: {
      alignItems: "center",
      justifyContent: "center",
      gap: theme.layout.spacing.lg,
      marginBottom: theme.layout.spacing.xxl,
    },
    scroll: {
      flexGrow: 1,
      paddingHorizontal: theme.layout.spacing.ml,
    },
    info: {
      flex: 1,
      gap: theme.layout.spacing.xl,
    },
    devActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.layout.spacing.md,
      padding: theme.layout.spacing.ml,
      paddingBottom: theme.layout.spacing.md,
    },
    devButton: {
      flex: 1,
    },
  });
