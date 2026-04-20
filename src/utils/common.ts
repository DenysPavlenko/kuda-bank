import { Linking } from "react-native";

export const openLink = async (url: string) => {
  const supported = await Linking.canOpenURL(url);
  if (!supported) {
    throw new Error(`Can't handle url: ${url}`);
  }
  if (supported) {
    await Linking.openURL(url);
  }
};
