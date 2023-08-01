import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../pages/login/authProvider";

export const ProtectedRoute = ({children}) => {
    const { token } = useAuth();
  
    // Check if the user is authenticated
    // if (!token) {
    //   return <Navigate to="/" replace/>;
    // }  
    // If authenticated, render the child routes
    return children ? children :  <Outlet />;
  };