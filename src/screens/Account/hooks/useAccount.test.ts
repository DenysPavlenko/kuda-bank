import { AccountResponse } from "@/src/types";
import { renderHook, waitFor } from "@testing-library/react-native";
import { useAccount } from "./useAccount";

const mockFetchAccount = jest.fn();

jest.mock("@/src/services", () => ({
  fetchAccount: (...args: unknown[]) => mockFetchAccount(...args),
}));

const accountData: AccountResponse = {
  accountNumber: "1234567890",
  accountType: "savings",
  availableBalance: 5000,
  currency: "USD",
  dateAdded: "2024-01-01",
  transactions: [],
};

beforeEach(() => {
  mockFetchAccount.mockReset();
});

describe("useAccount", () => {
  it("starts in loading state", () => {
    mockFetchAccount.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useAccount());
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("sets data and stops loading on success", async () => {
    mockFetchAccount.mockResolvedValueOnce(accountData);
    const { result } = renderHook(() => useAccount());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(accountData);
    expect(result.current.error).toBeNull();
  });

  it("sets generic error message on non-axios error", async () => {
    mockFetchAccount.mockRejectedValueOnce(new Error("something went wrong"));
    const { result } = renderHook(() => useAccount());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Failed to load account");
    expect(result.current.data).toBeNull();
  });

  it("sets axios error message on axios error", async () => {
    const axiosError = Object.assign(new Error("Unauthorized"), {
      isAxiosError: true,
    });
    mockFetchAccount.mockRejectedValueOnce(axiosError);
    const { result } = renderHook(() => useAccount());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Unauthorized");
    expect(result.current.data).toBeNull();
  });
});
