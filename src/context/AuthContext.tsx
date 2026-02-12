import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react"

interface User {
  idusers: number;
  name: string;
  email: string;
  habilitation: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Pour éviter les clignotements au refresh

  useEffect(() => {
    // Au chargement de la page, on vérifie la session
    const verifySession = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          method: "GET",
          credentials: "include", // INDISPENSABLE pour envoyer/recevoir des cookies
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Session expirée ou inexistante");
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = (userData: User) => setUser(userData);
  
 
const logout = async () => {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include", // Crucial pour que le serveur puisse supprimer le cookie
    });
  } catch (error) {
    console.error("Erreur lors de la déconnexion serveur:", error);
  } finally {
    // Dans tous les cas, on vide l'utilisateur localement
    setUser(null);
  }
};

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children} {/* On attend la fin du check avant d'afficher l'app */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
