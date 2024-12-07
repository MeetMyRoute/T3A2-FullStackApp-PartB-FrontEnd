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
                    <button className="home-button login">Login</button>
                    <button className="home-button sign-up">Sign Up</button>
                </div>
            </div>
            <div className="home-image">
                <img src="src/assets/home-image.jpg" alt="Travel illustration" />
            </div>
        </section>
    )
}