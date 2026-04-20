import { authService, signup, userService } from "@/src/services";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SignupPayload } from "../types";

type AppState = {
  isAuth: boolean;
  isOnboarded: boolean;
  setOnboardingSeen: () => Promise<void>;
  signUp: (payload: SignupPayload) => Promise<void>;
  signOut: () => Promise<void>;
  signOutToOnboarding: () => Promise<void>;
  isLoading: boolean;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Init function should handle erros, but for simplicity we just set the states to false in case of any errors. In a real app, you might want to show an error message or retry the initialization.
  const init = useCallback(async () => {
    const [onboardedResult, authResult] = await Promise.allSettled([
      userService.getOnboarded(),
      authService.load(),
    ]);
    setIsOnboarded(
      onboardedResult.status === "fulfilled" ? onboardedResult.value : false,
    );
    setIsAuth(authResult.status === "fulfilled" ? !!authResult.value : false);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const setOnboardingSeen = useCallback(async () => {
    await userService.setOnboarded(true);
    setIsOnboarded(true);
  }, []);

  const signUp = useCallback(async (payload: SignupPayload) => {
    const data = await signup(payload);
    await authService.setCredentials(data.basicAuthCredentials);
    setIsAuth(true);
  }, []);

  const signOut = useCallback(async () => {
    await authService.clear();
    setIsAuth(false);
  }, []);

  // For testing purposes only
  const signOutToOnboarding = useCallback(async () => {
    await userService.clearOnboarding();
    setIsOnboarded(false);
    await signOut();
  }, [signOut]);

  const value = useMemo(
    () => ({
      isOnboarded,
      isAuth,
      signUp,
      signOut,
      setOnboardingSeen,
      signOutToOnboarding,
      isLoading,
    }),
    [
      isAuth,
      signUp,
      isOnboarded,
      signOut,
      setOnboardingSeen,
      signOutToOnboarding,
      isLoading,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
  return ctx;
}
