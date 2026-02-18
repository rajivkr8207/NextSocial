//get
import api from "@/helpers/api"

export const FetchProfile  = async ()=>{
    const res = await api.get('/auth/profile')
    return res.data
}

export const AuthUser = async () => {
    const res = await api.get('/auth/me')
    return res.data
}