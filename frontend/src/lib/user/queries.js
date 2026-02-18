//get
import api from "@/helpers/api"

export const FetchAllUser  = async ()=>{
    const res = await api.get('/user/alluser')
    return res.data
}