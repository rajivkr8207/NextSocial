import { useState } from "react"
import { PostContext } from "./post.context"
import { FetchAllPost } from "./services/post.api"

const PostProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [posts, setposts] = useState([])

    
    return (
        <PostContext.Provider value={{  loading, setLoading, setposts, posts }}>
            {children}
        </PostContext.Provider>
    )
}

export default PostProvider