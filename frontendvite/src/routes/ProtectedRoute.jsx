// routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";

const ProtectedRoute = () => {
    const { authenticated } = useAuth();
    return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;