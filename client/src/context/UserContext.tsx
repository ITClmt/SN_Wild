import {
  createContext,
  useContext,
  type ReactNode,
  useState,
  useEffect,
} from "react";
import axios from "axios";

interface UserContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (userData: { id: number; username: string }) => void;
  logout: () => void;
  setUser: (userData: UserType) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null as UserType | null);
  const baseUrl = import.meta.env.VITE_API_URL;

  // Vérifie l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/users/me`, {
          withCredentials: true,
        });
        setUser(data);
      } catch (error) {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const login = (userData: { id: number; username: string }) => {
    setUser(userData as UserType);
  };

  const logout = async () => {
    try {
      await axios.post(`${baseUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        setUser,
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
