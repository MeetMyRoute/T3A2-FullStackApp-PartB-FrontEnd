import { useEffect, useState } from "react";
import axios from "axios";
import "../stylesheets/ProfileContainer.css"
import ProfileForm from "./ProfileForm";
import ViewProfile from "./ViewProfile";

const API = import.meta.env.VITE_API_URL;

export default function ProfileContainer({userId}) {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({})

    async function fetchAndSetProfileData(userId) {
        try {
            const jwt = localStorage.getItem("jwt")
            const result = await axios.get(`${API}/profile/${userId}`,{
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log(`${API}/profile/${userId}`)
            setProfileData(result);
            console.log(result);
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        fetchAndSetProfileData(userId);
    }, [userId]);

    if (isEditing) {
        return (
            <div className="profileContainer">
                <button className="backButton" onClick={() => setIsEditing(false)}>Back</button>
                <ProfileForm profileData={profileData} />
            </div>
        ) 
        
    } else {
        return <div className="profileContainer">
            <ViewProfile profile={profileData} />
            <button className="editButton messageButton" onClick={() => setIsEditing(true)}>Edit Profile</button>
    </div>
    }
}