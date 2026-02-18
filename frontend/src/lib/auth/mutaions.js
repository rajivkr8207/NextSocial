import api from "@/helpers/api"



export const RegisterUser = async (data) => {
    const res = await api.post('/auth/register', data)
    return res.data
}

export const LoginUser = async (data) => {
    const res = await api.post('/auth/login', data)
    return res.data
}

export const LogoutUser = async () => {
    const res = await api.post('/auth/logout')
    return res.data
}

