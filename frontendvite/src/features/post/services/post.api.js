import api from "../../../helpers/api"



export const FetchMyPost = async (id) => {
    const res = await api.get(`/post/user/${id}`)
    return res.data
}
export const FetchSinglePost = async (id) => {
    const res = await api.get(`/post/${id}`)
    return res.data
}
export const DeletedMyPost = async (id) => {
    const res = await api.delete(`/post/${id}`)
    return res.data
}
export const FetchAllPost = async (page, limit) => {
    const res = await api.get(`/post?page=${page}&limit=${limit}`)
    return res.data
}

export const CreateMyPost = async (data) => {
    const res = await api.post(`/post/create`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
    })
    return res.data
}


export const LikePost = async (id) => {
    const res = await api.post(`/post/like/${id}`)
    return res.data
}
export const UnLikePost = async (id) => {
    const res = await api.post(`/post/unlike/${id}`)
    return res.data
}

export const followerfollowing = async () => {
    const res = await api.get(`/post/followerfollowing`)
    return res.data
}