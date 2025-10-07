import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type MatterUser = {
  name: string;
  email: string;
  avatarUrl?: string;
};

export type LoginPayload = {
  account: string;
  password: string;
};

interface AuthContextValue {
  user: MatterUser | null;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const deriveNameFromAccount = (account: string): string => {
  if (!account.trim()) {
    return "Guest";
  }

  const cleaned = account.trim();

  if (!cleaned.includes("@")) {
    return cleaned
      .split(/[._\s-]+/)
      .filter(Boolean)
      .map((segment) =>
        segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase(),
      )
      .join(" ");
  }

  const [localPart] = cleaned.split("@");
  if (!localPart) {
    return "Guest";
  }

  return localPart
    .split(/[._\s-]+/)
    .filter(Boolean)
    .map((segment) =>
      segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase(),
    )
    .join(" ");
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<MatterUser | null>(null);

  const login = useCallback((payload: LoginPayload) => {
    const friendlyName = deriveNameFromAccount(payload.account);

    setUser({
      name: friendlyName || "Guest",
      email: payload.account,
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [login, logout, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
