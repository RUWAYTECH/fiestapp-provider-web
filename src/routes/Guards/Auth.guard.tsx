import { paths } from "@/core/constants";
import Auth from "@/core/services/auth/auth";
import { Navigate } from "react-router-dom";
import Main from "../loggedIn/Main";

interface AuthGuardProps {
    children?: any;
    redirectTo?: string;
}
function AuthGuard({ children, redirectTo = paths.LOGIN }: AuthGuardProps) {
    if (!Auth.isAuthenticated()) {
        return <Navigate to={redirectTo} replace />
    }
    return children ? children : <Main />;
}

export default AuthGuard;