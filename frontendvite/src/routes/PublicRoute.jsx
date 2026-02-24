// routes/PublicRoute.jsx
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";

const PublicRoute = () => {
    const { authenticated } = useAuth();

    return authenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;