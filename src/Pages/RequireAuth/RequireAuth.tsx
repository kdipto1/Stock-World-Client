import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { authService } from "../../services/authService";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const [authed, setAuthed] = useState<boolean>(authService.isAuthenticated());

  // Re-check on mount, route changes, custom events, and storage changes
  useEffect(() => {
    const check = () => setAuthed(authService.isAuthenticated());
    check();
    const onAuthChanged = () => check();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "accessToken" || e.key === "email") check();
    };
    window.addEventListener("auth-changed", onAuthChanged as EventListener);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("auth-changed", onAuthChanged as EventListener);
      window.removeEventListener("storage", onStorage);
    };
    // location in deps forces re-check on route changes
  }, [location]);

  if (!authed) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
