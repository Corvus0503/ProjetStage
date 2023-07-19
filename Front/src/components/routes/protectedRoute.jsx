import { Navigate, Outlet } from "react-router-dom";
//import { useAuth } from "../pages/login/authProvider";

export const ProtectedRoute = ({isConn, redirectPath = '/login', children}) => {
    //const {token} = useAuth()

    if (!isConn){
        return <Navigate to={redirectPath} replace/>
    }
        
    return <Outlet/>


}