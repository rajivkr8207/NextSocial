import React, { useState } from "react";
import "../style/form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const { handleLogin, loading } = useAuth();
    const navigate = useNavigate()
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.password) {
            setError("All fields are required");
            return;
        }
        setError("");
        await handleLogin(formData.username, formData.password)
        navigate('/')
    };

    return (
        <div className="form-container">
            <form className="form-box" onSubmit={handleSubmit}>
                <h2>Login</h2>

                {error && <p className="error">{error}</p>}

                <div className="input-group">
                    {/* <label>Username / Email</label> */}
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    {/* <label>Password</label> */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <button disabled={loading} type="submit">{loading ? 'loading....' : "Login"}</button>

                <p className="bottom-text">
                    Don't have an account? <span>
                        <Link to={'/register'}>
                            Register
                        </Link>
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;