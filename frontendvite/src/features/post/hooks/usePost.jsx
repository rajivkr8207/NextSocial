import { useContext } from "react"
import { PostContext } from "../post.context"

const usePost = () => {
    const context = useContext(PostContext)

    const { loading,  posts } = context

    return { loading, posts }
}

export default usePost