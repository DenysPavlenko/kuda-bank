import { renderWithProviders } from "@/src/utils/test-utils";
import { screen } from "@testing-library/react-native";
import { AccountScreen } from "./index";

const mockFetchAccount = jest.fn();

jest.mock("@/src/services", () => ({
  fetchAccount: (...args: unknown[]) => mockFetchAccount(...args),
}));

jest.mock("@/src/context/AppContext", () => ({
  useAppContext: () => ({
    signOut: jest.fn(),
    signOutToOnboarding: jest.fn(),
  }),
}));

jest.mock("@/assets/images/logo.png", () => "logo");

const accountData = {
  accountNumber: "1234567890",
  accountType: "Savings",
  availableBalance: 5000,
  currency: "USD",
  dateAdded: "2024-01-01",
  transactions: [
    { name: "Alice", bank: "GTB", time: "10:00", amount: 200 },
    { name: "Bob", bank: "UBA", time: "11:00", amount: -100 },
  ],
};

beforeEach(() => {
  mockFetchAccount.mockReset();
});

describe("AccountScreen", () => {
  it("shows a loading indicator while fetching", async () => {
    mockFetchAccount.mockReturnValue(new Promise(() => {}));
    await renderWithProviders(<AccountScreen />);
    expect(screen.getByTestId("account-spinner")).toBeOnTheScreen();
  });

  it("shows account data after successful fetch", async () => {
    mockFetchAccount.mockResolvedValueOnce(accountData);
    await renderWithProviders(<AccountScreen />);

    expect(await screen.findByText("1234567890")).toBeOnTheScreen();
    expect(await screen.findByText("Savings")).toBeOnTheScreen();
  });

  it("shows error message when fetch fails", async () => {
    mockFetchAccount.mockRejectedValueOnce(new Error("Network down"));
    await renderWithProviders(<AccountScreen />);

    expect(await screen.findByText("Failed to load account")).toBeOnTheScreen();
  });

  it("shows axios error message when axios error occurs", async () => {
    const axiosError = Object.assign(new Error("Unauthorized"), {
      isAxiosError: true,
    });
    mockFetchAccount.mockRejectedValueOnce(axiosError);
    await renderWithProviders(<AccountScreen />);

    expect(await screen.findByText("Unauthorized")).toBeOnTheScreen();
  });

  it("shows transactions after successful fetch", async () => {
    mockFetchAccount.mockResolvedValueOnce(accountData);
    await renderWithProviders(<AccountScreen />);

    expect(await screen.findByText("Alice")).toBeOnTheScreen();
    expect(await screen.findByText("Bob")).toBeOnTheScreen();
  });
});
