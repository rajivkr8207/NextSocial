import { createContext, useState } from "react";
import { loginApi, RegisterApi } from "./services/auth.api";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false);
    const handleLogin = async (username, password) => {
        setLoading(true);
        try {
            const res = await loginApi(username, password);
            toast.success(res.message)
            setUser(res.user)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (username, email, fullname, bio, password) => {
        setLoading(true);
        try {
            const res = await RegisterApi(username, email, fullname, bio, password);
            toast.success(res.message)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ handleLogin, handleRegister, loading, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;