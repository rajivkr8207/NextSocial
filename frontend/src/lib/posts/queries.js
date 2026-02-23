//get
import api from "@/helpers/api"

export const FetchMyPost  = async ()=>{
    const res = await api.get('/post/mypost')
    return res.data
}

export const FetchAllPost  = async ()=>{
    const res = await api.get('/post')
    return res.data
}