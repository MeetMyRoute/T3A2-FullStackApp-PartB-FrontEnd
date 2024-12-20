import React, { useEffect, useState } from "react";
import axios from "axios";
import { DateSelector } from "./DateSelector";
import "../stylesheets/ItineraryForm.css";

// Fetch API URL from environment
const API = import.meta.env.VITE_API_URL;

export function ItineraryForm({ selectedItinerary, onFormSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        destination: "",
        startDate: "",
        endDate: "",
        accommodation: "",
        activities: [""]
    });

    // Pre-fill form if editing an itinerary
    useEffect(() => {
        if (selectedItinerary) {
            setFormData(selectedItinerary);
        }
    }, [selectedItinerary]);

    // Handle input changes for text fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    // Handle changes to activities list
    const handleActivityChange = (index, value) => {
        const updatedActivities = [...formData.activities];
        updatedActivities[index] = value;
        setFormData((prev) => ({ ...prev, activities: updatedActivities }));
    }

    // Add a new activity input
    const handleAddActivity = () => {
        setFormData((prev) => ({
            ...prev,
            activities: [...prev.activities, ""]
        }));
    }

    // Remove an activity input
    const handleRemoveActivity = (index) => {
        const updatedActivities = formData.activities.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, activities: updatedActivities }));
    }

    // Handle date changes from DateSelector
    const handleDateChange = (startDate, endDate) => {
        setFormData((prev) => ({
            ...prev,
            startDate: startDate ? startDate.toISOString().split("T")[0] : "",
            endDate: endDate ? endDate.toISOString().split("T")[0] : ""
        }));
    }

    // Handle form submission (create or update itinerary)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedItinerary) {
                // Update existing itinerary
                await axios.patch(`${API}/itinerary/${selectedItinerary.id}`, formData);
            } else {
                // Create new itinerary
                await axios.post(`${API}/itinerary`, formData);
            }
            onFormSubmit();
        } catch (error) {
            console.log("Error submitting itinerary:", error);
        }
    }

    return (
        <form className="itinerary-form" onSubmit={handleSubmit}>
            <h2>{selectedItinerary ? "Edit Itinerary" : "Add Itinerary"}</h2>

            <label htmlFor="destination">Destination:</label>
            <input id="destination" name="destination" type="text" value={formData.destination} onChange={handleChange} required />

            <DateSelector
                startDate={formData.startDate ? new Date(formData.startDate) : null}
                endDate={formData.endDate ? new Date(formData.endDate) : null}
                onDateChange={handleDateChange}
            />

            <label htmlFor="accommodation">Accommodation:</label>
            <input id="accommodation" name="accommodation" type="text" value={formData.accommodation} onChange={handleChange} />

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