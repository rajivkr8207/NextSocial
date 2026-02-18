"use client";
import { AuthUser, LoginUser, LogoutUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter()


    useEffect(() => {
        checkLogin();
    }, []);



    const handlelogin = async (data) => {
        try {
            const res = await LoginUser(data);
            toast.success(res.message);
            router.push("/");
            checkLogin()
        } catch (error) {
            toast.error('invalid credintial')
            console.error(error);
        }
    }

    const handleLogout = async () => {
        try {
            const res = await LogoutUser();
            toast.success(res.message);
            router.push('/login')
            checkLogin()
        } catch (error) {
            console.error(error);
        }
    }

    async function checkLogin() {
        try {
            const res = await AuthUser()
            setUser(res.user);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, loading, handlelogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
