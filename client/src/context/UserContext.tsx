import axios from "axios";
import {
  createContext,
  useContext,
  type ReactNode,
  useState,
  useEffect,
} from "react";

interface UserContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3310";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchUser(token);
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  const login = async (token: string) => {
    localStorage.setItem("token", token);
    await fetchUser(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
