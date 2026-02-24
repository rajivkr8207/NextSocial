import React from 'react'
import { FaComment, FaHeart, FaPaperPlane, FaRegHeart } from 'react-icons/fa'
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import "../styles/PostCard.scss"
import { usePost } from '../hooks/usePost'
import { LikePost, UnLikePost } from '../services/post.api'
import { useState } from 'react';
import { CreateBookmark, DeleteBookmark } from '../services/bookmark.api';
const PostCard = ({ post }) => {

    const { posts, setposts } = usePost()
    const [likecount, setlikecount] = useState(post?.likesCount)
    const toggleLike = async (id) => {
        if (post.isLiked) {
            await UnLikePost(id)
            setlikecount(likecount - 1)
        } else {
            await LikePost(id)
            setlikecount(likecount + 1)
        }
        const updated = posts.map((post) =>
            post._id === id ? { ...post, isLiked: !post.isLiked } : post
        );
        setposts(updated);
    };


    const handleBookmark = async (postid) => {
        if (post.isBookmarked) {
            await DeleteBookmark(postid)
        } else {
            await CreateBookmark(postid)
        }
        const updated = posts.map((post) =>
            post._id === postid ? { ...post, isBookmarked: !post.isBookmarked } : post
        );
        setposts(updated);
    }
    return (
        <>
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
                    <p>
                        {post.isLiked ? (
                            <FaHeart
                                className="liked"
                                onClick={() => toggleLike(post._id)}
                            />
                        ) : (
                            <FaRegHeart
                                onClick={() => toggleLike(post._id)}
                            />
                        )}
                        <span>{likecount} likes</span>
                    </p>
                    <FaComment />
                    <p onClick={() => handleBookmark(post._id)}>
                        {post.isBookmarked ? (
                            <FaBookmark />
                        ) : (
                            <CiBookmark />
                        )}
                    </p>
                </div>


                {/* Caption */}
                <div className="post-caption">
                    <b>{post?.user?.username}</b> {post?.caption}
                </div>
            </div>
        </>
    )
}

export default PostCard