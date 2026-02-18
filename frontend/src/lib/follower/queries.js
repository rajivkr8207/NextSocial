//get
import api from "@/helpers/api"

export const FetchMyFollower  = async ()=>{
    const res = await api.get('/follower/myfollower')
    return res.data
}


export const FetchFollowerRequest  = async ()=>{
    const res = await api.get('/follower/request')
    return res.data
}