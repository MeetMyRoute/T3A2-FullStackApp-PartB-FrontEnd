import React from "react";
import "./HomeSection.css";

export function HomeSection() {
    return (
        <section className="home-section">
            <div className="home-content">
                <h1 className="home-title">MeetMyRoute</h1>
                <p className="home-subtitle">
                    Plan your journey, meet fellow travelers, and adventure together!
                </p>
                <div className="home-buttons">
                    <a href="/login" className="home-button home-login">Login</a>
                    <a href="/signup" className="home-button home-signup">Sign Up</a>
                </div>
            </div>
            <div className="home-image">
                <img src="src/assets/home-image.jpg" alt="Travel illustration" />
            </div>
        </section>
    )
}