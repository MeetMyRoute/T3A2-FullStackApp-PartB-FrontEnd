import axios from "axios";
import React, { useState } from "react";
import "../stylesheets/ConnectButton.css";

const API = import.meta.env.VITE_API_URL;

export function ConnectButton({recipientId, recipientName, status, isDisabled}) {
    
    // Track sending state
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // Function to handle sending connect message
    const handleConnect = async() => {
        setLoading(true);
        setError("");

        // Pre-populated message based on user info
        const prePopulatedMessage = `Hey ${recipientName}, I'm travelling to your ${
            status === "Local" ? "city" : "destination"
        }, let's connect via my social media`;

        try {
            // Send the connect message to the back-end
            await axios.post(`${API}/connects`, {
                recipientId,
                message: prePopulatedMessage
            });
            setSuccess(true);
        } catch(error) {
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
                className="connect-button">
                {loading ? "Sending..." : success || isDisabled ? "Sent" : "Send a Message"}
            </button>

            {/* Success/error feedback */}
            {error && <p className="error-message">{error}</p>}
        </div>
    )    
}