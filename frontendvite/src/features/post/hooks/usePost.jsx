import { useContext } from "react"
import { PostContext } from "../post.context"
import { FetchAllPost } from "../services/post.api"

export const usePost = () => {
    const context = useContext(PostContext)

    const { loading, setLoading, setposts, posts } = context


    async function GetAllpost() {
        try {
            const res = await FetchAllPost()
            setposts(res.posts)
        } catch (error) {
            console.error(error);
        }

    }

    return { GetAllpost, loading, setLoading, setposts, posts }
}
