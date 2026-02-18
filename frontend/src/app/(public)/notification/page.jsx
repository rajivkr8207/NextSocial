"use client";

import FollowRequestCard from "@/components/notification/FollowRequestCard";
import { FetchFollowerRequest, FollowReqAccRej } from "@/lib/follower";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function Notification() {
    const [follRequest, setFollRequest] = useState(null)


    async function FollowerRequest() {
        try {
            const res = await FetchFollowerRequest()
            setFollRequest(res.follower);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        async function loadfollowerReq() {
            await FollowerRequest()
        }
        loadfollowerReq()
    }, [])

    async function handleAccept(id) {
        try {
            const res = await FollowReqAccRej(id, { status: "accept" })
            toast.success(res.message)
            setFollRequest(null)

            await FetchFollowerRequest()
        } catch (error) {
            console.error(error);

        }
    }

    async function handleDecline(id) {
        try {
            const res = await FollowReqAccRej(id, { status: "reject" })
            toast.success(res.message)
            await FetchFollowerRequest()
        } catch (error) {
            console.error(error);

        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex justify-center">

            <div className="w-full max-w-xl bg-white dark:bg-neutral-900 shadow-md mt-10 rounded-lg">

                <h2 className="text-xl font-semibold p-4 border-b dark:border-neutral-800">
                    Follow Requests
                </h2>

                {follRequest?.map((user, idx) => (
                    <FollowRequestCard
                        key={idx}
                        user={user}
                        onAccept={handleAccept}
                        onDecline={handleDecline}
                    />
                ))}

            </div>

        </div>
    );
}
