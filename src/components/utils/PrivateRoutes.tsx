import { Outlet, Navigate } from "react-router-dom";
import IsAuthenticated from "../AuthTools/isAuthenticated";

function PrivateRoutes() {
  return IsAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
