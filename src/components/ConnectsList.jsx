import React, { useEffect, useState } from "react";
import defaultProfile from "../assets/default-profile.jpg";
import axios from "axios";
import "../stylesheets/ConnectsList.css";

const API = import.meta.env.VITE_API_URL;

export function ConnectsList() {
    const [connects, setConnects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch connections when the component mounts
    useEffect(() => {
        const fetchConnects = async() => {
            try {
                const res = await axios.get(`${API}/connects`);
                setConnects(res.data.data);
            } catch(error) {
                setError(error.res?.data?.message || "Failed to load connects");
            } finally {
                setLoading(false);
            }
        }
        fetchConnects();
    }, []);

    // Conditional rendering for loading, error, and connects
    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p className="error-message">{error}</p>
    }

    if (connects.length === 0) {
        return <p>No connects found</p>
    }

    return (
        <div className="connects-list">
            {connects.map((user) => (
                <div key={user.id} className="connects-card">
                    <img src={user.profilePic || defaultProfile} alt="Profile" className="connects-card-img" />
                    <div className="connects-card-details">
                        <h3>{user.name}</h3>
                        <p>
                            <a href={user.socialMediaLink} target="_blank" rel="noopener noreferrer">
                                {user.socialMediaLink}
                            </a>
                        </p>
                        <p>Connection Type: {user.type === "sent" ? "Sent Message" : "Received Message"}</p>
                    </div>
                    <button>View Profile</button>
                </div>
            ))}
        </div>
    )
}