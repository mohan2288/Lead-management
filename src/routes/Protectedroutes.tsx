import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import type { ReactNode } from "react";

interface protectedRoute {
  children: ReactNode;
}

const ProtectedRoute = ({ children }:protectedRoute) => {

  const token = Cookies.get(window.CONFIG.TOKEN_KEY);

  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 