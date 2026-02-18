'use client'
import UserCard from '@/components/common/Card/UserCard'
import { FetchMyFollower } from '@/lib/follower'
import { FetchAllUser } from '@/lib/user/queries'
import React, { useEffect, useState } from 'react'

const Explore = () => {
    const [User, setUser] = useState(null)

    async function FetchUser() {
        try {
            const userdata = await FetchAllUser();
            const followingdata = await FetchMyFollower();


            const followingMap = new Map(
                followingdata.follower.map(f => [
                    f.followee,
                    f.status
                ])
            );

            const merged = userdata.allUser.map(u => ({
                ...u,
                isFollowing: followingMap.has(u._id),
                status: followingMap.get(u._id) || null
            }));


            setUser(merged);

        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        async function loaduser() {
            await FetchUser()
        }
        loaduser()
    }, [])

    return (
        <>
            <div className='lg:w-6/12 md:w-8/12 w-12/12 mx-auto flex flex-col gap-6'>

                {User?.map((item, idx) => {
                    return (
                        <UserCard
                            key={item._id}
                            user={item}
                            refreshUsers={FetchUser}
                        />

                    )
                })}
            </div>
        </>
    )
}

export default Explore