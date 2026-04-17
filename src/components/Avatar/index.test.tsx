import { renderWithProviders } from "@/src/utils";
import { screen } from "@testing-library/react-native";
import { Avatar } from "./index";

describe("Avatar", () => {
  it("renders the first letter of the name uppercased", async () => {
    await renderWithProviders(<Avatar name="test" />);
    expect(screen.getByText("T")).toBeTruthy();
  });

  it("uppercases already-uppercase first letter", async () => {
    await renderWithProviders(<Avatar name="Alice" />);
    expect(screen.getByText("A")).toBeTruthy();
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

  it("sets font size proportional to size", async () => {
    await renderWithProviders(<Avatar name="test" size={100} />);
    const text = screen.getByTestId("avatar-text");
    expect(text.props.style).toMatchObject({ fontSize: 40 });
  });

  // it("matches snapshot", async () => {
  //   const { toJSON } = await renderWithProviders(<Avatar name="denys" />);
  //   expect(toJSON()).toMatchSnapshot();
  // });
});
