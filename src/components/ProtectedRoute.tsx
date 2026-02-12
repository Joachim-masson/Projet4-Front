import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole: string;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user } = useAuth();

  // Si l'utilisateur n'est pas connecté ou n'a pas le bon rôle
  if (!user || user.habilitation !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}