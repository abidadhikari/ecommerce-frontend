import { Outlet, Navigate } from "react-router-dom";
import IsAuthenticated from "../AuthTools/isAuthenticated";
import IsAdmin from "../AuthTools/isAdmin";

function PrivateRoutes() {
  return IsAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;

export const PrivateAdminRoutes = () => {
  return IsAuthenticated() && IsAdmin() ? (
    <Outlet />
  ) : (
    <Navigate to="/admin-login" />
  );
};
