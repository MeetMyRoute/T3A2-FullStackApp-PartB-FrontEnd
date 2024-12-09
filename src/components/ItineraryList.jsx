import React, { useEffect, useState } from "react";
import "./ItineraryList.css";
import axios from "axios";
const API = import.meta.env.API_URL;

export function ItineraryList() {
    const [itineraries, setItineraries] = useState([]);
    const [selectedItinerary, setSelectedItinerary] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);

    // Fetch itineraries from API
    useEffect(() => {
        const fetchItineraries = async() => {
            try {
                const response = await axios.get(`${API}/itinerary`);
                setItineraries(response.data);
            } catch(error) {
                console.log("Error fetching itineraries", error);
            }
        }

        fetchItineraries();
    }, []);

    // Edit itinerary handler

    // Delete itinerary handler
    const handleDelete = async(id) => {
        try {
            await axios.delete(`${API}/itinerary/:${id}`);
            setItineraries((prevItineraries) =>
                prevItineraries.filter((itinerary) => itinerary.id !== id)
            )
        } catch(error) {
            console.log("Error deleting itineraries", error);
        }
    }

    return (
        <div className="itinerary-list">
            <h2 className="itinerary-title">Your Itineraries</h2>
            <div className="itinerary-cards">
                {itineraries.map((itinerary) => (
                    <div key={itinerary.id} className="itinerary-card">
                        <p className="itinerary-destination">Destination: {itinerary.destination}</p>
                        <p className="itinerary-dates">Travel dates: {itinerary.startDate} - {itinerary.endDate}</p>
                        <p className="itinerary-accommodation">Accommodation: {itinerary.accommodation}</p>
                        <ul className="itinerary-activities">
                            <li><strong>Activities:</strong></li>
                            {itinerary.activities.map((activity, index) => (
                                <li key={index}>{activity}</li>
                            ))}
                        </ul>
                        <div className="itinerary-actions">
                            <button className="edit-btn" onClick={() => handleEdit(itinerary.id)}>Edit</button>
                            <button className="delete-btn" onClick={() => handleDelete(itinerary.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}