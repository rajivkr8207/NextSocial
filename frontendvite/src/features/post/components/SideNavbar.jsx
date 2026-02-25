import { useState } from "react";
import "../styles/SideNavbar.scss";
import {
    FaHome,
    FaUser,
    FaPlusSquare,
    FaBars,
    FaCompass,
    FaBell,
    FaSearch,
} from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { MdClose, MdFeedback } from "react-icons/md";
import { Link } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";
import { IoMdChatbubbles } from "react-icons/io";
const SideNavbar = () => {
    const [open, setOpen] = useState(false);
    const [togglemore, setTogglemore] = useState(false);


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
                <div>
                    <h2 className="logo">NextSocial</h2>

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
                            <Link to="/search">
                                <FaSearch />
                                <span>Search</span>
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
                        <li>
                            <Link to="/chat">
                                <IoMdChatbubbles />
                                <span>Chat</span>
                            </Link>
                        </li>
                        <li>

                        </li>
                    </ul>
                </div>

                <div className="social-icons more" onClick={() => setTogglemore(!togglemore)}>
                    <TiThMenu />
                    More
                    {togglemore && <div className="morelinks">
                        <div>
                            <Link to="/feedback">
                            <MdFeedback />
                            <span>Review</span>
                        </Link>
                        </div>
                        <div onClick={() => handlelogout()}>
                            <Link to="/login">
                                <RiLogoutBoxFill />
                                <span>Logout</span>
                            </Link>
                        </div>
                    </div>}
                </div>

            </div>
        </>
    );
};

export default SideNavbar;