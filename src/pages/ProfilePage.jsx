import React, { useEffect } from "react";
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
    }
}