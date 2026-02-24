import React, { useEffect, useState } from "react";
import "../style/profile.scss";
import { useAuth } from "../hooks/useAuth";
import { DeletedMyPost, FetchMyPost } from "../../post/services/post.api";
import { FaTrash } from "react-icons/fa";
const Profile = () => {
  // const [profileImg, setProfileImg] = useState(null);
  const [userdata, setUserdata] = useState(null);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [posts, setPost] = useState(null)
  const { fetchUser } = useAuth()

  async function GetProfile() {
    try {
      const res = await fetchUser()
      setUserdata(res.user)
      setFollowers(res.follower)
      setFollowing(res.following)
      setPost(res.post)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function loadProfile() {
      await GetProfile()
    }
    loadProfile()
  }, [])
  const handleDelectePost = async (id) => {
    try {
      await DeletedMyPost(id)
      await GetProfile()
    } catch (error) {
      console.error(error);
    }
  }
  // const handleProfileImage = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setProfileImg(URL.createObjectURL(file));
  //   }
  // };

  return (
    <div className="profile-page">
      {/* Top Section */}
      <div className="profile-header">
        <div className="profile-img">
          <img
            src={
              userdata?.profile_image
            }
            alt="profile"
          />

          {/* <label>
            Change Photo
            <input type="file" accept="image/*" onChange={handleProfileImage} />
          </label> */}
        </div>

        <div className="profile-info">
          <h2>{userdata?.username}</h2>

          <div className="counts">
            <span>
              <b>{posts?.length}</b> posts
            </span>
            <span>
              <b>{followers?.length}</b> followers
            </span>
            <span>
              <b>{following?.length}</b> following
            </span>
          </div>

          <p className="fullname">{userdata?.fullname}</p>
          <p className="bio">{userdata?.bio}</p>
          <p className="email">{userdata?.email}</p>

          {/* <button>Edit Profile</button> */}
        </div>
      </div>

      <div className="posts-grid">
        {posts?.map((img, index) => (
          <div className="post" key={index}>
            <button onClick={()=>handleDelectePost(img._id)}><FaTrash /> </button>
            <img src={img?.imgUrl} alt="post" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;