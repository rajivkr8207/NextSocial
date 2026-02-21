import { useState } from "react";
import "../style/form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
        bio: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate()
    const { handleRegister, loading } = useAuth()
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const { fullname, username, email, password } = formData;

        if (!fullname || !username || !email || !password) {
            return "Please fill all required fields";
        }

        if (!email.includes("@")) {
            return "Invalid email format";
        }

        if (password.length < 6) {
            return "Password must be at least 6 characters";
        }

        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        setError("");
        await handleRegister(formData.username, formData.email, formData.fullname, formData.bio, formData.password)
        navigate('/login')
    };

    return (
        <div className="form-container">
            <form className="form-box" onSubmit={handleSubmit}>
                <h2>Create Account</h2>

                {error && <p className="error">{error}</p>}

                <div className="input-group">
                    {/* <label>Full Name</label> */}
                    <input
                        type="text"
                        name="fullname"
                        placeholder="Enter full name"
                        value={formData.fullname}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    {/* <label>Username</label> */}
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    {/* <label>Email</label> */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
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

                <div className="input-group">
                    {/* <label>Bio</label> */}
                    <textarea
                        name="bio"
                        placeholder="Tell something about yourself"
                        rows="3"
                        value={formData.bio}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" disabled={loading}>{loading ?"loading...": 'Register'}</button>

                <p className="bottom-text">
                    Already have an account? <span>
                        <Link to={'/login'}>
                            Login
                        </Link>
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Register;