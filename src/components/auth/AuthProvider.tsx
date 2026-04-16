import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { logInUser } from "../auth/api/loginUser";
import { UserRole } from "../events/events.type";
import { CreateUpdateUser } from "../users/schema";
import { UserAPIResponse } from "../users/users.type";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  role: UserRole;
  password?: string,
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  login: (data: CreateUpdateUser) => Promise<UserAPIResponse>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const storedUser = localStorage.getItem("user");
const initialUser = storedUser ? JSON.parse(storedUser) : null;

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const login = async (data: CreateUpdateUser): Promise<UserAPIResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const { token, user } = await logInUser(data);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoading(false)
      setUser(user)
      return user;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Login failed"));
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const contextValue = useMemo<AuthContextType>(() => ({
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
  }), [user, isLoading, error, isAuthenticated, login]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for consuming auth context
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
