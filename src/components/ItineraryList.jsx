import React, { useEffect, useState } from "react";
import axios from "axios";
import { ItineraryForm } from "./ItineraryForm";
import "../stylesheets/ItineraryList.css";

const API = import.meta.env.VITE_API_URL;

export function ItineraryList() {
    const [itineraries, setItineraries] = useState([]);
    const [selectedItinerary, setSelectedItinerary] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    // Toggle between detailed/simplified views
    const [isDetailedView, setIsDetailedView] = useState(true);

    const fetchItineraries = async () => {
        try {
            const jwt = localStorage.getItem("jwt");
            if (!jwt) {
                throw new Error("Not authenticated. Please login")
            }

            const endpoint = isDetailedView ? "/itinerary" : "/itinerary/simplified";
            const response = await axios.get(`${API}/${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            setItineraries(response.data);
        } catch (error) {
            console.log("Error fetching itineraries:", error);
        }
    }

    // Fetch itineraries whenever the view changes
    useEffect(() => {
        fetchItineraries();
    }, [isDetailedView]);

    // Toggle between detailed and simplified views
    const handleToggleView = () => {
        setIsDetailedView((prev) => !prev);
    }

    // Handle edit action
    const handleEdit = (itinerary) => {
        setSelectedItinerary(itinerary);
        setShowEditForm(true);
    }

    // Handle delete action
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API}/itinerary/:${id}`);
            // Refresh list after deletion
            fetchItineraries();
        } catch (error) {
            console.log("Error deleting itinerary:", error);
        }
    }

    return (
        <div className="itinerary-list">
            <h2 className="itinerary-title">Your Itineraries</h2>
            <button onClick={handleToggleView} className="toggle-view-btn">
                {isDetailedView ? "Show Simplified View" : "Show Detailed View"}
            </button>

            {showEditForm ? (
                <ItineraryForm
                    selectedItinerary={selectedItinerary}
                    onFormSubmit={() => {
                        setShowEditForm(false);
                        fetchItineraries();
                    }}
                    onCancel={() => setShowEditForm(false)}
                />
            ) : (
                <div className="itinerary-cards">
                    {itineraries.map((itinerary) => (
                        <div key={itinerary.id} className="itinerary-card">
                            <p className="itinerary-destination">Destination: {itinerary.destination}</p>
                            <p className="itinerary-dates">Travel dates: {itinerary.startDate} - {itinerary.endDate}</p>
                            
                            {/* Render detailed info if in detailed view */}
                            {isDetailedView && (
                                <>
                                    <p className="itinerary-accommodation">Accommodation: {itinerary.accommodation}</p>
                                    <ul className="itinerary-activities">
                                        <li>Activities:</li>
                                        {itinerary.activities.map((activity, index) => (
                                            <li key={index}>{activity}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            
                            <div className="itinerary-actions">
                                <button className="edit-btn" onClick={() => handleEdit(itinerary)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(itinerary.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}