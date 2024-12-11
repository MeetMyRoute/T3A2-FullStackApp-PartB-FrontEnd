import React, { useEffect, useState } from "react";
import "./ItineraryForm.css";
import axios from "axios";

const API = import.meta.env.API_URL;

export function ItineraryForm({selectedItinerary, onFormSubmit, onCancel}) {
    const [formData, setFormData] = useState({
        destination: "",
        startDate: "",
        endDate: "",
        accommodation: "",
        activities: [""],
    });

    // Pre-fill form if editing
    useEffect(() => {
        if (selectedItinerary) {
            setFormData(selectedItinerary);
        }
    }, [selectedItinerary]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleActivityChange = (index, value) => {
        const updatedActivities = [...formData.activities];
        updatedActivities[index] = value;
        setFormData((prev) => ({...prev, activities: updatedActivities}));
    }

    const handleAddActivity = () => {
        setFormData((prev) => ({
            ...prev,
            activities: [...prev.activities, ""]
        }));
    }

    const handleRemoveActivity = (index) => {
        const updatedActivities = formData.activities.filter((_, i) => i !== index);
        setFormData((prev) => ({...prev, activities: updatedActivities}));
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if (selectedItinerary) {
                // Update existing itinerary
                await axios.put(`${API}/itinerary/${selectedItinerary.id}`, formData);
            } else {
                // Create new itinerary
                await axios.post(`${API}/itinerary`, formData);
            }
            onFormSubmit();
        } catch(error) {
            console.log("Error submitting itinerary:", error);
        }
    }

    return (
        <form className="itinerary-form" onSubmit={handleSubmit}>
            <h2>{selectedItinerary ? "Edit Itinerary" : "Add Itinerary"}</h2>

            <label>Destination:</label>
            <input name="destination" type="text" value={formData.destination} onChange={handleChange} required />

            <label>Start Date:</label>
            <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} required />

            <label>End Date:</label>
            <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} required />

            <label>Accommodation:</label>
            <input name="accommodation" type="text" value={formData.accommodation} onChange={handleChange} />

            <label>Activities:</label>
            {formData.activities.map((activity, index) => (
                <div key={index} className="activity-item">
                    <input type="text" value={activity} onChange={(e) => handleActivityChange(index, e.target.value)} />
                    <button type="button" className="remove-activity-btn" onClick={() => handleRemoveActivity(index)}>Remove Activity</button>
                </div>
            ))}
            <button type="button" className="add-activity-btn" onClick={handleAddActivity}>Add Activity</button>

            <div className="form-actions">
                <button type="submit" className="submit-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    )
}