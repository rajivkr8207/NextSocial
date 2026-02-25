import { useContext, useEffect, useRef, useState } from "react";
import { PostContext } from "../post.context";
import { FetchAllPost } from "../services/post.api";

export const usePost = () => {
    const context = useContext(PostContext);
    const { setposts, posts } = context;

    const pageRef = useRef(1);
    const [hasMore, setHasMore] = useState(true);

    const loadingRef = useRef(false);
    const firstLoad = useRef(true);

    const GetAllpost = async () => {
        if (loadingRef.current || !hasMore) return;

        try {
            loadingRef.current = true;
            const res = await FetchAllPost(pageRef.current, 5);
            pageRef.current += 1;
            setposts(prev => [...prev, ...res.posts]);
            setHasMore(res.hasMore);
        } catch (error) {
            console.error(error);
        } finally {
            loadingRef.current = false;
        }
    };

    useEffect(() => {
        if (!firstLoad.current) return;
        firstLoad.current = false;
        GetAllpost();
    }, []);


    return { GetAllpost, posts, hasMore, setposts };
};