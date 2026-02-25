import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import "../styles/PostDetails.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FetchSinglePost } from "../services/post.api";

const PostDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        async function loadPost() {
            const res = await FetchSinglePost(id);
            setPost(res.post);
        }
        loadPost();
    }, [id]);

    if (!post) return <p>Loading...</p>;

    return (
        <div className="post-details">

            <div className="post-card">

                {/* Header */}
                <div className="header" onClick={()=>navigate(`/profile/${post.user._id}`)}>
                    <img src={post.user.profile_image} />
                    <span>{post.user.username}</span>
                </div>

                {/* Image */}
                <img className="post-img" src={post.imgUrl} />

                {/* Actions */}
                <div className="actions">
                    {post.isLiked
                        ? <FaHeart className="liked" />
                        : <FaRegHeart />
                    }
                    <span>{post.likesCount} likes</span>
                </div>

                {/* Caption */}
                <p>
                    <b>{post.user.username}</b> {post.caption}
                </p>

            </div>

        </div>
    );
};

export default PostDetails;