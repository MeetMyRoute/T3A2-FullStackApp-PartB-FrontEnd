import React from "react";
import ProfileContainer from "../components/ProfileContainer";
import { useParams } from "react-router-dom";

export function ProfilePage() {
    const { userId } = useParams();

    if (userId) {
        return (
            <div>
                <ProfileContainer userId={userId} />
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