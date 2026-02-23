"use client";
import { FetchProfile } from "@/lib/auth";
import { FetchMyPost } from "@/lib/posts";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [post, setPost] = useState(null)
    async function GetProfile() {
        try {
            const res = await FetchProfile()
            setUser(res.user)
        } catch (error) {
            console.error(error);
        }
    }
    async function GetPost() {
        try {
            const res = await FetchMyPost()
            setPost(res.mypost)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        async function loadProfile() {
            await GetProfile()
            await GetPost()
        }
        loadProfile()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex justify-center py-10">

            <div className="w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-8">

                {/* Header */}
                <div className="flex items-center gap-8">

                    {/* Profile Image */}
                    <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-200">
                        <img
                            src={user?.profile_image}
                            alt="profile"
                            className="h-full w-full object-center"
                        />
                    </div>

                    {/* Info */}
                    <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-semibold">
                                {user?.username}
                            </h2>

                            <button className="px-4 py-1.5 border rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
                                Edit Profile
                            </button>
                        </div>

                        <p className="font-medium">{user?.fullname}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {user?.email}
                        </p>
                        <p>{user?.bio}</p>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-8 border-gray-200 dark:border-neutral-800" />
                <div className="grid grid-cols-3 gap-4">
                    {post?.map((item, idx) => (
                        <div
                            key={idx}
                            className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-200"
                        >
                            <img
                                src={item.imgUrl}
                                alt="post image"
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
                {post?.length === 0 && (
                    <div className="text-center text-gray-500">
                        No posts yet
                    </div>
                )}

            </div>

        </div>
    );
}
