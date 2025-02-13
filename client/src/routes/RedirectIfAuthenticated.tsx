import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

const RedirectIfAuthenticated = () => {
  const { isAuthenticated } = useUser();

  return isAuthenticated ? <Navigate to="/profile" replace /> : <Outlet />;
};

export default RedirectIfAuthenticated;
