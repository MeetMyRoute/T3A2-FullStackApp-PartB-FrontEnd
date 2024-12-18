// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "./UserContext";
// import { useParams } from "react-router-dom";

// // Initialise the default profile data structure
// export const initialiseProfileData = {
//     name: "",
//     location: "",
//     status: "",
//     profilePic: "",
//     travelPreferencesAndGoals: [],
//     socialMediaLink: "",
//     itineraries: []

// }

// // Create the context for profile data and setter function
// const ProfileDataContext = createContext(initialiseProfileData);
// const ProfileDataSetterContext = createContext(null);

// // Create custom hooks to access the profile data and setter function from the context
// export function useProfileData() {
//     return useContext(ProfileDataContext);
// }

// export function useProfileDataSetter() {
//     return useContext(ProfileDataSetterContext);
// }

// // Create the profile data context provider
// export function ProfileDataProvider({children}) {
//     const [profileData, setProfileData] = useState(initialiseProfileData);
//     const user = useAuth();
//     const {userId} = useParams();

//     if (!user) {
//         return console.log("User not authenticated");
//     } 

//     // Fetch the profile data from the API
//     async function fetchAndSetProfileData(userId) {
//         const API = import.meta.env.VITE_API_URL;
//         const url = `${API}profile/${userId}`;
//         console.log("Requesting URL:", url);
//         try {
//             // const result = await axios.get(`${API}/profile/${userId}`);
//             const result = await axios.get(`${API}profile/${userId}`, {
//                 headers: {
//                     // Authorization: `Bearer ${user.token}`
//                 }
//             });

//             // Set the result profile data into the state 
//             setProfileData(result);
//             console.log(result);
//         } catch (error) {
//             console.log("Error fetching user profile:", error);
//         }
//     };

//     // Fetch the profile data and set the result into the state when the userId changes
//     useEffect(() => {
//         fetchAndSetProfileData(userId)
//     }, [userId])

//     return (
//         <ProfileDataContext.Provider value={profileData}>
//             <ProfileDataSetterContext.Provider value={setProfileData}>
//                 {children}
//             </ProfileDataSetterContext.Provider>
//         </ProfileDataContext.Provider>
//     )
// }