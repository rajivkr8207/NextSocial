import { useState } from "react";
import "../styles/Explore.scss";
import UseUser from "../hooks/UseUser";
import UserCard from "../components/UserCard";

const Explore = () => {

  const { followers, following, other, FetchUser } = UseUser();
  const [activeTab, setActiveTab] = useState("Followers");

  const getUsersByTab = () => {
    if (activeTab === "Followers") return followers;
    if (activeTab === "Following") return following;
    if (activeTab === "Other") return other;
    return [];
  };
  console.log(getUsersByTab());
  return (
    <div className="explore-page">

      <h2>People</h2>

      {/* Tabs */}
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

      {/* Users Grid */}
      <div className="user-grid">
        {getUsersByTab().map((item) => (
          <UserCard
            key={item._id || item.followee?._id || item.follower?._id}
            user={item}
            FetchUser={FetchUser}
            activeTab={activeTab}
          />
        ))}
      </div>

    </div>
  );
};

export default Explore;