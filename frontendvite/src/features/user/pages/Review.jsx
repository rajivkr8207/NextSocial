import { useEffect, useState } from "react";
import "../styles/Review.scss";
import { CreateReview, FetchReviews } from "../services/user.api";
import { toast } from "react-toastify";

const Review = () => {
    const [rating, setRating] = useState(5);
    const [message, setMessage] = useState("");
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [youRated, setYouRated] = useState(false);

    const loadReviews = async () => {
        const res = await FetchReviews();
        setReviews(res.messages);
        setYouRated(res?.yourRating ? true : false);
    };

    useEffect(() => {
        loadReviews();
    }, []);

    const handleSubmit = async () => {
        if (!message) return;
        setLoading(true);
        try {
            await CreateReview({ rating, message });
        } catch (error) {
            if (youRated) {
                toast.error("You have already given a rating");
            }
            console.log(error.data);
        } finally {
            setLoading(false);
        }

        setMessage("");
        setRating(5);
        loadReviews();
    };

    return (
        <div className="review-page">
            <h1>Give Project Rating</h1>
            {/* CREATE REVIEW */}
            {youRated && <p className="info">You have already given a rating. Thanks ♥️♥️♥️</p>}
            <div className="review-box">
                <h3>Leave a Review</h3>

                <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                >
                    <option value="5">⭐⭐⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="1">⭐</option>
                </select>

                <textarea
                    placeholder="Write your review..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <button disabled={loading} onClick={handleSubmit}>{loading ? "loading..." : "submiting"}</button>
            </div>

            {/* SHOW REVIEWS */}
            <div className="review-list">
                {reviews?.map((r) => (
                    <div key={r._id} className="review-card">
                        <div className="user">
                            <img src={r.user.profile_image} />
                            <b>{r.user.username}</b>
                        </div>
                        <div className="review-desc">
                            <span>{"⭐".repeat(r.rating)}</span>
                            <p>{r.message}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Review;