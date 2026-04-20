import { Header } from "@/src/components";
import { Button } from "@/src/components/Button";
import { Card } from "@/src/components/Card";
import { IconButton } from "@/src/components/IconButton";
import { Typography } from "@/src/components/Typography";
import { useAppContext, useTheme } from "@/src/context";
import { type TThemeValue } from "@/src/theme";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  type ViewToken,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { PageIndicator } from "./components/PageIndicator";

const PAGES = [
  {
    id: "1",
    title: "You ought to know where your money goes",
    subtitle:
      "Get an overview of how you are performing and motivate yourself to achieve even more.",
  },
  {
    id: "2",
    title: "Send money to anyone, instantly",
    subtitle:
      "Transfer funds to friends and family in seconds, no matter where they are.",
  },
  {
    id: "3",
    title: "Track spending, build better habits",
    subtitle:
      "See exactly where your money goes and take control of your financial future.",
  },
];

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList<(typeof PAGES)[number]>,
);

export const OnboardingScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { setOnboardingSeen } = useAppContext();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useSharedValue(0);

  const isLastPage = currentPage === PAGES.length - 1;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  const handleNext = async () => {
    if (isLastPage) {
      await setOnboardingSeen();
    } else {
      flatListRef.current?.scrollToIndex({
        index: currentPage + 1,
        animated: true,
      });
    }
  };

  const handleSkip = async () => {
    await setOnboardingSeen();
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const item = viewableItems[0];
      if (item && item.index !== null && item.index !== undefined) {
        setCurrentPage(item.index);
      }
    },
  ).current;

  const renderItem = useCallback(
    ({ item }: { item: (typeof PAGES)[number] }) => (
      <View style={[styles.page, { width: pageWidth }]}>
        <Typography variant="h2" color="titlePrimary" align="center">
          {item.title}
        </Typography>
        <Typography
          variant="body"
          color="textSecondary"
          align="center"
          style={styles.subtitle}
        >
          {item.subtitle}
        </Typography>
      </View>
    ),
    [styles, pageWidth],
  );

  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      <Header
        hideBackButton
        rightContent={<IconButton label="Skip" onPress={handleSkip} />}
      />
      <View style={styles.container}>
        <View style={styles.illustrationArea}>
          <Image
            source={require("@/assets/images/onboarding-illustration.png")}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <Card radius="xl" style={styles.card}>
          <AnimatedFlatList
            ref={flatListRef}
            data={PAGES}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            onViewableItemsChanged={onViewableItemsChanged}
            onLayout={(e) => setPageWidth(e.nativeEvent.layout.width)}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            renderItem={renderItem}
          />

          <View style={styles.indicatorRow}>
            <PageIndicator
              count={PAGES.length}
              scrollX={scrollX}
              pageWidth={pageWidth}
            />
          </View>

          <Button
            label={isLastPage ? "Get Started" : "Next"}
            onPress={handleNext}
          />
        </Card>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: TThemeValue) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: theme.layout.spacing.lg,
    },
    illustrationArea: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    illustration: {
      width: "100%",
    },
    card: {
      paddingVertical: theme.layout.spacing.xxl,
      paddingHorizontal: theme.layout.spacing.xl,
    },
    page: {},
    subtitle: {
      marginTop: theme.layout.spacing.md,
    },
    indicatorRow: {
      alignItems: "center",
      marginTop: theme.layout.spacing.lg,
      marginBottom: theme.layout.spacing.lg,
    },
  });
