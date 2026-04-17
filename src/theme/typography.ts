export const fonts = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semibold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
} as const;

export const typography = {
  h1: {
    fontFamily: fonts.bold,
    fontSize: 32,
    lineHeight: 40,
  },
  h2: {
    fontFamily: fonts.bold,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.5,
  },
  h3: {
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.5,
  },
  captionBig: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 24,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 22,
  },
  small: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 18,
  },
  buttonText: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 24,
  },
} as const;

export type TTypographyVariant = keyof typeof typography;
