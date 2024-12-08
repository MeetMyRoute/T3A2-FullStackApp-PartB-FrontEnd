import React from "react";
import { useContext } from "react";
import ProfileContext from "../contexts/ProfileContext"

export function ProfilePage() {
    let profile = useContext(ProfileContext);

    return (
        <div>
            <h1>Profile Page</h1>
            <h2>{profile.name}</h2>
            <h3>{profile.location}</h3>
            <img src={profile.profilePic} alt="Profile picture" />
            <h4>{profile.status}</h4>
            <h4>Travel Goals & Preferences</h4>
            <p>{profile.travelGoalsAndPreferences}</p>
            <h4>Social Media</h4>
        </div>
    )
}

// export function ProfilePage() {
//     return <h1>Profile Page</h1>
// }