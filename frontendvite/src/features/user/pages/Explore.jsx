import { useEffect } from "react";
import "../styles/Explore.scss";
import UseUser from "../hooks/UseUser";
import { FetchAllUser, FetchMyFollower, UnFollowUser } from "../services/user.api";
import UserCard from "../components/UserCard";

const Explore = () => {
  const { allUser, setallUser } = UseUser()

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
      setallUser(merged);

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
    <div className="explore-page">
      <h2>Explore People</h2>

      <div className="user-grid">
        {allUser?.map((user) => (
          <UserCard user={user} key={user._id } FetchUser={FetchUser} />
        ))}
      </div>
    </div>
  );
};

export default Explore;