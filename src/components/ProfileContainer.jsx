import { useState } from "react";
import { useProfileData } from "../contexts/ProfileContext";
import "../stylesheets/ProfileContainer.css"
import ProfileForm from "./ProfileForm";
import ViewProfile from "./ViewProfile";

export default function ProfileContainer() {
    let [isEditing, setIsEditing] = useState(false);
    let profileData = useProfileData();

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
            <button className="editButton messageButton" onClick={() => setIsEditing(true)}>Edit Profile</button>
    </div>
    }
}