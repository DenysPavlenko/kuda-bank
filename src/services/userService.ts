import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  HAS_ONBOARDED: "app_user_has_onboarded",
} as const;

export const userService = {
  // Onboarding status management
  async setOnboarded(value: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.HAS_ONBOARDED, JSON.stringify(value));
    } catch (e) {
      console.error("Error saving onboarding status", e);
    }
  },

  async getOnboarded(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(KEYS.HAS_ONBOARDED);
      return value !== null ? JSON.parse(value) : false;
    } catch {
      return false;
    }
  },

  async clearOnboarding(): Promise<void> {
    await AsyncStorage.removeItem(KEYS.HAS_ONBOARDED);
  },

  // Additional user-related methods can be added here
};
