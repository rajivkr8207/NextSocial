import { useEffect, useState } from "react";
import "../styles/Search.scss";
import { useNavigate } from "react-router";
import { SearchUsers } from "../services/user.api";

const Search = () => {

    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!query) {
            setUsers([]);
            return;
        }

        const delay = setTimeout(async () => {
            try {
                setLoading(true);
                const res = await SearchUsers(query);
                setUsers(res.users);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => clearTimeout(delay);
    }, [query]);

    return (
        <div className="search-page">

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div className="search-results">

                {loading && <p className="info">Searching...</p>}

                {!loading && users.length === 0 && query && (
                    <p className="info">No users found</p>
                )}

                {users.map((user) => (
                    <div
                        className="result-card"
                        key={user._id}
                        onClick={() => navigate(`/profile/${user._id}`)}
                    >
                        <img src={user.profile_image} alt="user" />

                        <div>
                            <h4>{user.username}</h4>
                            <p>{user.fullname}</p>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
};

export default Search;