import  { useState } from "react";
import "../styles/CreatePost.scss";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");

  // Image select handler
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image || !caption) {
      alert("Please add image and caption");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    console.log("Post Data:", {
      image,
      caption,
    });

    // alert("Post Created Successfully!");

    // setImage(null);
    // setPreview(null);
    // setCaption("");
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