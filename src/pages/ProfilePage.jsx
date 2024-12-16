import React from "react";
import { useProfileData } from "../contexts/ProfileContext"
import ProfileContainer from "../components/ProfileContainer";

export function ProfilePage() {
    let profileData = useProfileData();
    if (profileData._id) {
        return (
            <div>
                <ProfileContainer />
            </div>
        )
    } else {
        return (
            <div>
                <h3 className="error">Error in loading profile, please try again.</h3>
            </div>
        )
    }
}