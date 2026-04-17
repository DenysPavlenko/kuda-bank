import { useTheme } from "@/src/context";
import { TThemeValue } from "@/src/theme";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconButton } from "../IconButton";
import { Typography } from "../Typography";

interface HeaderProps {
  title?: string;
  leftContent?: React.ReactNode;
  centerContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  hideBackButton?: boolean;
  onBack?: () => void;
  preventBackNavigation?: boolean;
}

export const HEADER_HEIGHT = 56;

export const Header = ({
  title,
  leftContent,
  centerContent,
  rightContent,
  hideBackButton,
  onBack,
  preventBackNavigation,
}: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const router = useRouter();

  const handleBack = () => {
    onBack?.();
    if (preventBackNavigation) return;
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderLeft = () => {
    if (leftContent) {
      return <View style={styles.leftContainer}>{leftContent}</View>;
    }
    if (hideBackButton) {
      return <View style={styles.leftContainer} />;
    }
    return (
      <View style={styles.leftContainer}>
        <IconButton icon="chevron-back-outline" onPress={handleBack} />
      </View>
    );
  };

  const renderCenter = () => {
    if (title) {
      return (
        <View style={styles.centerContainer}>
          <Typography align="center" variant="h3" numberOfLines={1}>
            {title}
          </Typography>
        </View>
      );
    }
    if (centerContent) {
      return <View style={styles.centerContainer}>{centerContent}</View>;
    }
    return <View style={styles.centerContainer} />;
  };

  const renderRight = () => {
    if (rightContent) {
      return <View style={styles.rightContainer}>{rightContent}</View>;
    }
    return <View style={styles.rightContainer} />;
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, height: HEADER_HEIGHT + insets.top },
      ]}
    >
      {renderLeft()}
      {renderCenter()}
      {renderRight()}
    </View>
  );
};

const createStyles = (theme: TThemeValue) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: theme.layout.spacing.ml,
      justifyContent: "space-between",
      paddingRight: theme.layout.spacing.lg,
    },
    leftContainer: {
      minWidth: theme.layout.size.xl,
      alignItems: "flex-start",
    },
    centerContainer: {
      flex: 1,
    },
    rightContainer: {
      minWidth: theme.layout.size.xl,
      alignItems: "flex-end",
      paddingLeft: theme.layout.spacing.lg,
    },
  });
