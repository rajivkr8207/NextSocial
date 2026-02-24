import { useContext } from "react"
import { PostContext } from "../post.context"
import { FetchAllPost } from "../services/post.api"
import { useEffect } from "react"

export const usePost = () => {
    const context = useContext(PostContext)

    const { loading, setLoading, setposts, posts } = context

    async function GetAllpost() {
        try {
            const res = await FetchAllPost()
            console.log(res);
            setposts(res.posts)
        } catch (error) {
            console.error(error);
        }

    }
    useEffect(() => {
        async function loadPosts() {
            await GetAllpost()
        }

        loadPosts();
    }, [])
    return { GetAllpost, loading, setLoading, setposts, posts }
}
