"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FetchAllPost, LikePost } from "@/lib/posts";
import PostCard from "@/components/post/PostCard.jsx";

export default function FeedPage() {

  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    const res = await FetchAllPost()
    // console.log(res);
    setPosts(res.posts);
  }

  async function handleLike(postId) {
    await LikePost(postId)
  }

  useEffect(() => {
    async function fetch() {
        await fetchPosts();
    }
    fetch()
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">

      <div className="max-w-lg mx-auto py-6">

        {posts.map(post => (
          <PostCard
            key={post._id}
            post={post}
            onLike={handleLike}
          />
        ))}

      </div>

    </div>
  );
}
