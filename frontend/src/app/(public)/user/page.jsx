"use client";

import { Suspense, useEffect, useState } from "react";
import { FetchUserById } from "@/lib/user";
import { useSearchParams } from "next/navigation";

export default function PublicProfilePage() {
  const params = useSearchParams();
  const id = params.get("id");
  const [userdata, setUserdata] = useState(null);
  const [follower, setFollower] = useState(null);
  const [following, setfollowing] = useState(null);
  const [post, setpost] = useState(null);

  const [loading, setLoading] = useState(true);
  async function fetchUserProfile() {
    try {
      const res = await FetchUserById(id)
      setUserdata(res.User);
      setFollower(res.follower)
      setfollowing(res.following)
      setpost(res.post)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }



  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!userdata) return <p className="text-center mt-10">User not found</p>;

  return (
     <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>

    <div className="min-h-screen bg-gray-50 dark:bg-black flex justify-center py-10">

      <div className="w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-8">

        {/* Header */}
        <div className="flex items-center gap-8">

          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200">
            <img
              src={userdata?.profile_image}
              alt="profile"
              className="object-cover"
            />
          </div>

          <div className="flex-1 space-y-2">
            <p className="font-medium">{userdata?.fullname}</p>
            <p className="text-gray-600 dark:text-gray-400">{userdata?.bio}</p>

            <div className="flex gap-6 mt-2 text-sm">
              <p><b>{post?.length}</b> posts</p>
              <p><b>{follower?.length}</b> followers</p>
              <p><b>{following?.length}</b> following</p>
            </div>

          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-200 dark:border-neutral-800" />

        {/* User Posts */}
        <div className="grid grid-cols-3 gap-3">

          {post?.map((post) => (
            <div
              key={post._id}
              className="relative aspect-square overflow-hidden bg-gray-200"
            >
              <img
                src={post?.imgUrl}
                alt="post"
                className="object-cover"
              />
            </div>
          ))}

        </div>

      </div>

    </div>
     </Suspense>

  );
}
