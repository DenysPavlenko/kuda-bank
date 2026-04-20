import { useTheme } from "@/src/context";
import { type TThemeValue } from "@/src/theme";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";

interface PageIndicatorProps {
  count: number;
  // raw horizontal scroll offset in pixels
  scrollX: SharedValue<number>;
  pageWidth: number;
}

const DOT_SIZE = 6;
const DOT_GAP = 8;
const PILL_WIDTH = 6;
const PILL_HEIGHT = 18;

export function PageIndicator({
  count,
  scrollX,
  pageWidth,
}: PageIndicatorProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const pillStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          scrollX.value,
          [0, pageWidth * (count - 1)],
          [0, (count - 1) * (DOT_SIZE + DOT_GAP)],
        ),
      },
    ],
  }));

  return (
    <View
      style={[
        styles.container,
        { width: count * (DOT_SIZE + DOT_GAP) - DOT_GAP },
      ]}
    >
      <View style={styles.dotsRow}>
        {Array.from({ length: count }).map((_, i) => (
          <View key={i} style={styles.dot} />
        ))}
      </View>
      <Animated.View style={[styles.pill, pillStyle]} />
    </View>
  );
}

const createStyles = (theme: TThemeValue) =>
  StyleSheet.create({
    container: {
      height: PILL_HEIGHT,
    },
    dotsRow: {
      flexDirection: "row",
      gap: DOT_GAP,
      alignItems: "center",
      height: PILL_HEIGHT,
      paddingHorizontal: (PILL_WIDTH - DOT_SIZE) / 2,
    },
    dot: {
      width: DOT_SIZE,
      height: DOT_SIZE,
      borderRadius: DOT_SIZE / 2,
      backgroundColor: theme.colors.systemSecondary,
    },
    pill: {
      position: "absolute",
      top: 0,
      left: (PILL_WIDTH - DOT_SIZE) / 2,
      width: PILL_WIDTH,
      height: PILL_HEIGHT,
      borderRadius: PILL_WIDTH / 2,
      backgroundColor: theme.colors.systemPrimary,
    },
  });
