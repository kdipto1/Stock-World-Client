import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../firebase.init";

const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();
  const loginAlert = "You need to login to visit this page";
  if (loading) {
    return loading;
  }
  if (!user)
    return (
      <Navigate
        alert={loginAlert}
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  return children;
};

export default RequireAuth;
