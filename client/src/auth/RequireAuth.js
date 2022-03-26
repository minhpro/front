import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import React from "react";

const RequireAuth = ({ allowedRoles }) => {
  const auth = useSelector((state) => state.reduxAuth.auth);
  const location = useLocation();
  console.log(auth);

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.username ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
