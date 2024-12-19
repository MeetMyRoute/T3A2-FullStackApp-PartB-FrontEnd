import { useEffect, useState } from "react";
import "../stylesheets/ProfileContainer.css"
import ProfileForm from "./ProfileForm";
import ViewProfile from "./ViewProfile";
import axios from "axios";
import { ConnectButton } from "./ConnectButton";

const API = import.meta.env.VITE_API_URL;

export default function ProfileContainer() {
    const [isEditing, setIsEditing] = useState(false);
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch user ID
    useEffect(() => {
        const fetchLoggedInUser = async() => {
            try {
                const jwt = localStorage.getItem("jwt");
                if (!jwt) {
                    throw new Error("Not authenticated. Please login");
                }

                const response = await axios.get(`${API}/user/me`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                setLoggedInUserId(response.data.id);
            } catch(error) {
                setError(error.response?.data?.message || "Failed to fetch user data");
            } finally {
                setLoading(false);
            }
        }
        fetchLoggedInUser();
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p className="error-message">{error}</p>
    }

    // Determine if this is the logged-in user's profile
    const isOwnProfile = loggedInUserId === profileUserId;
    
    if (isEditing) {
        return (
            <div className="profileContainer">
                <button className="backButton" onClick={() => setIsEditing(false)}>Back</button>
                <ProfileForm profileData={profileData} />
            </div>
        ) 
        
    } else {
        return <div className="profileContainer">
            <ViewProfile profileData={profileData} />
            {isOwnProfile ? (
                <button className="editButton" onClick={() => setIsEditing(true)}>Edit Profile</button>
            ) : (
                <ConnectButton 
                    recipientId={profileData.userId}
                    recipientName={profileData.name}
                    status={profileData.status}
                    
                    // Disable if already connected
                    isDisabled={profileData.hasConnected}
                />
            )}
        </div>
    }
}