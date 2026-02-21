import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { loginApi, RegisterApi } from "../services/auth.api"
import { toast } from "react-toastify"

export const useAuth = () => {
    const context = useContext(AuthContext)

    const { loading, user, setLoading, setUser } = context

    const handleLogin = async (username, password) => {
        setLoading(true);
        const res = await loginApi(username, password);
        toast.success(res.message)
        setUser(res.user)
        setLoading(false);
    };

    const handleRegister = async (username, email, fullname, bio, password) => {
        setLoading(true);
        const res = await RegisterApi(username, email, fullname, bio, password);
        toast.success(res.message)
        setLoading(false);
    };

    return {handleLogin, handleRegister, user, loading}
}
