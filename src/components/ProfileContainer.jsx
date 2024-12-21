import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../stylesheets/ProfileContainer.css"
import ProfileForm from "./ProfileForm";
import ViewProfile from "./ViewProfile";
import { ConnectButton } from "./ConnectButton";

const API = import.meta.env.VITE_API_URL;

export default function ProfileContainer() {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { userId } = useParams();

    // Get userId from local storage
    const loggedInUserId = localStorage.getItem("userId");

    // Determine if this is the logged-in user's profile
    const isOwnProfile = loggedInUserId === userId;

    // Fetch and set profile data based on user ID
    async function fetchAndSetProfileData(userId) {
        try {
            const jwt = localStorage.getItem("jwt");
            if (!jwt) {
                throw new Error("Not authenticated. Please login");
            }
            const response = await axios.get(`${API}/profile/${userId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            setProfileData(response.data.data);
        } catch(error) {
            setError(error.response?.data?.message || "Failed to fetch user data");
        } finally {
            setLoading(false);
        }
    }

    // Set isEditing to false and fetch and set profile data on submit
    const onSubmit = () => {
        setIsEditing(false);
        fetchAndSetProfileData(userId);
    }

    // Update the profile data state when the user ID changes
    useEffect(() => {
        fetchAndSetProfileData(userId);
    }, [userId]);

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p className="error-message">{error}</p>
    }
    
    // Render ProfileForm component if isEditing is set to true
    if (isEditing) {
        return (
            <div className="profileContainer">
                <button className="backButton" onClick={() => setIsEditing(false)}>Back</button>
                <ProfileForm profile={profileData} onFormSubmit={onSubmit} />
            </div>
        ) 
        
    } else {
        // Render ViewProfile component if isEditing is set to false
        return <div className="profileContainer">
            <ViewProfile profile={profileData} />
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