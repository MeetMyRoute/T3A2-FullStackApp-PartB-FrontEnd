import React from "react";
import ProfileContainer from "../components/ProfileContainer";

export function ProfilePage() {
    // if (profileData._id) {
    //     return (
    //         <div>
    //             <ProfileContainer />
    //         </div>
    //     )
    // } else {
        return (
            <div>
                <h3 className="error">Error in loading profile, please try again.</h3>
            </div>
        )
    // }
}