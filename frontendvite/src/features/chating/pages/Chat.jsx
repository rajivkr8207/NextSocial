import { useState, useEffect, useRef } from "react";
import "../styles/chat.scss";
import { Getmessage, Setmessage } from "../services/chat.api";
import { useAuth } from "../../auth/hooks/useAuth";

const Chat = () => {
    const [mymessage, setMyMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const { user } = useAuth();
    const bottomRef = useRef(null);

    const fetchMessages = async () => {
        try {
            const res = await Getmessage();
            setMessages(res.messages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        async function fetchInitialMessages() {
            await fetchMessages();

        }
        fetchInitialMessages();

    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!mymessage.trim()) return;

        try {
            await Setmessage(mymessage);
            setMyMessage("");
            fetchMessages();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="chat-wrapper">

            <div className="chat-header">
                <span>Group Chat</span>
                <div className="rightbtn">
                    {user?.username && <p>{user?.username}</p>}
                    <button onClick={fetchMessages}>refresh</button>
                </div>
            </div>

            <div className="chat-messages">

                {messages.map(msg => {
                    const isMe = msg?.user?._id === user?._id;

                    return (
                        <div
                            key={msg._id}
                            className={`message-row ${isMe ? "me" : "other"}`}
                        >
                            {!isMe && (
                                <img
                                    src={msg.user.profile_image}
                                    alt="avatar"
                                    className="avatar"
                                />
                            )}

                            <div className={`bubble ${isMe ? "sent" : "received"}`}>
                                {!isMe && <span>{msg.user.username}</span>}
                                <p>{msg.message}</p>
                            </div>
                        </div>
                    );
                })}

                <div ref={bottomRef}></div>
            </div>

            <div className="chat-input">
                <form onSubmit={handleSend}>

                <input
                    type="text"
                    placeholder="Type a message..."
                    value={mymessage}
                    onChange={(e) => setMyMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    required
                    />

                <button type="submit">Send</button>
                    </form>
            </div>

        </div>
    );
};

export default Chat;