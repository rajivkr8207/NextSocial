import api from "../../../helpers/api"


export async function Setmessage(message) {
    const res = await api.post('/chating/create', { message: message })
    return res.data
}


export async function Getmessage() {
    const res = await api.get('/chating/message')
    return res.data
}