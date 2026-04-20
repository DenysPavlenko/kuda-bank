import { renderWithProviders } from "@/src/utils/test-utils";
import { screen } from "@testing-library/react-native";
import { Avatar } from "./index";

describe("Avatar", () => {
  it("renders the first letter of the name uppercased", async () => {
    await renderWithProviders(<Avatar name="test" />);
    expect(screen.getByText("T")).toBeOnTheScreen();
  });

  it("uppercases already-uppercase first letter", async () => {
    await renderWithProviders(<Avatar name="Alice" />);
    expect(screen.getByText("A")).toBeOnTheScreen();
  });

  it("applies custom size", async () => {
    await renderWithProviders(<Avatar name="test" size={48} />);
    const view = screen.getByTestId("avatar");
    expect(view.props.style).toMatchObject({
      width: 48,
      height: 48,
      borderRadius: 24,
    });
  });
});
