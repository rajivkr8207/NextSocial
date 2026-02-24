import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { Get_me, loginApi, LogoutApi, RegisterApi } from "../services/auth.api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"

export const useAuth = () => {
    const context = useContext(AuthContext)
    const navigate = useNavigate()

    const { loading, user,authenticated, setLoading, setUser,setAuthenticated } = context

    const handleLogin = async (username, password) => {
        setLoading(true);
        try {
            const res = await loginApi(username, password);
            toast.success(res.message)
            setUser(res.user)
            setAuthenticated(true)
            navigate('/')
        } catch {
            toast.error('invalid credentail')
        } finally {
            setLoading(false)
        }
    };

    

    const handleRegister = async (username, email, fullname, bio, password) => {
        setLoading(true);
        try {
            const res = await RegisterApi(username, email, fullname, bio, password);
            toast.success(res.message)
        } catch {
            toast.error('invalid credentail')
        } finally {
            setLoading(false);
        }

    };

    const fetchUser = async () => {
        try {
            const res = await Get_me();
            return res
        } catch (error) {
            console.error(error);
        }
    }

     const handlelogout = async () => {
            const res = await LogoutApi()
            toast.success(res.message);
            navigate('/login');
            setAuthenticated(false)
        }
    return { handleLogin, handleRegister,authenticated, user, loading, fetchUser, handlelogout }
}
