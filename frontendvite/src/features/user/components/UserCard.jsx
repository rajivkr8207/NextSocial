import { toast } from "react-toastify";
import { FollowUser, UnFollowUser } from "../services/user.api";
import "../styles/UserCard.scss";
import { useNavigate } from "react-router";

const UserCard = ({ user, FetchUser, activeTab }) => {
  const navigate = useNavigate();

  const profileUser =
    activeTab === "Followers"
      ? user.follower
      : activeTab === "Following"
        ? user.followee
        : user;

  const userId = profileUser?._id;

  const toggleFollow = async () => {
    try {
      if (user.status === "accept") {
        const res = await UnFollowUser(userId);
        toast.success(res.message || "Unfollowed");
      } else {
        if (user.status === "pending") {
          toast.info("Follow request already sent");
          return;
        }
        if (user.status === "reject") {
          toast.info("Follow request already rejected");
          return;
        }
        await FollowUser(userId);
        toast.success("Follow request sent");
      }

      await FetchUser();
    } catch (error) {
      console.error(error);
      // toast.error("Something went wrong");
    }
  };

  return (
    <div className="user-card">

      {/* USER INFO */}
      <div
        className="user-info"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <img
          src={profileUser?.profile_image}
          alt="user"
        />

        <div>
          <h4>{profileUser?.username?.slice(0, 12)}</h4>
          <p>{profileUser?.fullname}</p>
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={toggleFollow}
        className={
          user.status === "accept" || user.status === "pending"
            ? "unfollow"
            : "follow"
        }
      >
        {user.status === "pending" && "Requested"}
        {user.status === "accept" && "Following"}
        {user.status === "reject" && "Rejected"}
        {!user.status && "Follow"}
      </button>

    </div>
  );
};

export default UserCard;