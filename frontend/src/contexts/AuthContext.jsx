import { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    const checkAuth = async () => {
        try {
            await AuthService.auth()
            setAuth(true);
        } catch(error) {
            setAuth(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkAuth();
    }, [window.location.pathname])

    return (
        <AuthContext.Provider value={{auth, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}