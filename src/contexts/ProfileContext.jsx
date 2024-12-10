import { createContext, useContext, useEffect, useState } from "react"

export const defaultProfileData = {
    name: "",
    location: "",
    status: "",
    profilePic: "",
    travelGoalsAndPreferences: "",
    socialMediaLink: ""
};

// Create the context
const ProfileDataContext = createContext(defaultProfileData);
const ProfileDataSetterContext = createContext(null);

// Create custom hooks to access the context data
export function useProfileContext() {
    console.log("Passing data around");
    return useContext(ProfileDataContext);
};

export function useProfileContextSetter() {
    return useContext(ProfileDataSetterContext);
};

// Create the context provider
export default function ProfileProvider(props) {
    let [profileData, setProfileData] = useState(defaultProfileData);

    let {userAuthData} = useUserAuthContext();

    async function fetchProfileData(accessToken, userId) {
        const result = await fetch(
            `/profile/${userId}`, // need to fix
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )
        return await result.json();
    };

    useEffect(() => {
        if (userAuthData && userAuthData.userJwt) {
            fetchProfileData(userAuthData.userJwt)
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
};