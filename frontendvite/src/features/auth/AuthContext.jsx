import { useEffect, useState } from "react";
import { AuthContext } from "./auth.context";
import { Get_me } from "./services/auth.api";


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false);

    const FetchUser = async () => {
        try {
            const res = await Get_me();
            setUser(res.user)
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        async function loaduser() {
            await FetchUser()

        }
        loaduser()
    }, [])


    return (
        <AuthContext.Provider value={{ loading, user, setLoading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;