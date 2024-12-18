import axios from "axios";
import React, { useState } from "react";
import "./ConnectButton.css";

const API = import.meta.env.API_URL;

export function ConnectButton({recipientId, recipientName, status}) {
    
    // Track sending state
    const [loading, setLoading] = useState(false);

    // Success/error feedback
    const [feedback, setFeedback] = useState("");

    // Function to handle sending connect message
    const handleConnect = async() => {
        setLoading(true);
        setFeedback("");

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
            setFeedback("Connect message sent successfully!");
        } catch(error) {
            setFeedback("Failed to send message. Please try again");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {/* Connect button */}
            <button onClick={handleConnect} disabled={loading} className="connect-button">
                {loading ? "Sending..." : "Sent"}
            </button>

            {/* Success/error feedback */}
            {feedback && <p className="feedback-message">{feedback}</p>}
        </div>
    )    
}