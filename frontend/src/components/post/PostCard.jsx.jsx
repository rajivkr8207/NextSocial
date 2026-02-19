"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { UnLikePost } from "@/lib/posts";

export default function PostCard({ post, onLike }) {
  const router = useRouter()
  const [liked, setLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);

  async function handleLike(id) {
    if (liked) {
      await UnLikePost(id)
      setLiked(!liked);
      setLikesCount(prev => liked ? prev - 1 : prev + 1);
      return
    }
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);

    // call parent handler
    await onLike(id);
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow mb-6">

      {/* Header */}
      <div className="flex items-center gap-3 p-4" >

        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <img
            src={post.user.profile_image}
            alt="user"
            className="object-cover"
          />
        </div>

        <div>
          <p className="font-semibold">{post.user.username}</p>
          <p className="text-sm text-gray-500">
            {post.user.fullname}
          </p>
        </div>

      </div>

      {/* Post Image */}
      <div className="relative w-full aspect-square bg-gray-200">
        <Image
          src={post.imgUrl}
          alt="post"
          fill
          className="object-cover"
        />
      </div>

      {/* Actions */}
      <div className="p-4 space-y-2">

        <button
          onClick={() => handleLike(post._id)}
          className="flex items-center gap-2"
        >
          <Heart
            size={22}
            className={
              liked
                ? "fill-red-500 text-red-500"
                : "text-gray-700 dark:text-gray-300"
            }
          />
          <span>{likesCount}</span>
        </button>

        <p>
          <span className="font-semibold mr-1">
            {post.user.username}
          </span>
          {post.caption}
        </p>

      </div>

    </div>
  );
}
