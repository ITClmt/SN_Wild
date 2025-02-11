import axios from "axios";
import {
  createContext,
  useContext,
  type ReactNode,
  useState,
  useEffect,
} from "react";

interface User {
  id: string;
  email: string;
  username: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
  login: (token: string) => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Vérifie le token au chargement de l'application
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3310/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data.user))
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  }, []);

  // Fonction pour connecter l'utilisateur
  const login = (token: string) => {
    localStorage.setItem("token", token);
    axios
      .get("http://localhost:3310/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUser(response.data.user));
  };

  // Fonction pour déconnecter l'utilisateur
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    setUser,
    isAuthenticated: !!user,
    logout,
    login,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
