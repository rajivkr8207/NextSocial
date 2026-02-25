import "../styles/Home.scss";
import { usePost } from "../hooks/usePost";
import PostCard from "../components/PostCard";
import { useEffect } from "react";

const Home = () => {
  const { posts, setposts, hasMore, GetAllpost } = usePost();
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        hasMore
      ) {
        GetAllpost();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  return (
    <div className="home-page">
      {posts?.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          setposts={setposts}
          posts={posts}
        />
      ))}
    </div>
  );
};

export default Home;
