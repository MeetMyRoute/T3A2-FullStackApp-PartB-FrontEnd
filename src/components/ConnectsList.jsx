import React, { useEffect, useState } from "react";
import defaultProfile from "../assets/default-profile.jpg";
import axios from "axios";
import "../stylesheets/ConnectsList.css";

const API = import.meta.env.VITE_API_URL;

export function ConnectsList() {
    const [connects, setConnects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    // Store user's ID
    const [userId, setUserId] = useState(null);

    // Fetch connects when the component mounts
    useEffect(() => {
        const fetchConnects = async () => {
            try {
                const jwt = localStorage.getItem("jwt");
                if (!jwt) {
                    throw new Error("Not authenticated. Please login")
                }

                // Fetch the logged-in user
                const userResponse = await axios.get(`${API}/user/me`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                setUserId(userResponse.data.id);

                // Fetch connects
                const response = await axios.get(`${API}/connects`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                setConnects(response.data.data);
            } catch (error) {
                setError(error.response?.data?.message || "Failed to load connects");
            } finally {
                setLoading(false);
            }
        }

        fetchConnects();
    }, []);

    // Conditional rendering for loading, error, and connects
    if (loading) {
        return <p className="loading-message">Loading...</p>
    }
    if (error) {
        return <p className="error-message">{error}</p>
    }
    if (connects.length === 0) {
        return <p className="no-connects-message">No connects found</p>
    }

    return (
        <div className="connects-list">
            {connects.map((connect) => {
                // Determine if the current user sent the message
                const isSent = connect.senderId._id === userId;
                // Determine details of the other user
                const otherUser = isSent ? connect.recipientId : connect.senderId;

                return (
                    <div key={connect._id} className="connects-card">
                        <img src={user.profilePic || defaultProfile} alt="Profile" className="connects-card-img" />
                        <div className="connects-card-details">
                            <h3>{otherUser.name}</h3>
                            <p>
                                <a href={otherUser.socialMediaLink} target="_blank" rel="noopener noreferrer" className="social-media-link">
                                    {otherUser.socialMediaLink}
                                </a>
                            </p>
                            <p className="connection-type">Connection Type: {isSent ? "Sent Message" : "Received Message"}</p>
                        </div>
                        <button className="view-profile-button">View Profile</button>
                    </div>
                )
            })};
        </div>
    )
}