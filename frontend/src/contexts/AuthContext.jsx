import { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    const nav = useNavigate();

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

    const authLogin = async (username, password) => {
        const response = await AuthService.login(username, password);
        console.log(response);
        if (response.success) {
          nav(`/profile/${username}`)
        } else {
          alert('Invalid credentials');
        }
      }

    useEffect(() => {
        checkAuth();
    }, [window.location.pathname])

    return (
        <AuthContext.Provider value={{auth, loading, authLogin}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}