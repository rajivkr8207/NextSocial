import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false);

    return (
        <AuthContext.Provider value={{  loading, user, setLoading,setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;