//get
import api from "@/helpers/api"

export const FetchAllUser  = async ()=>{
    const res = await api.get('/user/alluser')
    return res.data
}

export const FetchUserById  = async (id)=>{
    const res = await api.get(`/user/${id}`)
    return res.data
}