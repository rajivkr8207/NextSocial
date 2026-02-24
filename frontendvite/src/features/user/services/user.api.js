import api from "../../../helpers/api"

export const FetchAllUser = async () => {
    const res = await api.get('/user/alluser')
    return res.data
}

export const FetchUserById = async (id) => {
    const res = await api.get(`/user/${id}`)
    return res.data
}

export const FetchMyFollower = async () => {
    const res = await api.get('/follower/myfollower')
    return res.data
}


export const FetchFollowerRequest = async () => {
    const res = await api.get('/follower/request')
    return res.data
}


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