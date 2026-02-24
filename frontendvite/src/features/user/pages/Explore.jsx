import { useEffect, useState } from "react";
import "../styles/Explore.scss";
import UseUser from "../hooks/UseUser";
import {
  FetchAllUser,
  FetchMyFollower,
} from "../services/user.api";
import UserCard from "../components/UserCard";

const Explore = () => {
  const { allUser, setallUser } = UseUser();

  const [activeTab, setActiveTab] = useState("Followers");

  async function FetchUser() {
    try {
      const userdata = await FetchAllUser();
      const followingdata = await FetchMyFollower();

      const followingMap = new Map(
        followingdata.follower.map((f) => [f.followee, f.status]),
      );

      const merged = userdata.allUser.map((u) => ({
        ...u,
        isFollowing: followingMap.has(u._id),
        status: followingMap.get(u._id) || null,
      }));
      setallUser(merged);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function loaduser() {
      await FetchUser();
    }
    loaduser();
  }, []);

  return (
    <div className="explore-page">
      <h2>Explore People (work in progress)</h2>
      <div className="explore-tabs">
        <button
          className={activeTab === "Followers" ? "active" : ""}
          onClick={() => setActiveTab("Followers")}
        >
          Followers
        </button>

        <button
          className={activeTab === "Following" ? "active" : ""}
          onClick={() => setActiveTab("Following")}
        >
          Following
        </button>

        <button
          className={activeTab === "Other" ? "active" : ""}
          onClick={() => setActiveTab("Other")}
        >
          Other
        </button>
      </div>
      <div className="user-grid">
        {allUser.map((user) => (
          <UserCard user={user} key={user._id} FetchUser={FetchUser} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
