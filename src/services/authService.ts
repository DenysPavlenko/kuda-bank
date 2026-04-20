import type { BasicAuthCredentials } from "@/src/types/api";
import * as SecureStore from "expo-secure-store";

let cached: BasicAuthCredentials | null = null;
const CREDENTIALS_KEY = "auth_credentials";

export const authService = {
  load: async () => {
    const credentials = await SecureStore.getItemAsync(CREDENTIALS_KEY);
    if (credentials) {
      cached = JSON.parse(credentials);
    }
    return cached;
  },

  setCredentials: async (credentials: BasicAuthCredentials) => {
    cached = credentials;
    await SecureStore.setItemAsync(
      CREDENTIALS_KEY,
      JSON.stringify(credentials),
    );
  },

  async clear() {
    cached = null;
    await SecureStore.deleteItemAsync(CREDENTIALS_KEY);
  },

  getToken(): string | null {
    if (!cached) return null;
    return btoa(`${cached.username}:${cached.password}`);
  },
};
