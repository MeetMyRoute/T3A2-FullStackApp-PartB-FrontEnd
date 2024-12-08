import { createContext } from "react"

export const defaultProfileData = {
    name: "test",
    location: "test",
    status: "test",
    profilePic: "test",
    travelGoalsAndPreferences: "test",
    socialMediaLink: "test"
}

const ProfileContext = createContext(defaultProfileData);

export default ProfileContext