import axios from "axios";
import { AccountResponse, SignupPayload, SignupResponse } from "../types";
import { fetchAccount, signup } from "./api";
import { authService } from "./authService";

// axios-mock-adapter could be used instead
jest.mock("axios", () => {
  const mockAxios = {
    create: jest.fn(),
    interceptors: { request: { use: jest.fn() } },
    post: jest.fn(),
    get: jest.fn(),
  };
  mockAxios.create.mockReturnValue(mockAxios);
  return { ...mockAxios, default: mockAxios };
});

jest.mock("./authService", () => ({
  authService: {
    getToken: jest.fn(),
  },
}));

const mockApi = axios.create();

describe("api", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("signup", () => {
    it("POSTs to /signup with the payload and returns data", async () => {
      const payload: SignupPayload = {
        name: "John",
        email: "john@example.com",
        password: "password123",
      };
      const responseData: SignupResponse = {
        message: "ok",
        nextStep: "verify",
        basicAuthCredentials: { username: "john", password: "pass" },
      };
      (mockApi.post as jest.Mock).mockResolvedValueOnce({ data: responseData });

      const result = await signup(payload);

      expect(mockApi.post).toHaveBeenCalledWith("/signup", payload);
      expect(result).toEqual(responseData);
    });

    it("throws when the request fails", async () => {
      (mockApi.post as jest.Mock).mockRejectedValueOnce(
        new Error("Network Error"),
      );
      await expect(
        signup({ name: "x", email: "x@x.com", password: "password" }),
      ).rejects.toThrow("Network Error");
    });
  });

  describe("fetchAccount", () => {
    it("GETs /interview/account and returns data", async () => {
      const responseData: AccountResponse = {
        accountNumber: "123",
        accountType: "savings",
        availableBalance: 1000,
        currency: "USD",
        dateAdded: "2024-01-01",
        transactions: [],
      };
      (mockApi.get as jest.Mock).mockResolvedValueOnce({ data: responseData });

      const result = await fetchAccount();

      expect(mockApi.get).toHaveBeenCalledWith("/interview/account");
      expect(result).toEqual(responseData);
    });

    it("throws when the request fails", async () => {
      (mockApi.get as jest.Mock).mockRejectedValueOnce(
        new Error("Unauthorized"),
      );
      await expect(fetchAccount()).rejects.toThrow("Unauthorized");
    });
  });

  describe("auth interceptor", () => {
    it("attaches Authorization header when token exists", () => {
      (authService.getToken as jest.Mock).mockReturnValue("dXNlcjpwYXNz");

      const interceptor = (axios.interceptors.request.use as jest.Mock).mock
        .calls[0]?.[0];
      if (!interceptor) return;

      const config = { headers: {} } as any;
      const result = interceptor(config);

      expect(result.headers.Authorization).toBe("Basic dXNlcjpwYXNz");
    });

    it("does not attach Authorization header when no token", () => {
      (authService.getToken as jest.Mock).mockReturnValue(null);

      const interceptor = (axios.interceptors.request.use as jest.Mock).mock
        .calls[0]?.[0];
      if (!interceptor) return;

      const config = { headers: {} } as any;
      const result = interceptor(config);

      expect(result.headers.Authorization).toBeUndefined();
    });
  });
});
