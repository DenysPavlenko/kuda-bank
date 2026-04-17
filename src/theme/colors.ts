import { borderRadius, size, spacing } from "./spacing";

export type TColorsTheme = {
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  titlePrimary: string;
  titleSecondary: string;
  backgroundPrimary: string;
  backgroundSecondary: string;
  buttonPrimary: string;
  buttonPrimaryContents: string;
  buttonSecondary: string;
  buttonSecondaryContents: string;
  buttonTertiary: string;
  buttonTertiaryContents: string;
  systemPrimary: string;
  systemSecondary: string;
  systemSuccess: string;
  systemError: string;
};

export type TColorKey = keyof TColorsTheme;

export const lightColors: TColorsTheme = {
  textPrimary: "#131313",
  textSecondary: "#6C727F",
  textTertiary: "#6C727F",
  titlePrimary: "#2C14DD",
  titleSecondary: "#131313",
  backgroundPrimary: "#F5F7FF",
  backgroundSecondary: "#ffffff",
  buttonPrimary: "#2C14DD",
  buttonPrimaryContents: "#ffffff",
  buttonSecondary: "#ffffff",
  buttonSecondaryContents: "#131313",
  buttonTertiary: "#F5F7FF",
  buttonTertiaryContents: "#131313",
  systemPrimary: "#2C14DD",
  systemSecondary: "#BBBBBB",
  systemSuccess: "#009218",
  systemError: "#D92D20",
};

export const darkColors: TColorsTheme = {
  textPrimary: "#FFFFFF",
  textSecondary: "#BFB4D5",
  textTertiary: "#ABA2BE",
  titlePrimary: "#F5F7FF",
  titleSecondary: "#FFFFFF",
  backgroundPrimary: "#240F51",
  backgroundSecondary: "#3A2762",
  buttonPrimary: "#E5B4FF",
  buttonPrimaryContents: "#240F51",
  buttonSecondary: "#503F74",
  buttonSecondaryContents: "#FFFFFF",
  buttonTertiary: "#4E3D74",
  buttonTertiaryContents: "#F5F7FF",
  systemPrimary: "#FFFFFF",
  systemSecondary: "#503F74",
  systemSuccess: "#60C771",
  systemError: "#F97066",
};

export type TThemeValue = {
  mode: "light" | "dark";
  statusBar: "dark" | "light";
  colors: TColorsTheme;
  layout: {
    spacing: typeof spacing;
    borderRadius: typeof borderRadius;
    size: typeof size;
  };
  toggleTheme: () => void;
};

export type TTheme = {
  theme: TThemeValue;
  isLoading: boolean;
};

export type TBorderRadiusKey = keyof TThemeValue["layout"]["borderRadius"];
