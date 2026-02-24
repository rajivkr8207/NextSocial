import "../styles/Home.scss";
import { usePost } from "../hooks/usePost";
import PostCard from "../components/PostCard";

const Home = () => {
    const { posts } = usePost()


    return (
        <div className="home-page">
            {posts?.map((post) => (
                <PostCard key={post._id} post={post} />
            ))}
        </div>
    );
};

export default Home;