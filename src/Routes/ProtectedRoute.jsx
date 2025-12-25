import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const ProtectedRoute = () => {
  const { user } = useUser(); // current logged-in user
  const location = useLocation();

  if (!user) {
    // user is not logged in
    return (
      <Navigate
        to="/auth"
        state={{ from: location, showLoginBanner: true }}
        replace
      />
    );
  }

  return <Outlet />; // render the child route
};

export default ProtectedRoute;
