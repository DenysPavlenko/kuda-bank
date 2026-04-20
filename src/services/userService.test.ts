import AsyncStorage from "@react-native-async-storage/async-storage";
import { userService } from "./userService";

const KEY = "app_user_has_onboarded";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("userService", () => {
  describe("getOnboarded", () => {
    it("returns false when key is not set", async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
      expect(await userService.getOnboarded()).toBe(false);
    });

    it("returns true when stored value is true", async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(true),
      );
      expect(await userService.getOnboarded()).toBe(true);
    });

    it("returns false when stored value is false", async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(false),
      );
      expect(await userService.getOnboarded()).toBe(false);
    });

    it("returns false when AsyncStorage throws", async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
        new Error("read error"),
      );
      expect(await userService.getOnboarded()).toBe(false);
    });
  });

  describe("setOnboarded", () => {
    it("stores serialized value under the correct key", async () => {
      await userService.setOnboarded(true);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        KEY,
        JSON.stringify(true),
      );
    });

    it("does not throw when AsyncStorage fails", async () => {
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(
        new Error("write error"),
      );
      jest.spyOn(console, "error").mockImplementationOnce(() => {});
      await expect(userService.setOnboarded(true)).resolves.toBeUndefined();
    });
  });

  describe("clearOnboarding", () => {
    it("removes the correct key from AsyncStorage", async () => {
      await userService.clearOnboarding();
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith(KEY);
    });
  });
});
