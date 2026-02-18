//get
import api from "@/helpers/api"

export const FetchPost  = async ()=>{
    const res = await api.get('/post/mypost')
    return res.data
}