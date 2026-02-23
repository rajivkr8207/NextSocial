import React, { useState } from "react";
import "../styles/SideNavbar.scss";
import {
    FaHome,
    FaUser,
    FaPlusSquare,
    FaBars,
    FaInstagram,
    FaFacebook,
    FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router";

const SideNavbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle */}
            <div className="menu-btn" onClick={() => setOpen(!open)}>
                <FaBars />
            </div>

            <div className={`sidebar ${open ? "active" : ""}`}>
                <h2 className="logo">SocialApp</h2>

                <ul>
                    <li>
                        <Link to="/">
                            <FaHome />
                            <span>Home</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/profile">
                            <FaUser />
                            <span>Profile</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/create">
                            <FaPlusSquare />
                            <span>Create Post</span>
                        </Link>
                    </li>
                </ul>

                <div className="social-icons">
                    <FaInstagram />
                    <FaFacebook />
                    <FaTwitter />
                </div>
            </div>
        </>
    );
};

export default SideNavbar;