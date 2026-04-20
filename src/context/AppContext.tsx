import { userService } from "@/src/services";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AppState = {
  isOnboarded: boolean;
  setOnboardingSeen: () => Promise<void>;
  isLoading: boolean;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const init = useCallback(async () => {
    const onboardedResult = await userService.getOnboarded();
    setIsOnboarded(onboardedResult);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const setOnboardingSeen = useCallback(async () => {
    await userService.setOnboarded(true);
    setIsOnboarded(true);
  }, []);

  const value = useMemo(
    () => ({
      isOnboarded,
      setOnboardingSeen,
      isLoading,
    }),
    [isOnboarded, setOnboardingSeen, isLoading],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
  return ctx;
}
