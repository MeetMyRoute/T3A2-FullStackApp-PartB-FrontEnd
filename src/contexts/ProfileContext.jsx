import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const defaultProfileData = {
    name: "",
    location: "",
    status: "",
    profilePic: "",
    travelGoalsAndPreferences: "",
    socialMediaLink: ""
}

// Create the context
const ProfileDataContext = createContext(defaultProfileData);
const ProfileDataSetterContext = createContext(null);

// Create custom hooks to access the context data
export function useProfileContext() {
    console.log("Passing data around");
    return useContext(ProfileDataContext);
}

export function useProfileContextSetter() {
    return useContext(ProfileDataSetterContext);
}

// Create the profile context provider
export default function ProfileProvider(props) {
    let [profileData, setProfileData] = useState(defaultProfileData);

    let {userAuthData} = useUserAuthContext();

    // Fetch the profile date from the API
    async function fetchProfileData(accessToken, userId) {
        const API = import.meta.env.API_URL;
        try {
            const result = await axios.get(`${API}profile/${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return result.data;
        } catch (error) {
            console.log("Error fetching user profile: ", error);
        }
    };

    // Fetch the profile data when userAuth data changes
    useEffect(() => {
        if (userAuthData && userAuthData.userJwt && userId) {
            fetchProfileData(userAuthData.userJwt, userId)
            .then(profileData => setProfileData(profileData));
        }
    }, [userAuthData]);

    return (
        <ProfileDataContext.Provider value={profileData}>
            <ProfileDataSetterContext.Provider value={setProfileData}>
                {props.children}
            </ProfileDataSetterContext.Provider>
        </ProfileDataContext.Provider>
    )
}