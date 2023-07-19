import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";
import axios from "axios";

const AuthContext = createContext()

const AuthProvider= ({children}) =>{
    const [isConn, setIsConn] = useState(false)
    const saveCon = () =>{
        sessionStorage.setItem("con", isConn)
    }
    const getCon = () =>{
        return sessionStorage.getItem("con")
    }
    useEffect(() => {
        setIsConn(getCon())
    }, [])

    
    return(
        <AuthContext.Provider value={{isConn, saveCon, getCon}}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider