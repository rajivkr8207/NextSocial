import React, { useEffect, useState } from "react";
import "../style/profile.scss";
import { useAuth } from "../hooks/useAuth";
import { DeletedMyPost, FetchMyPost } from "../../post/services/post.api";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
const Profile = () => {
  // const [profileImg, setProfileImg] = useState(null);
  const [userdata, setUserdata] = useState(null);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [posts, setPost] = useState(null)
  const [bookmark, setBookmark] = useState(null)
  const { fetchUser } = useAuth()
  const navigate = useNavigate()
  async function GetProfile() {
    try {
      const res = await fetchUser()
      setBookmark(res.bookmark)
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

  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="profile-page">
      {/* Top Section */}
      <div className="profile-header">
        <div className="profile-img">
          <img
            src={userdata?.profile_image}
            alt="profile"
          />
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
        </div>
      </div>

      <div className="post-bookmark-section">
        <button
          className={activeTab === "posts" ? "tab active" : "tab"}
          onClick={() => setActiveTab("posts")}
        >
          My Posts
        </button>
        <button
          className={activeTab === "saved" ? "tab active" : "tab"}
          onClick={() => setActiveTab("saved")}
        >
          Saved
        </button>
      </div>

      <div className="posts-grid">
        {activeTab === "posts"
          ? posts?.map((img, index) => (
              <div className="post" key={index}>
                <button onClick={() => handleDelectePost(img._id)}>
                  <FaTrash />
                </button>
                <img src={img?.imgUrl} alt="post" />
              </div>
            ))
          : bookmark?.map((img, index) => (
              <div className="post" key={index} onClick={() => navigate(`/post/${img.post._id}`)}>
                <img src={img?.post.imgUrl} alt="saved" />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Profile;