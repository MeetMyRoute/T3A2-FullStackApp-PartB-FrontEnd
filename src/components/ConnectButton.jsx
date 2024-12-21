import axios from "axios";
import React, { useState } from "react";
import "../stylesheets/ConnectButton.css";

const API = import.meta.env.VITE_API_URL;

export function ConnectButton({ recipientId, isDisabled }) {
    // State management
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // Handle connect button click
    const handleConnect = async () => {
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            // Send the connect message to the back-end
            await axios.post(`${API}/connects`, {
                recipientId
            });
            setSuccess(true);
        } catch (error) {
            setError("Failed to send connect message. Please try again");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="connect-button-container">
            {/* Connect button */}
            <button
                onClick={handleConnect}
                disabled={loading || success || isDisabled}
                title={success ? "Message already sent" : isDisabled ? "You have already connected" : undefined}
                className={`connect-button ${loading ? "loading" : ""} ${success ? "success" : ""}`}
            >
                {loading ? "Sending..." : success || isDisabled ? "Sent" : "Send a Message"}
            </button>

            {/* Error feedback */}
            {error && <p className="error-message">{error}</p>}
        </div>
    )    
}