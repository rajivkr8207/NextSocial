import api from "../../../helpers/api"


export async function RegisterApi(username, email, fullname, bio, password) {
    const res = await api.post('/auth/register', {
        username, email, fullname, bio, password
    })
    return res.data
}

export async function loginApi(username, password) {
    const res = await api.post('/auth/login', {
        username, password
    })
    return res.data
}


export async function Get_me() {
    const res = await api.get('/auth/profile')
    return res.data
}

export async function LogoutApi() {
    const res = await api.post('/auth/logout')
    return res.data
}

