import api from "@/helpers/api"



export const FollowUser = async (id) => {
    const res = await api.post(`/user/follow/${id}`)
    return res.data
}
export const UnFollowUser = async (id) => {
    const res = await api.post(`/user/unfollow/${id}`)
    return res.data
}
export const FollowReqAccRej = async (id, data) => {
    const res = await api.patch(`/follower/request/accrej/${id}`, data)
    return res.data
}