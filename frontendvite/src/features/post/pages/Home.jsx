import { useState } from "react";
import "../styles/Home.scss";
import { FaHeart, FaRegHeart, FaComment, FaPaperPlane } from "react-icons/fa";

const Home = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            username: "rajiv_dev",
            userImg: "https://i.pravatar.cc/150?img=3",
            postImg: "https://images.unsplash.com/photo-1768572415689-f3365d88eb80?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            caption: "Building Instagram Clone with React 🔥",
            liked: false,
        },
        {
            id: 2,
            username: "john_doe",
            userImg: "https://i.pravatar.cc/150?img=5",
            postImg: "https://images.unsplash.com/photo-1769174900856-d7e38598786a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            caption: "Late night coding 💻",
            liked: false,
        },
    ]);

    const toggleLike = (id) => {
        const updated = posts.map((post) =>
            post.id === id ? { ...post, liked: !post.liked } : post
        );
        setPosts(updated);
    };

    return (
        <div className="home-page">
            {posts.map((post) => (
                <div className="post-card" key={post.id}>

                    {/* Header */}
                    <div className="post-header">
                        <img src={post.userImg} alt="user" />
                        <span>{post.username}</span>
                    </div>

                    {/* Image */}
                    <div className="post-image">
                        <img src={post.postImg} alt="post" />
                    </div>

                    {/* Actions */}
                    <div className="post-actions">
                        {post.liked ? (
                            <FaHeart
                                className="liked"
                                onClick={() => toggleLike(post.id)}
                            />
                        ) : (
                            <FaRegHeart onClick={() => toggleLike(post.id)} />
                        )}
                        <FaComment />
                        <FaPaperPlane />
                    </div>

                    {/* Caption */}
                    <div className="post-caption">
                        <b>{post.username}</b> {post.caption}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;