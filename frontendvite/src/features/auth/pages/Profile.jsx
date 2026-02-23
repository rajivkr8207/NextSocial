import React, { useState } from "react";
import "../style/profile.scss";

const Profile = () => {
  const [profileImg, setProfileImg] = useState(null);

  const [user, setUser] = useState({
    username: "rajiv_dev",
    fullname: "Rajiv Kumar",
    email: "rajiv@gmail.com",
    bio: "Full Stack Developer | React & Node",
  });

  const [posts] = useState([
    "https://source.unsplash.com/400x400/?code",
    "https://source.unsplash.com/400x401/?laptop",
    "https://source.unsplash.com/400x402/?technology",
    "https://source.unsplash.com/400x403/?programming",
    "https://source.unsplash.com/400x404/?computer",
    "https://source.unsplash.com/400x405/?developer",
  ]);

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(URL.createObjectURL(file));
    }
  };

  return (
    <div className="profile-page">
      {/* Top Section */}
      <div className="profile-header">
        <div className="profile-img">
          <img
            src={
              profileImg ||
              "https://i.pravatar.cc/300"
            }
            alt="profile"
          />

          <label>
            Change Photo
            <input type="file" accept="image/*" onChange={handleProfileImage} />
          </label>
        </div>

        <div className="profile-info">
          <h2>{user.username}</h2>

          <div className="counts">
            <span>
              <b>{posts.length}</b> posts
            </span>
            <span>
              <b>120</b> followers
            </span>
            <span>
              <b>180</b> following
            </span>
          </div>

          <p className="fullname">{user.fullname}</p>
          <p className="bio">{user.bio}</p>
          <p className="email">{user.email}</p>

          <button>Edit Profile</button>
        </div>
      </div>

      {/* Posts Section */}
      <div className="posts-grid">
        {posts.map((img, index) => (
          <div className="post" key={index}>
            <img src={img} alt="post" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;