import { toast } from "react-toastify";
import { FollowUser, UnFollowUser } from "../services/user.api";
import "../styles/UserCard.scss"
import { useNavigate } from "react-router";

const UserCard = ({ user, FetchUser }) => {
  const navigate = useNavigate()

  const toggleFollow = async (id) => {
    try {
      if (user.status === "accept") {
        const res = await UnFollowUser(id);
        toast.success(res.message);
        await FetchUser();
        return;
      }
      if (!user.status) {
        await FollowUser(id);
        toast.success("Follow request sent");
        await FetchUser();
      }
    } catch (error) {
      console.error(error);
    }
    console.log(id);
  };

  return (
    <>
      <div className="user-card" key={user._id} >
        <div onClick={()=>navigate(`/profile/${user._id}`)}>

        <img src={user?.profile_image} alt="user" />

        <h4>{user?.username}</h4>
        <p>{user?.fullname}</p>
        </div>

        <button
          onClick={() => toggleFollow(user._id)}
          className={`${user.status === "accept" || user.status === "pending"
            ? "unfollow"
            : "follow"
            }`}
        >
          {user.status === "pending" && "Requested"}
          {user.status === "accept" && "Following"}
          {(user.status === null || user.status === "reject") && "Follow"}
        </button>

      </div>
    </>
  )
}

export default UserCard