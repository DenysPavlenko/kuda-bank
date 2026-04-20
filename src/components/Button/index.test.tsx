import { renderWithProviders } from "@/src/utils/test-utils";
import { screen, userEvent } from "@testing-library/react-native";
import { Button } from "./index";

describe("Button", () => {
  describe("label", () => {
    it("renders the label", async () => {
      await renderWithProviders(<Button label="Continue" />);
      expect(screen.getByText("Continue")).toBeOnTheScreen();
    });
  });

  describe("loading", () => {
    it("shows ActivityIndicator when loading", async () => {
      await renderWithProviders(<Button label="Submit" loading />);
      expect(screen.queryByText("Submit")).toBeNull();
      expect(screen.getByTestId("button-spinner")).toBeOnTheScreen();
    });

    it("is disabled when loading", async () => {
      await renderWithProviders(<Button label="Submit" loading testID="btn" />);
      expect(screen.getByTestId("btn").props.accessibilityState.disabled).toBe(
        true,
      );
    });
  });

  describe("disabled", () => {
    it("is disabled when disabled prop is true", async () => {
      await renderWithProviders(
        <Button label="Submit" disabled testID="btn" />,
      );
      expect(screen.getByTestId("btn").props.accessibilityState.disabled).toBe(
        true,
      );
    });

    it("does not fire onPress when disabled", async () => {
      const user = userEvent.setup();
      const onPress = jest.fn();
      await renderWithProviders(
        <Button label="Submit" disabled onPress={onPress} testID="btn" />,
      );
      await user.press(screen.getByTestId("btn"));
      expect(onPress).not.toHaveBeenCalled();
    });
  });

  describe("onPress", () => {
    it("fires onPress when enabled", async () => {
      const user = userEvent.setup();
      const onPress = jest.fn();
      await renderWithProviders(
        <Button label="Submit" onPress={onPress} testID="btn" />,
      );
      await user.press(screen.getByTestId("btn"));
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });
});
