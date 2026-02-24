import { useEffect, useState } from "react";
import { AuthContext } from "./auth.context";
import { Get_me } from "./services/auth.api";


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(true);
    const FetchUser = async () => {
        try {
            const res = await Get_me();
            setUser(res.user)
        } catch (err) {
            setAuthenticated(false);
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
        <AuthContext.Provider value={{ loading, user, setLoading, authenticated, setUser ,setAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;