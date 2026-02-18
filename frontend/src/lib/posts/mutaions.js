import api from "@/helpers/api"



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
