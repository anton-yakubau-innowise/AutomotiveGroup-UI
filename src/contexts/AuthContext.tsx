import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import { userApiClient } from "../api/apiClient";
import { User } from "../types/user";

interface DecodedToken {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  sub: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (userName: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("jwt_token");
      if (token) {
        try {
          const decodedToken: DecodedToken = jwtDecode(token);
          const userId =
            decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ];

          userApiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;
          const response = await userApiClient.get(`/users/${userId}`);
          setState({ user: response.data, isLoading: false, error: null });
        } catch (error) {
          console.error("Session check failed, token is invalid.", error);
          localStorage.removeItem("jwt_token");
          setState({ user: null, isLoading: false, error: null });
        }
      } else {
        setState({ user: null, isLoading: false, error: null });
      }
    };
    checkSession();
  }, []);

  // NEW: A function to explicitly clear the error state.
  const clearError = () => {
    setState((prev) => ({ ...prev, error: null }));
  };

  const login = async (loginIdentifier: string, password: string) => {
    clearError(); // Clear previous errors on a new attempt
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await userApiClient.post("/auth/login", {
        loginIdentifier,
        password,
      });
      const { token, user } = response.data;

      localStorage.setItem("jwt_token", token);
      userApiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      setState({ user, isLoading: false, error: null });
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data || "Invalid credentials";
      setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }));
      // Re-throw the error so the form component can catch it and show a toast
      throw new Error(errorMessage);
    }
  };

  const register = async (registerData: any) => {
    clearError(); // Clear previous errors on a new attempt
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await userApiClient.post("/auth/register", registerData);
      const { token, user } = response.data;

      localStorage.setItem("jwt_token", token);
      userApiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      setState({ user, isLoading: false, error: null });
    } catch (error: any) {
      console.error("Registration error:", error);
      const errorMessage =
        error.response?.data || "An unknown registration error occurred.";
      setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }));
      // Re-throw the error so the form component can catch it
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt_token");
    delete userApiClient.defaults.headers.common["Authorization"];
    setState({ user: null, isLoading: false, error: null });
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!state.user) return;
    try {
      const response = await userApiClient.put(
        `/users/${state.user.id}`,
        updates
      );
      setState((prev) => ({ ...prev, user: response.data, isLoading: false }));
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, register, logout, updateProfile, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
