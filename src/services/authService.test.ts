import * as SecureStore from "expo-secure-store";
import { authService } from "./authService";

jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

const credentials = { username: "john", password: "secret" };

beforeEach(async () => {
  jest.clearAllMocks();
  // Reset the in-memory cache between tests
  await authService.clear();
});

describe("authService", () => {
  describe("getToken", () => {
    it("returns null when no credentials are cached", () => {
      expect(authService.getToken()).toBeNull();
    });

    it("returns a base64 Basic token when credentials are cached", async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(credentials),
      );
      await authService.load();

      const token = authService.getToken();
      expect(token).toBe(
        btoa(`${credentials.username}:${credentials.password}`),
      );
    });
  });

  describe("load", () => {
    it("returns null when SecureStore has no credentials", async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(null);
      const result = await authService.load();
      expect(result).toBeNull();
    });

    it("loads and caches credentials from SecureStore", async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(credentials),
      );
      const result = await authService.load();
      expect(result).toEqual(credentials);
      // Token now works without another SecureStore read
      expect(authService.getToken()).not.toBeNull();
    });
  });

  describe("setCredentials", () => {
    it("persists credentials to SecureStore", async () => {
      await authService.setCredentials(credentials);
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        "auth_credentials",
        JSON.stringify(credentials),
      );
    });

    it("makes the token available immediately after setting", async () => {
      await authService.setCredentials(credentials);
      expect(authService.getToken()).toBe(
        btoa(`${credentials.username}:${credentials.password}`),
      );
    });
  });

  describe("clear", () => {
    it("removes credentials from SecureStore", async () => {
      await authService.setCredentials(credentials);
      jest.clearAllMocks();

      await authService.clear();
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(
        "auth_credentials",
      );
    });

    it("clears the in-memory cache so getToken returns null", async () => {
      await authService.setCredentials(credentials);
      await authService.clear();
      expect(authService.getToken()).toBeNull();
    });
  });
});
