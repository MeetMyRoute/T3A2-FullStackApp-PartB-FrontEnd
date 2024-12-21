import axios from "axios";
import React, { useState } from "react";
import { DateSelector } from "./DateSelector";
import defaultProfile from "../assets/default-profile.jpg";
import { ConnectButton } from "./ConnectButton";
import "../stylesheets/SearchAndFilter.css";

const API = import.meta.env.VITE_API_URL;

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
            const jwt = localStorage.getItem("jwt");
            if (!jwt) {
                throw new Error("Not authenticated. Please login")
            }

            // API call to /search endpoint
            const response = await axios.get(`${API}/search`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
                params: {
                    destination,
                    startDate: startDate ? startDate.toISOString() : undefined,
                    endDate: endDate ? endDate.toISOString() : undefined
                }
            });
            setResults(response.data.data || []);
        } catch (error) {
            setError(err.response?.data?.message || "Failed to fetch search results. Please try again");
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
                />

                {/* Date selector component */}
                <DateSelector
                    startDate={startDate}
                    endDate={endDate}
                    onDateChange={handleDateChange}
                />

                {/* Search button */}
                <button onClick={handleSearch} disabled={loading || !destination || !startDate || !endDate}>
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
                        <img src={result.profilePic || defaultProfile} alt="Profile" className="profile-picture" />
                        <div className="result-details">
                            <h3>{result.user}</h3>
                            <p>Status: {result.status}</p>
                            {result.location && <p>Location: {result.location}</p>}
                            {result.destination && (
                                <>
                                    <p>Destination: {result.destination}</p>
                                    <p>
                                        Travel Dates: {new Date(result.startDate).toLocaleDateString()} - {new Date(result.endDate).toLocaleDateString()}
                                    </p>
                                </>
                            )}
                            <button>View Profile</button>
                            <ConnectButton
                                recipientId={result.userId}
                                recipientName={result.user}
                                status={result.status}
                                isDisabled={user.hasConnected}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}