import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
})




export const FetchMyPost = async () => {
    const res = await api.get('/post/mypost')
    return res.data
}

export const FetchAllPost = async () => {
    const res = await api.get('/post')
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