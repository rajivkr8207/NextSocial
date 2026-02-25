import api from "../../../helpers/api"

export const FetchAllUser = async (page = 1, limit = 5) => {
    const res = await api.get(`/user/alluser?page=${page}&limit=${limit}`)
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


export const SearchUsers = async (query) => {
    const res = await api.get(`/user/search?query=${query}`)
    return res.data
};

export const FetchFollowerFollowingOther = async (page = 1, limit = 5) => {
    const res = await api.get(`/post/followerfollowing?page=${page}&limit=${limit}`)
    return res.data
};

export const FetchMyfollowers = async (page = 1, limit = 5) => {
    const res = await api.get(`/post/followers?page=${page}&limit=${limit}`)
    return res.data
};

export const FetchMyfolloing = async (page = 1, limit = 5) => {
    const res = await api.get(`/post/following?page=${page}&limit=${limit}`)
    return res.data
};

export const Fetchotheruser = async (page = 1, limit = 5) => {
    const res = await api.get(`/post/others?page=${page}&limit=${limit}`)
    return res.data
};


export const FetchReviews = async () => {
    const res = await api.get(`/rating/all`)
    return res.data
};

export const CreateReview = async (data) => {
    const res = await api.post(`/rating/create`, data)
    return res.data
};