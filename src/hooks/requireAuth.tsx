import { Outlet, Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import useAuth from "./useAuth";

const RequireAuth = () => {
    const { user, isLoading } = useAuth();
    
    if (isLoading) return <Loading />

    if (!user) return <Navigate to='/login' replace />;

    return <Outlet />;
}

export default RequireAuth
