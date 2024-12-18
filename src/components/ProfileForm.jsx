import { useEffect, useState } from "react";
import axios from "axios";
import "../stylesheets/ProfileForm.css"
import { convertImageToBase64 } from '../utils/imageUtils'

const API = import.meta.env.VITE_API_URL;

export default function ProfileForm({profileData}) {
    const [tempProfileData, setTempProfileData] = useState({});

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
        }    
    }

    const handleAddTravelPrefAndGoals = () => {
        setTempProfileData((prev) => ({
            ...prev,
            travelPreferencesAndGoals: [...prev.travelPreferencesAndGoals,""]
        }));
    }

    const handleChangeTravelPrefAndGoals = (index, value) => {
        const updatedTravelPrefAndGoals = [...tempProfileData.travelPreferencesAndGoals];
        updatedTravelPrefAndGoals[index] = value;
        setTempProfileData((prev) => ({
            ...prev,
            travelPreferencesAndGoals: updatedTravelPrefAndGoals
        }));
    }

    const handleRemoveTravelPrefAndGoals = (index) => {
        const updatedTravelPrefAndGoals = tempProfileData.travelPreferencesAndGoals.filter((_, i) => i !== index);
        setTempProfileData((prev) => ({
            ...prev,
            travelPreferencesAndGoals: updatedTravelPrefAndGoals
        }));
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API}/profile/${profileData.userId}`, updatedProfileData);
            onFormSubmit();
        } catch (error) {
            console.log("Error in updating profile:", error);
        }
    }

    useEffect(() => {
        setTempProfileData(profileData);
    }, [profileData])

    return !!profileData && (
        <form className="profileForm" onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>

            <label htmlFor="name">Name:</label>
            <input
            type="text"
            name="name"
            id="editName"
            defaultValue={profileData.name}
            onChange={(e)=>{handleChangeGeneric(e)}}
            required />
            
            <label htmlFor="location">Location:</label>
            <input
            type="text"
            name="location"
            id="editLocation"
            defaultValue={profileData.location}
            onChange={(e)=>{handleChange(e)}}
            required />

            <label htmlFor="status">Status:</label>
            <select
            name="status"
            className="editStatusOptions"
            defaultValue={profileData.status}
            onChange={(e)=>{handleChange(e)}}
            required > 
                <option defaultValue={profileData.status}>{profileData.status}</option>
                {profileData.status !== "Private" ? <option value="private">Private</option> : null}
                {profileData.status !== "Travelling" ? <option value="travelling">Travelling</option> : null}
                {profileData.status !== "Local" ? <option value="local">Local</option> : null}
            </select>

            <label htmlFor="profilePic">Profile Picture:</label>
            <input
            type="file"
            name="profilePic"
            id="editProfilePic"
            accept="image/*"
            onChange={(e)=>{handleChange(e)}} />
            <img src={tempProfileData.profilePic} alt="Profile Picture Preview" id="profilePicPreview" />

            <label htmlFor="travelPreferencesAndGoals">Travel Preferences & Goals:</label>
            {tempProfileData.travelPreferencesAndGoals?.map((item, index) => {
                return (
                    <div key={index} className="travelPrefAndGoalsItem">
                        <input
                            type="text"
                            defaultValue={item}
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

            <label htmlFor="socialMediaLink">Social Media:</label>
            <input
            type="text"
            name="socialMediaLink"
            id="editSocialMediaLink"
            defaultValue={profileData.socialMediaLink}
            onChange={(e)=>{handleChange(e)}} />

            <div className="formActions">
                <button type="submit" className="submitButton">Save</button>
            </div>
        </form>
    )
}