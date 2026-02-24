import { useEffect } from "react";
import "../styles/Home.scss";
import { FaHeart, FaRegHeart, FaComment, FaPaperPlane } from "react-icons/fa";
import { usePost } from "../hooks/usePost";
import { LikePost, UnLikePost } from "../services/post.api";

const Home = () => {
    const { GetAllpost, posts, setposts } = usePost()


    useEffect(() => {
        async function loadPosts() {
            await GetAllpost()
        }

        loadPosts();
    }, [])


    const toggleLike = async (id) => {
        const post = posts.find((post) => post._id === id);
        if (post.isLiked) {
            await UnLikePost(id)
        } else {
            await LikePost(id)
        }
        const updated = posts.map((post) =>
            post._id === id ? { ...post, isLiked: !post.isLiked } : post
        );
        setposts(updated);
    };

    return (
        <div className="home-page">
            {posts?.map((post) => (
                <div className="post-card" key={post._id}>

                    {/* Header */}
                    <div className="post-header">
                        <img src={post?.user?.profile_image} alt="user" />
                        <span>{post?.user?.username}</span>
                    </div>

                    {/* Image */}
                    <div className="post-image">
                        <img src={post?.imgUrl} alt="post" />
                    </div>

                    {/* Actions */}
                    <div className="post-actions">
                        {post.isLiked ? (
                            <FaHeart
                                className="liked"
                                onClick={() => toggleLike(post._id)}
                            />
                        ) : (
                            <FaRegHeart onClick={() => toggleLike(post._id)} />
                        )}
                        <FaComment />
                        <FaPaperPlane />
                    </div>

                    {/* Caption */}
                    <div className="post-caption">
                        <b>{post?.user?.username}</b> {post?.caption}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;