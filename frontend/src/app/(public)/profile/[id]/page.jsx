"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FollowUser, UnFollowUser } from "@/lib/follower";
import { toast } from "react-toastify";
import { FetchUserById } from "@/lib/user";
import { useAuth } from "@/context/AuthContext";

export default function PublicProfilePage() {

  const { id } = useParams();
  const [userdata, setUserdata] = useState(null);
  const [follower, setFollower] = useState(null);
  const [following, setfollowing] = useState(null);
  const [post, setpost] = useState(null);
  const [status, setStatus] = useState(false);

  const [loading, setLoading] = useState(true);
  const { user } = useAuth()
  async function fetchUserProfile() {
    try {
      const res = await FetchUserById(id)
      setUserdata(res.User);
      setFollower(res.follower)
      setfollowing(res.following)
      setpost(res.post)
      handleStatus()
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleStatus = () => {
    console.log(following);
    // const filter = following?.filter((item) => {
    //   return item.followee == user?.id
    // })
    // console.log(filter);
  }

  //   async function handleFollow() {
  //     try {
  //       if (userdata.status === "accept") {
  //         const res = await UnFollowUser(userdata._id);
  //         toast.success(res.message);
  //       } else {
  //         await FollowUser(userdata._id);
  //         toast.success("Follow request sent");
  //       }

  //       fetchUserProfile(); // refresh profile

  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!userdata) return <p className="text-center mt-10">User not found</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex justify-center py-10">

      <div className="w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-8">

        {/* Header */}
        <div className="flex items-center gap-8">

          {/* Profile Image */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={userdata.profile_image}
              alt="profile"
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-2">

            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold">
                {userdata.id}
              </h2>

              <button
                // onClick={handleFollow}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium
                ${status
                    ? "border border-gray-400"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
              >
                {!status && "Follow"}
              </button>

            </div>

            <p className="font-medium">{userdata.fullname}</p>
            <p className="text-gray-600 dark:text-gray-400">{userdata.bio}</p>

            <div className="flex gap-6 mt-2 text-sm">
              <p><b>{post.length}</b> posts</p>
              <p><b>{follower.length}</b> followers</p>
              <p><b>{following.length}</b> following</p>
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
              <Image
                src={post.imgUrl}
                alt="post"
                fill
                className="object-cover"
              />
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
