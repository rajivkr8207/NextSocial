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
    FaCompass,
    FaBell,
} from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { Link } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";

const SideNavbar = () => {
    const [open, setOpen] = useState(false);

    const { handlelogout } = useAuth()

    if (open) {
        window.addEventListener('mousedown', () => {
            setOpen(false);
        })
    }
    return (
        <>
            <div className="menu-btn" onClick={() => setOpen(!open)}>
                {open ? <MdClose /> : <FaBars />}
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
                        <Link to="/explore">
                            <FaCompass />
                            <span>explore</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/notification">
                            <FaBell />
                            <span>Notificatiom</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/create">
                            <FaPlusSquare />
                            <span>Create Post</span>
                        </Link>
                    </li>
                    <li onClick={() => handlelogout()}>
                        <Link to="/login">
                            <FaPlusSquare />
                            <span>Logout</span>
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