import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
})

export async function RegisterApi(username, email, fullname, bio, password) {
    try {
        const res = await api.post('/api/auth/register', {
            username, email, fullname, bio, password
        })
        return res.data
    } catch (error) {
        console.error(error);
    }
}

export async function loginApi(username, password) {
    try {
        const res = await api.post('/api/auth/login', {
            username, password
        })
        return res.data
    } catch (error) {
        console.error(error);

    }
}


export async function Get_me() {
    try {
        const res = await api.get('/api/auth/profile')
        return res.data
    } catch (error) {
        console.error(error);
    }
}
