import api from "../../../helpers/api"



export const CreateBookmark = async (postid) => {
    const res = await api.post(`/bookmark/create/${postid}`)
    return res.data
}

export const DeleteBookmark = async (postid) => {
    const res = await api.delete(`/bookmark/delete/${postid}`)
    return res.data
}

export const GetMyBookmark = async () => {
    const res = await api.get(`/bookmark`)
    return res.data
}