/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import { useTeamsContext } from "@/hooks/useTeamsContext";
import type { Platform, UserConfig, FeatureFlags, User } from "@/types";

interface AppContextType {
  platform: Platform;
  isInTeams: boolean;
  isWeb: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isMobile: boolean;
  user: User | null;
  isAuthenticated: boolean;
  theme: "light" | "dark" | "default";
  setTheme: (theme: "light" | "dark" | "default") => void;
  userConfig: UserConfig | null;
  setUserConfig: (config: UserConfig) => void;
  featureFlags: FeatureFlags;
  setFeatureFlags: (flags: FeatureFlags) => void;
  isFeatureEnabled: (feature: string) => boolean;
  isInitialized: boolean;
  logout: () => void;
  refreshUserData: () => Promise<void>;
}

const AppContext = createContext<AppContextType>({
  platform: "web",
  isInTeams: false,
  isWeb: true,
  isIOS: false,
  isAndroid: false,
  isMobile: false,
  user: null,
  isAuthenticated: false,
  theme: "default",
  setTheme: () => {},
  userConfig: null,
  setUserConfig: () => {},
  featureFlags: {},
  setFeatureFlags: () => {},
  isFeatureEnabled: () => false,
  isInitialized: false,
  logout: () => {},
  refreshUserData: async () => {},
});

function detectPlatform(): Platform {
  console.log("detectPlatform()");
  if (
    window.location.href.includes("teams.microsoft.com") ||
    (window as any).microsoftTeams
  ) {
    return "teams";
  }

  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  if (isIOS) return "ios";

  const isAndroid = /Android/.test(navigator.userAgent);
  if (isAndroid) return "android";

  return "web";
}

function getInitialUser(): User | null {
  console.log("getInitialUser()");
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    try {
      return JSON.parse(savedUser);
    } catch (e) {
      console.error("localStorage user error:", e);
      return null;
    }
  }
  return null;
}

function getInitialTheme(): "light" | "dark" | "default" {
  console.log("getInitialTheme()");
  const savedTheme = localStorage.getItem("theme");
  if (
    savedTheme === "light" ||
    savedTheme === "dark" ||
    savedTheme === "default"
  ) {
    return savedTheme;
  }
  return "default";
}

export function AppProvider({ children }: { children: ReactNode }) {
  console.log("AppProvider render");

  const teamsContext = useTeamsContext();

  const platform = useMemo(() => {
    const p = detectPlatform();
    console.log("platform:", p);
    return p;
  }, []);

  const [manualTheme, setManualTheme] = useState<"light" | "dark" | "default">(
    () => getInitialTheme(),
  );

  const [localUser, setLocalUser] = useState<User | null>(() =>
    getInitialUser(),
  );

  const [userConfig, setUserConfigState] = useState<UserConfig | null>(null);
  const [featureFlags, setFeatureFlagsState] = useState<FeatureFlags>({});

  const isInitialized = useMemo(() => {
    console.log("isInitialized:", teamsContext.isInitialized);
    return teamsContext.isInitialized;
  }, [teamsContext.isInitialized]);

  const theme = useMemo(() => {
    console.log("calculating theme");
    if (teamsContext.isInitialized && teamsContext.isInTeams) {
      if (teamsContext.theme === "dark") return "dark";
      if (teamsContext.theme === "default") return "light";
      return teamsContext.theme as "light" | "dark" | "default";
    }
    return manualTheme;
  }, [
    teamsContext.isInitialized,
    teamsContext.isInTeams,
    teamsContext.theme,
    manualTheme,
  ]);

  const user = useMemo(() => {
    console.log("calculating user");
    if (
      teamsContext.isInitialized &&
      teamsContext.isInTeams &&
      teamsContext.user
    ) {
      return {
        id: teamsContext.user.id,
        name: teamsContext.user.displayName,
        email: teamsContext.user.userPrincipalName,
      };
    }
    return localUser;
  }, [
    teamsContext.isInitialized,
    teamsContext.isInTeams,
    teamsContext.user,
    localUser,
  ]);

  useEffect(() => {
    console.log("theme effect:", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleSetTheme = useCallback(
    (newTheme: "light" | "dark" | "default") => {
      console.log("setTheme:", newTheme);
      setManualTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    },
    [],
  );

  const setUserConfig = useCallback((config: UserConfig) => {
    console.log("setUserConfig:", config);
    setUserConfigState(config);
    localStorage.setItem("userConfig", JSON.stringify(config));
  }, []);

  const setFeatureFlags = useCallback((flags: FeatureFlags) => {
    console.log("setFeatureFlags:", flags);
    setFeatureFlagsState(flags);
    localStorage.setItem("featureFlags", JSON.stringify(flags));
  }, []);

  const isFeatureEnabled = useCallback(
    (feature: string): boolean => {
      const enabled = featureFlags[feature] === true;
      console.log("isFeatureEnabled:", feature, enabled);
      return enabled;
    },
    [featureFlags],
  );

  const logout = useCallback(() => {
    console.log("logout()");
    setLocalUser(null);
    setUserConfigState(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userConfig");
    window.location.href = "/login";
  }, []);

  const refreshUserData = useCallback(async () => {
    if (!user?.id) return;

    try {
      // fetch aquí
    } catch (error) {
      console.error("Error:", error);
    }
  }, [user?.id]);

  const derivedValues = useMemo(() => {
    const v = {
      isInTeams: platform === "teams",
      isWeb: platform === "web",
      isIOS: platform === "ios",
      isAndroid: platform === "android",
      isMobile: platform === "ios" || platform === "android",
      isAuthenticated: teamsContext.isInTeams
        ? teamsContext.isInTeams && !!teamsContext.user
        : !!user,
    };
    console.log("derivedValues:", v);
    return v;
  }, [platform, teamsContext.isInTeams, teamsContext.user, user]);

  const value: AppContextType = useMemo(() => {
    const v = {
      platform,
      ...derivedValues,
      user,
      theme,
      setTheme: handleSetTheme,
      userConfig,
      setUserConfig,
      featureFlags,
      setFeatureFlags,
      isFeatureEnabled,
      isInitialized,
      logout,
      refreshUserData,
    };
    console.log("context value:", v);
    return v;
  }, [
    platform,
    derivedValues,
    user,
    theme,
    handleSetTheme,
    userConfig,
    setUserConfig,
    featureFlags,
    setFeatureFlags,
    isFeatureEnabled,
    isInitialized,
    logout,
    refreshUserData,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
