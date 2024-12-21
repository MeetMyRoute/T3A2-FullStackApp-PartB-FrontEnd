import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../stylesheets/ProfileForm.css";
import { convertImageToBase64 } from '../utils/imageUtils';

const API = import.meta.env.VITE_API_URL;

export default function ProfileForm({profile, onFormSubmit}) {
    const [tempProfileData, setTempProfileData] = useState({});
    const { userId } = useParams();

    // Handle changes in input fields
    const handleChange = async (e) => {
        const {name, value, type, files} = e.target;
        if (type === "file") {
            const profilePic = files[0];
            if (profilePic) {
                // Convert the profile picture image to base64
                const image = await convertImageToBase64(profilePic);
                setTempProfileData((prev)=>({
                    ...prev,
                    [name]: image
                }));
            }

        } else {
            setTempProfileData((prev) => ({
                ...prev,
                [name]: value
            }));
            console.log(tempProfileData)
        }    
    }

    // Handle add a travel preference and goal item
    const handleAddTravelPrefAndGoals = () => {
        setTempProfileData((prev) => ({
            ...prev,
            travelPreferencesAndGoals: [...prev.travelPreferencesAndGoals,""]
        }));
    }

    // Handle edit an existing travel preference and goal item
    const handleChangeTravelPrefAndGoals = (index, value) => {
        const updatedTravelPrefAndGoals = [...tempProfileData.travelPreferencesAndGoals];
        updatedTravelPrefAndGoals[index] = value;
        setTempProfileData((prev) => ({
            ...prev,
            travelPreferencesAndGoals: updatedTravelPrefAndGoals
        }));
    }

    // Handle remove a travel preference and goal item
    const handleRemoveTravelPrefAndGoals = (index) => {
        const updatedTravelPrefAndGoals = tempProfileData.travelPreferencesAndGoals.filter((_, i) => i !== index);

        setTempProfileData((prev) => ({
            ...prev,
            travelPreferencesAndGoals: updatedTravelPrefAndGoals
        }));
    }
    
    // Update the profile data on form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const jwt = localStorage.getItem("jwt");
            if (!jwt) {
                throw new Error("Not authenticated. Please login");
            }
            await axios.patch(`${API}/profile/${userId}`, tempProfileData, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            onFormSubmit();
        } catch (error) {
            console.log("Error updating profile:", error);
        }
    }

    // Update the form data state when the profile data changes
    useEffect(() => {
        setTempProfileData(profile);
    }, [profile])

    return !!profile && (
        <form className="profileForm" onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>

            {/* Name input */}
            <label htmlFor="name">Name:</label>
            <input
            type="text"
            name="name"
            id="editName"
            defaultValue={profile.name}
            onChange={(e) => {handleChange(e)}}
            required />
            
            {/* Location input */}
            <label htmlFor="location">Location:</label>
            <input
            type="text"
            name="location"
            id="editLocation"
            defaultValue={profile.location}
            onChange={(e) => {handleChange(e)}}
            required />

            {/* Status dropdown */}
            <label htmlFor="status">Status:</label>
            <select
            name="status"
            className="editStatusOptions"
            defaultValue={profile.status}
            onChange={(e) => {handleChange(e)}}
            required > 
                <option value={profile.status}>{profile.status}</option>
                {profile.status !== "Private" ? <option value="Private">Private</option> : null}
                {profile.status !== "Travelling" ? <option value="Travelling">Travelling</option> : null}
                {profile.status !== "Local" ? <option value="Local">Local</option> : null}
            </select>

            {/* Profile picture input */}
            <label htmlFor="profilePic">Profile Picture:</label>
            <input
            type="file"
            name="profilePic"
            id="editProfilePic"
            accept="image/*"
            onChange={(e) => {handleChange(e)}} />
            {tempProfileData.profilePic && <img src={tempProfileData.profilePic} alt="Profile Picture Preview" id="profilePicPreview" />}

            {/* Travel preferences and goals input */}
            <label htmlFor="travelPreferencesAndGoals">Travel Preferences & Goals:</label>
            {tempProfileData.travelPreferencesAndGoals?.map((item, index) => {
                return (
                    <div key={index} className="travelPrefAndGoalsItem">
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => handleChangeTravelPrefAndGoals(index, e.target.value)} />
                        <button 
                            type="button"
                            className="removeTravelPrefAndGoalsButton"
                            onClick={() => handleRemoveTravelPrefAndGoals(index)}>Remove</button>
                    </div>
                );
            })}
            <button
            type="button"
            className="addTravelPrefAndGoalsButton"
            onClick={handleAddTravelPrefAndGoals}>Add</button>

            {/* Social media link input */}
            <label htmlFor="socialMediaLink">Social Media:</label>
            <input
            type="text"
            name="socialMediaLink"
            id="editSocialMediaLink"
            defaultValue={profile.socialMediaLink}
            onChange={(e) => {handleChange(e)}} />

            <div className="profileForm formActions">
                <button type="submit" className="submitButton">Save</button>
            </div>
        </form>
    )
}