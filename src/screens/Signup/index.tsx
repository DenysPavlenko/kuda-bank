import { Header } from "@/src/components";
import { Button } from "@/src/components/Button";
import { Checkbox } from "@/src/components/Checkbox";
import { Input } from "@/src/components/Input";
import { TextLink } from "@/src/components/TextLink";
import { Typography } from "@/src/components/Typography";
import { useTheme } from "@/src/context";
import { type TThemeValue } from "@/src/theme";
import { openLink } from "@/src/utils";
import { useMemo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSignupForm } from "./hooks/useSignupForm";

export const SignupScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    agreedToTos,
    setAgreedToTos,
    errors,
    apiError,
    loading,
    handleSubmit,
  } = useSignupForm();

  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      {/* Not sure why we have a back button on Figma? */}
      <Header hideBackButton />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Typography variant="h1" color="titlePrimary">
            Create account
          </Typography>
          <Typography
            variant="body"
            color="textSecondary"
            style={styles.subtitle}
          >
            Complete the sign up to get started
          </Typography>

          <View style={styles.form}>
            <Input
              label="Name"
              value={name}
              onChangeText={setName}
              error={errors.name}
              autoCapitalize="words"
              placeholder="Louis Real"
            />
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              keyboardType="email-address"
              placeholder="louis@example.com"
            />
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              secureTextEntry
              placeholder="Min. 8 characters"
            />
          </View>

          {/* TOS */}
          <View style={styles.tosRow}>
            <Checkbox value={agreedToTos} onChange={setAgreedToTos} />
            <View style={styles.tosTextWrap}>
              <TextLink
                prefix="By signing up, you agree to the "
                label="Terms of Service and Privacy Policy"
                onPress={() => {
                  openLink("https://example.com/terms");
                }}
              />
            </View>
          </View>

          {errors.tos && (
            <Typography
              variant="small"
              color="systemError"
              style={styles.tosError}
            >
              {errors.tos}
            </Typography>
          )}

          {apiError && (
            <View style={styles.apiErrorBox}>
              <Typography variant="small" color="systemError">
                {apiError}
              </Typography>
            </View>
          )}

          <View style={styles.footer}>
            <TextLink
              prefix="Already have an account? "
              label="Sign in"
              onPress={() => {
                openLink("https://example.com/terms");
              }}
            />
            <Button
              label="Create account"
              onPress={handleSubmit}
              loading={loading}
              style={styles.submitButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const createStyles = (theme: TThemeValue) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    flex: {
      flex: 1,
    },
    scroll: {
      flexGrow: 1,
      paddingHorizontal: theme.layout.spacing.xl,
      paddingTop: theme.layout.spacing.xl,
      paddingBottom: theme.layout.spacing.xxl,
    },
    subtitle: {
      marginTop: theme.layout.spacing.xs,
    },
    form: {
      marginTop: theme.layout.spacing.xxl,
      gap: theme.layout.spacing.lg,
    },
    tosRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: theme.layout.spacing.md,
      marginTop: theme.layout.spacing.lg,
    },
    tosTextWrap: {
      flex: 1,
      marginTop: -4,
    },
    tosError: {
      marginTop: theme.layout.spacing.xs,
    },
    apiErrorBox: {
      marginTop: theme.layout.spacing.md,
      padding: theme.layout.spacing.md,
      borderRadius: theme.layout.borderRadius.sm,
      backgroundColor: theme.colors.backgroundPrimary,
      gap: theme.layout.spacing.xs,
    },
    footer: {
      marginTop: "auto",
      paddingTop: theme.layout.spacing.xl,
      gap: theme.layout.spacing.xxl,
      alignItems: "center",
    },
    submitButton: {
      width: "100%",
    },
  });
