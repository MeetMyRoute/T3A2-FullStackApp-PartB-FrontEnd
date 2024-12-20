import React from "react";
import "../stylesheets/Footer.css";

export function Footer() {
    return (
        <footer className="footer">
            {/* Application name */}
            <div className="footer-name">
                <h2 className="footer-title">MeetMyRoute</h2>
            </div>

            {/* Credits */}
            <div className="footer-by">
                <p className="footer-credits">by Sofia, Kim, and Theresa</p>
            </div>
        </footer>
    )
}