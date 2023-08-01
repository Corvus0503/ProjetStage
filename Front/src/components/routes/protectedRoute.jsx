import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../pages/login/authProvider";

export const ProtectedRoute = ({children, perm, user}) => {
    const { token } = useAuth();
  
    // Check if the user is authenticated
    if (!token && !user[0].TYPE_AG.includes(perm)) {
      console.log("permission"+user[0].TYPE_AG.includes(perm))
      
      return <Navigate to="/" replace/>;
      
    }
  
    // If authenticated, render the child routes
    return children ? children :  <Outlet />;
  };