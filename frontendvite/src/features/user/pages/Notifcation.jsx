import React, { useEffect, useState } from "react";
import "../styles/Notification.scss";
import { FetchFollowerRequest, FollowReqAccRej } from "../services/user.api";
import { toast } from "react-toastify";

const Notifications = () => {
    const [follRequest, setFollRequest] = useState(null)


    async function FollowerRequest() {
        setFollRequest(null)
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

            await FollowerRequest()
        } catch (error) {
            console.error(error);

        }
    }

    async function handleDecline(id) {
        try {
            const res = await FollowReqAccRej(id, { status: "reject" })
            toast.success(res.message)
            await FollowerRequest()
        } catch (error) {
            console.error(error);

        }
    }
    return (
        <div className="notification-page">
            <h2>Follow Requests</h2>

            {follRequest && follRequest.length === 0 && (
                <p className="empty">No new follow requests</p>
            )}

            {follRequest && follRequest.map((user) => (
                <div className="request-card" key={user?.id}>
                    <div className="left">
                        <img src={user?.follower?.profile_image} alt="user" />
                        <div>
                            <h4>{user?.follower?.username}</h4>
                            <p>{user?.follower?.fullname}</p>
                        </div>
                    </div>

                    <div className="actions">
                        <button className="accept" onClick={() => handleAccept(user?._id)}>
                            Accept
                        </button>
                        <button className="decline" onClick={() => handleDecline(user?._id)}>
                            Decline
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Notifications;