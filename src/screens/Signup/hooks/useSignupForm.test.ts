import { act, renderHook } from "@testing-library/react-native";
import { useSignupForm } from "./useSignupForm";

const mockSignUp = jest.fn();

jest.mock("@/src/context/AppContext", () => ({
  useAppContext: () => ({ signUp: mockSignUp }),
}));

const validForm = {
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
};

function fillForm(
  result: { current: ReturnType<typeof useSignupForm> },
  overrides: Partial<typeof validForm & { agreedToTos: boolean }> = {},
) {
  const form = { ...validForm, agreedToTos: true, ...overrides };
  act(() => {
    result.current.setName(form.name);
    result.current.setEmail(form.email);
    result.current.setPassword(form.password);
    result.current.setAgreedToTos(form.agreedToTos ?? true);
  });
}

describe("useSignupForm", () => {
  beforeEach(() => {
    mockSignUp.mockReset();
  });

  describe("initial state", () => {
    it("starts with empty fields and no errors", () => {
      const { result } = renderHook(() => useSignupForm());
      expect(result.current.name).toBe("");
      expect(result.current.email).toBe("");
      expect(result.current.password).toBe("");
      expect(result.current.agreedToTos).toBe(false);
      expect(result.current.errors).toEqual({});
      expect(result.current.apiError).toBeNull();
      expect(result.current.loading).toBe(false);
    });
  });

  describe("validation", () => {
    it("sets error when name is empty", async () => {
      const { result } = renderHook(() => useSignupForm());
      fillForm(result, { name: "" });
      await act(() => result.current.handleSubmit());
      expect(result.current.errors.name).toBe("Name is required");
    });

    it("sets error when name is whitespace only", async () => {
      const { result } = renderHook(() => useSignupForm());
      fillForm(result, { name: "   " });
      await act(() => result.current.handleSubmit());
      expect(result.current.errors.name).toBe("Name is required");
    });

    it("sets error when email is invalid", async () => {
      const { result } = renderHook(() => useSignupForm());
      fillForm(result, { email: "not-an-email" });
      await act(() => result.current.handleSubmit());
      expect(result.current.errors.email).toBe("Enter a valid email");
    });

    it("sets error when password is shorter than 8 characters", async () => {
      const { result } = renderHook(() => useSignupForm());
      fillForm(result, { password: "short" });
      await act(() => result.current.handleSubmit());
      expect(result.current.errors.password).toBe(
        "Password must be at least 8 characters",
      );
    });

    it("sets error when ToS not agreed", async () => {
      const { result } = renderHook(() => useSignupForm());
      fillForm(result, { agreedToTos: false });
      await act(() => result.current.handleSubmit());
      expect(result.current.errors.tos).toBe("You must agree to the terms");
    });

    it("sets all errors at once when all fields are invalid", async () => {
      const { result } = renderHook(() => useSignupForm());
      await act(() => result.current.handleSubmit());
      expect(result.current.errors.name).toBeDefined();
      expect(result.current.errors.email).toBeDefined();
      expect(result.current.errors.password).toBeDefined();
      expect(result.current.errors.tos).toBeDefined();
    });

    it("does not call signUp when validation fails", async () => {
      const { result } = renderHook(() => useSignupForm());
      await act(() => result.current.handleSubmit());
      expect(mockSignUp).not.toHaveBeenCalled();
    });

    it("clears errors on a subsequent valid submit", async () => {
      const { result } = renderHook(() => useSignupForm());
      mockSignUp.mockResolvedValueOnce(undefined);
      await act(() => result.current.handleSubmit());
      expect(result.current.errors.name).toBeDefined();
      fillForm(result);
      await act(() => result.current.handleSubmit());
      expect(result.current.errors).toEqual({});
    });
  });

  describe("successful submit", () => {
    it("calls signUp with correct payload", async () => {
      mockSignUp.mockResolvedValueOnce(undefined);
      const { result } = renderHook(() => useSignupForm());
      fillForm(result);
      await act(() => result.current.handleSubmit());
      expect(mockSignUp).toHaveBeenCalledWith({
        name: validForm.name,
        email: validForm.email,
        password: validForm.password,
      });
    });

    it("resets loading to false after success", async () => {
      mockSignUp.mockResolvedValueOnce(undefined);
      const { result } = renderHook(() => useSignupForm());
      fillForm(result);
      await act(() => result.current.handleSubmit());
      expect(result.current.loading).toBe(false);
    });

    it("has no apiError after success", async () => {
      mockSignUp.mockResolvedValueOnce(undefined);
      const { result } = renderHook(() => useSignupForm());
      fillForm(result);
      await act(() => result.current.handleSubmit());
      expect(result.current.apiError).toBeNull();
    });
  });

  describe("failed submit", () => {
    it("sets apiError on network error", async () => {
      mockSignUp.mockRejectedValueOnce(
        new Error("Network error. Please try again."),
      );
      const { result } = renderHook(() => useSignupForm());
      fillForm(result);
      await act(() => result.current.handleSubmit());
      expect(result.current.apiError).toBe("Network error. Please try again.");
    });

    it("sets axios error message on axios error", async () => {
      const axiosError = Object.assign(new Error("Unauthorized"), {
        isAxiosError: true,
      });
      mockSignUp.mockRejectedValueOnce(axiosError);
      const { result } = renderHook(() => useSignupForm());
      fillForm(result);
      await act(() => result.current.handleSubmit());
      expect(result.current.apiError).toBe("Unauthorized");
    });

    it("resets loading to false after failure", async () => {
      mockSignUp.mockRejectedValueOnce(new Error("fail"));
      const { result } = renderHook(() => useSignupForm());
      fillForm(result);
      await act(() => result.current.handleSubmit());
      expect(result.current.loading).toBe(false);
    });

    it("clears apiError on next valid submit", async () => {
      mockSignUp.mockRejectedValueOnce(new Error("fail"));
      const { result } = renderHook(() => useSignupForm());
      fillForm(result);
      await act(() => result.current.handleSubmit());
      expect(result.current.apiError).not.toBeNull();

      mockSignUp.mockResolvedValueOnce(undefined);
      await act(() => result.current.handleSubmit());
      expect(result.current.apiError).toBeNull();
    });
  });
});
