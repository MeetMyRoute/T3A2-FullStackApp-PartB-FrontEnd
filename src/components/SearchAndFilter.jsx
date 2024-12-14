import axios from "axios";
import React, { useState } from "react";
import { DateSelector } from "./DateSelector";
import "./SearchAndFilter.css";

const API = import.meta.env.API_URL;

export function SearchAndFilter() {
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Function to handle search
    const handleSearch = async() => {
        setLoading(true);
        setError("");
        try {
            // API call to /search endpoint
            const res = await axios.get(`${API}/search`, {
                params: {
                    destination,
                    startDate: startDate ? startDate.toISOString() : undefined,
                    endDate: endDate ? endDate.toISOString() : undefined
                }
            });
            setResults(res.data);
        } catch(error) {
            setError("Failed to fetch search results. Please try again");
        } finally {
            setLoading(false);
        }
    }

    // Function to handle date changes from DateSelector
    const handleDateChange = (start, end) => {
        setStartDate(start);
        setEndDate(end);
    }

    return (
        <div className="search-and-filter">
            <div className="search-container">

                {/* Destination input */}
                <label htmlFor="destination">Destination:</label>
                <input
                    type="text"
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter destination"
                    required
                />

                {/* Date selector component */}
                <DateSelector
                    startDate={startDate}
                    endDate={endDate}
                    onDateChange={handleDateChange}
                />

                {/* Search button */}
                <button onClick={handleSearch} disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>

                {/* Error message */}
                {error && <p className="error-message">{error}</p>}
            </div>

            {/* Results section */}
            <div className="results-container">
                {results.length === 0 && !loading && <p>No results found</p>}
                {results.map((result, index) => (
                    <div key={index} className="result-card">
                        <img src={result.profilePicture || "default-profile.png"} alt="Profile" className="profile-picture" />
                        <div className="result-details">
                            <h3>{result.name}</h3>
                            <p>{result.location}</p>
                            <p>Destination: {result.itinerary.destination}</p>
                            <p>Travel Dates: {result.itinerary.startDate} - {result.itinerary.endDate}</p>
                            <button>View Profile</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}