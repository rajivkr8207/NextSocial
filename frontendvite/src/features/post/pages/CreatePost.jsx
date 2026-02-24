import { useState } from "react";
import "../styles/CreatePost.scss";
import { CreateMyPost } from "../services/post.api";
import { useNavigate } from "react-router";
import { toast } from "react-toastify"

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const navigate = useNavigate();
  // Image select handler
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !caption) {
      alert("Please add image and caption");
      return;
    }

    const formData = new FormData();
    formData.append("imageurl", image);
    formData.append("caption", caption);
    if (image.size < 2000000) {
      await CreateMyPost(formData)
      toast.success("Post created successfully");
      setCaption("");
      setImage(null);
      setPreview(null);
      navigate('/')

    } else {
      toast.error('please make image size less then 2mb')
    }

  };

  return (
    <div className="create-post">
      <form className="post-card" onSubmit={handleSubmit}>
        <h2>Create New Post</h2>

        {/* Image Upload */}
        <div className="image-box">
          {preview ? (
            <img src={preview} alt="preview" />
          ) : (
            <label className="upload-box">
              Click to Upload Image
              <input type="file" accept="image/*" onChange={handleImage} />
            </label>
          )}
        </div>

        {/* Caption */}
        <textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        {/* Button */}
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;