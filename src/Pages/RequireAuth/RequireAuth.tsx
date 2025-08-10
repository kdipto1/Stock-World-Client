import { Navigate, useLocation } from "react-router-dom";
import { authService } from "../../services/authService";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
