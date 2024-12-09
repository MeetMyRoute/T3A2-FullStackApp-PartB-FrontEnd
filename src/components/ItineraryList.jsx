import React, { useEffect, useState } from "react";
import "./ItineraryList.css";
import axios from "axios";
import { API } from "../api";

export function ItineraryList() {
    const [itineraries, setItineraries] = useState([]);

    // Fetch itineraries from API
    useEffect(() => {
        const fetchItineraries = async() => {
            try {
                const response = await axios.get(API + "/itinerary");
            }
        }
    })

    return (
        <div className="itinerary-list">
            <h2 className="itinerary-title">Your Itineraries</h2>
            <div className="itinerary-cards">
                {itineraries.map((itinerary) => (
                    <div key={itinerary.id} className="itinerary-card">
                        <p className="itinerary-destination">Destination: {itinerary.destination}</p>
                        <p className="itinerary-dates">Travel dates: {itinerary.dates}</p>
                        <p className="itinerary-accommodation">Accommodation: {itinerary.accommodation}</p>
                        <ul className="itinerary-activties">
                            <li><strong>Activities:</strong></li>
                            {itinerary.activities.map((activity, index) => (
                                <li key={index}>{activity}</li>
                            ))}
                        </ul>
                        <div className="itinerary-actions">
                            <button className="edit-btn" onClick={() => onEdit(itinerary.id)}>Edit</button>
                            <button className="delete-btn" onClick={() => onDelete(itinerary.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}