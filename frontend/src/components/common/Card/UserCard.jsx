"use client";

import { FollowUser, UnFollowUser } from "@/lib/follower";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function UserCard({ user, refreshUsers }) {
  const router = useRouter()
  async function Follow(id) {
    try {
      if (user.status === "accept") {
        const res = await UnFollowUser(id);
        toast.success(res.message);
        await refreshUsers();
        return;
      }
      if (!user.status) {
        await FollowUser(id);
        toast.success("Follow request sent");
        await refreshUsers();
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-sm">

      <div className="flex items-center gap-4 ">

        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          <img
            src={user?.profile_image}
            alt="profile"
            className="object-cover"
          />
        </div>

        <div>
          <p className="font-semibold">{user?.fullname}</p>
          <p className="text-sm text-gray-500">@{user?.username}</p>
        </div>

      </div>

      <button
        onClick={() => Follow(user._id)}
        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition
    ${user.status === "accept" || user.status === "pending"
            ? "border border-gray-400 text-gray-700 dark:text-gray-300"
            : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
      >
        {user.status === "pending" && "Requested"}
        {user.status === "accept" && "Following"}
        {(user.status === null || user.status === "reject") && "Follow"}
      </button>


    </div>
  );
}
